import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { baseUrl } from "../../../../settings/api";
import { useMyAuth } from "../../../../settings/auth";
import styles from "../../../../styles/profiles/myprofile/posts/CreatePost.module.css";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  body: Yup.string(),
  media: Yup.string().url("Invalid URL format"),
});

const CreatePost = ({ onNewPost }) => {
  const authToken = useMyAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //const { name: profileName } = useParams();

  const [resultMessage, setResultMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      const postUrl = baseUrl + `posts`;
      const response = await fetch(postUrl, {
        method: "POST",
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
          message: `Failed to create post`,
        });
      } else {
        onNewPost();
        setResultMessage({
          success: true,
          message: "Post created successfully",
        });
      }
    } catch (error) {
      setResultMessage({
        success: false,
        message: "An error occurred while creating the post",
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>TweeMe | Create Post</title>
      </Helmet>

      <form className={styles.createPostForm} onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit">Publish Post</button>
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

export default CreatePost;
