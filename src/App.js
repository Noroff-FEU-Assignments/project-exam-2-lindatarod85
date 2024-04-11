import { AuthContext } from "./context/AuthContext";
import LoginForm from "./components/user/Login.js";
import RegisterForm from "./components/user/Register.js";
import PostsListings from "./components/posts/PostsPage";
import ProfilesPage from "./components/profiles/ProfilesPage";
import SingleProfile from "./components/profiles/SingleProfilePage";
import SinglePost from "./components/posts/SinglePostPage";
import MyProfile from "./components/profiles/myprofile/MyProfile";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PrivateRoute from "./components/private/PrivateRoute";
import PageNotFound from "./components/PageNotFound";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={token ? <Navigate to="/posts" /> : <LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route element={<PrivateRoute />}>
          <Route path="/posts" element={<PostsListings />} />
          <Route path="/profiles" element={<ProfilesPage />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/profile/:name" element={<SingleProfile />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
