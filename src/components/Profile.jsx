import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TopBar,
} from "./ngo"; // Ensure these are correctly imported from your components directory
import { deletePost, fetchPosts, likePost, getUserInfo } from "./utils"; // Ensure these utility functions are correctly imported

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.use);
  const { posts } = useSelector((state) => state.posts);
  const [userInfo, setUserInfo] = useState(user);
  const [loading, setLoading] = useState(false);

  const uri = `/posts/get-user-post/${id}`;

  const getUser = async () => {
    try {
      const res = await getUserInfo(user?.token, id); // Fetch the user information
      setUserInfo(res);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const getPosts = async () => {
    try {
      await fetchPosts(user.token, dispatch, uri); // Fetch the posts
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id, user.token); // Delete a post
      await getPosts(); // Refresh the posts after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleLikePost = async (uri) => {
    try {
      await likePost({ uri: uri, token: user?.token }); // Like a post
      await getPosts(); // Refresh the posts after liking
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUser();
    getPosts();
  }, [id]);

  return (
    <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
      <TopBar />
      <div className="w-full flex gap-2 lg:gap-4 md:pl-4 pt-5 pb-10 h-full">
        {/* LEFT */}
        <div className="hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow-y-auto">
          <ProfileCard user={userInfo} />

          <div className="block lg:hidden">
            <FriendsCard friends={userInfo?.friends} />
          </div>
        </div>

        {/* CENTER */}
        <div className="flex-1 h-full bgcolortailwind px-4 flex flex-col gap-6 overflow-y-auto">
          {loading ? (
            <Loading />
          ) : posts?.length > 0 ? (
            posts?.map((post) => (
              <PostCard
                post={post}
                key={post?._id}
                user={user}
                deletePost={handleDelete}
                likePost={handleLikePost}
              />
            ))
          ) : (
            <div className="flex w-full h-full items-center justify-center">
              <p className="text-lg text-ascent-2">No Post Available</p>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
          <FriendsCard friends={userInfo?.friends} />
        </div>
      </div>
    </div>
  );
};

export default Profile;

