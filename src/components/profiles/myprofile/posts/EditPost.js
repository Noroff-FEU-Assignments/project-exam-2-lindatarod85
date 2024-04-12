import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { baseUrl } from "../../../../settings/api";
import { useMyAuth } from "../../../../settings/auth";
import styles from "../../../../styles/profiles/myprofile/posts/EditPost.module.css";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  body: Yup.string(),
  media: Yup.string().url("Invalid URL format"),
});

const EditPost = ({ onEditPost }) => {
  const authToken = useMyAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { id: postId } = useParams();

  const [resultMessage, setResultMessage] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postUrl = baseUrl + `posts/${postId}`;
        const response = await fetch(postUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch post data");
        }

        const postData = await response.json();
        setCurrentPost(postData);

        setValue("title", postData.title);
        setValue("body", postData.body);
        setValue("media", postData.media);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [postId, authToken, setValue]);

  const onSubmit = async (data) => {
    try {
      const postUrl = baseUrl + `posts/${postId}`;
      const response = await fetch(postUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({
          title: data.title,
          body: data.body || "",
          media: data.media || "",
        }),
      });

      if (!response.ok) {
        //const errorResponse = await response.json();
        setResultMessage({
          success: false,
          message: `Failed to edit post`,
        });
      } else {
        onEditPost();
        setResultMessage({
          success: true,
          message: "Post edited successfully",
        });
      }
    } catch (error) {
      setResultMessage({
        success: false,
        message: "An error occurred",
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>TweeMe | Edit Post</title>
      </Helmet>
      <form className={styles.editPostForm} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title:</label>
          <input {...register("title")} placeholder="Enter Title" />
          {errors.title && (
            <p className={styles.error}>{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="body">Body:</label>
          <textarea {...register("body")} placeholder="Enter Body" />
          {errors.body && <p className={styles.error}>{errors.body.message}</p>}
        </div>

        <div>
          <label htmlFor="media">Media URL:</label>
          <input {...register("media")} placeholder="Enter Media URL" />
          {errors.media && (
            <p className={styles.error}>{errors.media.message}</p>
          )}
        </div>

        <button type="submit">Edit Post</button>
        {resultMessage && (
          <div
            className={
              resultMessage.success
                ? styles.successMessage
                : styles.errorMessage
            }
          >
            {resultMessage.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default EditPost;
