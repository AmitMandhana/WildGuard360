import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomButton,
  EditProfile,
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TextInput,
  TopBar,
} from "./ngo/index.js";
import { Link } from "react-router-dom";
import { NoProfile } from "./assets";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { apiRequest, deletePost, getUserInfo, handleFileUpload, likePost, sendFriendRequest,fetchPosts } from "./utils/index.js";
import { UserLogin } from "./redux/userSlice";
import  {SetPosts} from "./redux/postSlice.js";

const Ngo = () => {
  const { user, edit } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const [friendRequest, setFriendRequest] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handlePostSubmit = async (data) => {
    setPosting(true);
    setErrMsg("");
    try {
      let uri = null;
      if (file) {
        uri = await handleFileUpload(file);
      }
      const newData = uri ? { ...data, image: uri } : data;
      const res = await apiRequest({
        url: "/posts/create-post",
        data: newData,
        token: user?.token,
        method: "POST",
      });
      if (res?.status === "failed") {
        setErrMsg(res?.message || "Post creation failed");
      } else {
        reset();
        setFile(null);
        await fetchPost();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setErrMsg("An error occurred while creating the post");
    } finally {
      setPosting(false);
    }
  };
  
   
  const fetchPost = async () => {
    setLoading(true);
    try {
      await fetchPosts(user?.token, dispatch);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };
     
      
      const handleDelete = async(id) => {
        try {
          await deletePost(id, user.token);
          await fetchPost();
        } catch (error) {
          console.error("Failed to delete post:", error);
        }
      };
      const fetchFriendRequests = async () => {
        try {
            const res = await apiRequest({
                url: "/users/get-friend-request",  // Ensure this matches the server route
                token: user?.token,
                method: "POST",
            });
    
            if (res?.success === false) {
                console.log(res.message); // No friend requests found, handle it gracefully
                setFriendRequest([]); // Clear any existing requests
            } else {
                setFriendRequest(res?.data || []);
            }
        } catch (error) {
            console.error('Failed to fetch friend requests:', error.message || JSON.stringify(error));
        }
    };
    // const handleLikePost = async (postId) => {
    //   postId=localStorage.getItem("postID");
    //   try {
    //     const token = localStorage.getItem("BearerToken");
    //     if (!token) {
    //       console.error('No token found. Redirecting to login.');
    //       window.location.replace("/ngologin");
    //       return;
    //     }
    
    //     alert("Attempting to like post with ID:", postId);
    
    //     // Make API call to like the post
    //     const res = await likePost({ uri: postId, token: token });
    
    //     if (res?.status === 'success') {
    //       console.log("Post liked successfully");
    //       // Fetch updated posts after liking
    //       await fetchPost();
    //     } else {
    //       console.error("Failed to like post:", res?.message);
    //       if (res?.message.includes('Invalid token')) {
    //         console.error("Invalid token. Redirecting to login.");
    //         window.location.replace("/ngologin");
    //       }
    //     }
    //   } catch (error) {
    //     console.error("Error liking post:", error);
    //     if (error.message.includes('Token')) {
    //       console.error("Token error. Redirecting to login.");
    //       window.location.replace("/ngologin");
    //     } else {
    //       alert("An error occurred while liking the post. Please try again.");
    //     }
    //   }
    // };
    const handleLikePost = async (postId) => {
      try {
        const token = localStorage.getItem("BearerToken");
    
        if (!token) {
          console.error('No token found. Redirecting to login.');
          window.location.replace("/ngologin");
          return;
        }
    
        // Make API call to like the post
        const res = await likePost(postId, token);
    
        if (res?.status === 'success') {
          console.log("Post liked successfully");
    
          // Update the UI to reflect the new like status
          // Example: Incrementing the like count or changing the like button appearance
          const postElement = document.getElementById(`post-${postId}`);
          if (postElement) {
            const likeCountElement = postElement.querySelector(".like-count");
            if (likeCountElement) {
              const likeCount = parseInt(likeCountElement.textContent, 10);
              likeCountElement.textContent = likeCount + 1;
            }
    
            const likeButton = postElement.querySelector(".like-button");
            if (likeButton) {
              likeButton.classList.add("liked");
            }
          }
    
          // Optionally, update the entire post list
          await fetchPost();
        } else {
          console.error("Failed to like post:", res?.message);
          if (res?.message.includes('Invalid token')) {
            console.error("Invalid token. Redirecting to login.");
            window.location.replace("/ngologin");
          }
        }
      } catch (error) {
        console.error("Error liking post:", error.message);
        if (error.message.includes('Token')) {
          console.error("Token error. Redirecting to login.");
          window.location.replace("/ngologin");
        } else {
          console.error("An error occurred while liking the post. Please try again.");
        }
      }
    };
    
      const fetchSuggestedFriends = async () => {
        try {
          const res = await apiRequest({
            url: "/users/suggested-friends",
            token: user?.token,
            method: "POST",
          });
          setSuggestedFriends(res?.data || []);
        } catch (error) {
          console.error('Failed to fetch suggested friends:', error);
        }
      };
      


  const handleFriendRequest = async (id) => {
    try {
      const res = await sendFriendRequest(user.token, id);
      await fetchSuggestedFriends();
    } catch (error) {
      console.log(error);
    }
  };

  const acceptFriendRequest = async (id, status) => {
    try {
      const res = await apiRequest({
        url: "/users/accept-request",
        token: user?.token,
        method: "POST",
        data: { rid: id, status: status },
      });
      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
        const res = await getUserInfo(user?.token);
        const newData = { token: user?.token, ...res };
        dispatch(UserLogin(newData));
    } catch (error) {
        console.error("Failed to get user info:", error);
    }
};
  

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          getUser(),
          fetchPost(),
          fetchFriendRequests(),
          fetchSuggestedFriends(),
        ]);
      } catch (error) {
        console.error("Initialization failed", error);
      } finally {
        setLoading(false);
      }
    };
  
    initializeData();
  }, [user?.token]);
  

  return (
    <>
   
   <div className='w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
        <TopBar />

        <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
          {/* LEFT */}
          <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />
          </div>

          {/* CENTER */}
          <div className='flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg'>
            <form
              onSubmit={handleSubmit(handlePostSubmit)}
              className='bgcolortailwind px-4 rounded-lg'
            >
              <div className='w-full flex items-center gap-2 py-4 border-b border-[#66666645]'>
                <img
                  src={ NoProfile}
                  alt='User Image'
                  className='w-14 h-14 rounded-full object-cover'
                />
                <TextInput
                  styles='w-full rounded-full py-5'
                  placeholder="What's on your mind...."
                  name='description'
                  register={register("description", {
                    required: "Write something about post",
                  })}
                  error={errors.description ? errors.description.message : ""}
                />
              </div>
              {errMsg?.message && (
                <span
                  role='alert'
                  className={`text-sm ${
                    errMsg?.status === "failed"
                      ? "text-[#f64949fe]"
                      : "text-[#2ba150fe]"
                  } mt-0.5`}
                >
                  {errMsg?.message}
                </span>
              )}
               
              <div className='flex items-center justify-between py-4'>
                <label
                  htmlFor='imgUpload'
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                >
                  <input
                    type='file'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='imgUpload'
                    data-max-size='5120'
                    accept='.jpg, .png, .jpeg'
                  />
                  <BiImages />
                  <span>Image</span>
                </label>

                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                  htmlFor='videoUpload'
                >
                  <input
                    type='file'
                    data-max-size='5120'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='videoUpload'
                    accept='.mp4, .wav'
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>

                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                  htmlFor='vgifUpload'
                >
                  <input
                    type='file'
                    data-max-size='5120'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='vgifUpload'
                    accept='.gif'
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                </label>

                <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type='submit'
                      title='Post'
                      containerStyles='bg-[#0F8636] text-white py-1 px-6 rounded-full font-semibold text-sm'
                    />
                  )}
                </div>
              </div>
            </form>
            {loading ? (
  <Loading />
) : posts?.length > 0 ? (
  posts?.map((post) => (
    <PostCard
      key={post?._id}
      post={post}
      user={user}
      deletePost={() => handleDelete(post?._id)} // Pass the post ID correctly
      likePost={() => handleLikePost(post?._id)}
                />
              ))
            ) : (
              <div className='flex w-full h-full items-center justify-center'>
                <p className='text-lg text-ascent-2'>No Post Available</p>
              </div>
            )}
          </div>
                {/* RIGJT */}
          <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto'>
            {/* FRIEND REQUEST */}
            <div className='w-full bgcolortailwind shadow-sm rounded-lg px-6 py-5'>
              <div className='flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]'>
                <span> Friend Request</span>
                <span>{friendRequest?.length}</span>
              </div>

              <div className='w-full flex flex-col gap-4 pt-4'>
                {friendRequest?.map(({ _id, requestFrom: from }) => (
                  <div key={_id} className='flex items-center justify-between'>
                    <Link
                      to={"/profile/" + from._id}
                      className='w-full flex gap-4 items-center cursor-pointer'
                    >
                      <img
                        src={from?.profileUrl ?? NoProfile}
                        alt={from?.firstName}
                        className='w-10 h-10 object-cover rounded-full'
                      />
                      <div className='flex-1'>
                        <p className='text-base font-medium text-ascent-1'>
                          {from?.firstName} {from?.lastName}
                        </p>
                        <span className='text-sm text-ascent-2'>
                          {from?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className='flex gap-1'>
                      <CustomButton
                        title='Accept'
                        onClick={()=>acceptFriendRequest(_id,"Accepted")}
                        containerStyles='bg-[#0F8636] text-xs text-white px-1.5 py-1 rounded-full'
                      />
                      <CustomButton
                        title='Deny'
                        onClick={()=>acceptFriendRequest(_id,"Denied")}
                        containerStyles='border border-[#666] text-xs text-ascent-1 px-1.5 py-1 rounded-full'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

         
            {/* SUGGESTED FRIENDS */}
            <div className='w-full bgcolortailwind shadow-sm rounded-lg px-5 py-5'>
              <div className='flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]'>
                <span>Friend Suggestion</span>
              </div>
              <div className='w-full flex flex-col gap-4 pt-4'>
                {suggestedFriends?.map((friend) => (
                  <div
                    className='flex items-center justify-between'
                    key={friend._id}
                  >
                    <Link
                      to={"/profile/" + friend?._id}
                      key={friend?._id}
                      className='w-full flex gap-4 items-center cursor-pointer'
                    >
                      <img
                        src={friend?.profileUrl ?? NoProfile}
                        alt={friend?.firstName}
                        className='w-10 h-10 object-cover rounded-full'
                      />
                      <div className='flex-1 '>
                        <p className='text-base font-medium text-ascent-1'>
                          {friend?.firstName} {friend?.lastName}
                        </p>
                        <span className='text-sm text-ascent-2'>
                          {friend?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className='flex gap-1'>
                      <button
                        className='bg-[#0444a430] text-sm text-white p-1 rounded'
                        onClick={() => {handleFriendRequest(friend?._id)}}
                      >
                        <BsPersonFillAdd size={20} className='text-[#0f52b6]' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {edit && <EditProfile />}
    </>
  
  );
};

export default Ngo;

