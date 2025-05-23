import axios from "axios";
import { SetPosts } from "../redux/postSlice";

const API_URL = "https://wildguard-back-2.onrender.com";

export const API = axios.create({
    baseURL: API_URL,
    responseType: "json"
});

export const apiRequest = async ({ url, data, token, method }) => {
    try {
        const response = await fetch(`${API_URL}${url}`, {
            method: method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
            },
            body: data ? JSON.stringify(data) : null,
        });

        const contentType = response.headers.get("Content-Type");
        const result = contentType && contentType.includes("application/json")
            ? await response.json()
            : await response.text();

        if (!response.ok) {
            throw new Error(JSON.stringify(result) || `API request failed with status: ${response.status}`);
        }

        return result;
    } catch (error) {
        console.error("API Request Error:", error.message || JSON.stringify(error));
        throw error;
    }
};

export const handleFileUpload = async (uploadFile) => {
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("upload_preset", "Paul_updated_frontend");

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dxfipuy9u/image/upload/`,
            formData
        );

        if (response.status === 200) {
            return response.data.secure_url;
        } else {
            console.error("Unexpected response status:", response.status);
            throw new Error("File upload failed");
        }
    } catch (error) {
        console.error("File Upload Error:", error);
        throw error;
    }
};

export const fetchPosts = async (token, dispatch, uri, data) => {
    try {
        const res = await apiRequest({
            url: uri || "/posts",
            token: token,
            method: "POST",
            data: data || {},
        });
        dispatch(SetPosts(res?.data));
    } catch (error) {
        console.log(error);
    }
};

// export const likePost = async (postId, token) => {
//     const tk = localStorage.getItem("BearerToken");
//     if (!tk) {
//         alert("Token is missing. Please log in again.");
//         return;
//     }
    
//     postId=localStorage.getItem("postID");
//     const url = `/posts/like/${postId}`;
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${tk}`,
//         },
//     };

//     try {
//         // alert(`Sending request to: http://localhost:4000${url}`);
//         // alert(`Using token: ${tk}`);
//         const response = await fetch(`http://localhost:4000${url}`, options);

//         // alert(`Response status: ${response.status}`);
//         if (response.status === 401) {
//             alert("Authentication failed. Please log in again.");
//             return;
//         }

//         if (!response.ok) {
//             const errorMessage = await response.text();
//             alert(`Failed to like post: ${errorMessage}`);
//             throw new Error(errorMessage);
//         }

//         const result = await response.json();
//         // alert(`Post liked successfully: ${JSON.stringify(result)}`);
//         return result;
//     } catch (error) {
//         alert(`Error: ${error.message}`);
//         throw error;
//     }
// };
// export const likePost = async (postId, token) => {
//     const tk = localStorage.getItem("BearerToken");

//     // Check if the token is available
//     if (!tk) {
//         console.error("Token is missing. Please log in again.");
//         window.location.replace("/ngologin");
//         return;
//     }

//     // Retrieve the post ID from localStorage if it's not passed directly
//     postId = localStorage.getItem("postID");
//     const url = `/posts/like/${postId}`;
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${tk}`,
//         },
//     };

//     try {
//         const response = await fetch(`http://localhost:4000${url}`, options);

//         if (response.status === 401) {
//             console.error("Authentication failed. Please log in again.");
//             window.location.replace("/ngologin");
//             return;
//         }

//         if (!response.ok) {
//             const errorMessage = await response.text();
//             console.error(`Failed to like post: ${errorMessage}`);
//             throw new Error(errorMessage);
//         }

//         const result = await response.json();
//         console.log("Post liked successfully:", result);
//         return result;
//     } catch (error) {
//         console.error("Error liking post:", error.message);
//         throw error;
//     }
// };
export const likePost = async (postId, token) => {
    // Use the token passed as an argument or retrieve it from localStorage
    const tk = token || localStorage.getItem("BearerToken");

    // Check if the token is available
    if (!tk) {
        console.error("Token is missing. Please log in again.");
        window.location.replace("/ngologin");
        return;
    }

    // Construct the API URL using the provided postId
    const url = `/posts/like/${postId}`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tk}`,
        },
    };

    try {
        const response = await fetch(`https://wildguard-back-2.onrender.com${url}`, options);

        if (response.status === 401) {
            console.error("Authentication failed. Please log in again.");
            window.location.replace("/ngologin");
            return;
        }

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error(`Failed to like post: ${errorMessage}`);
            throw new Error(errorMessage);
        }

        const result = await response.json();
        console.log("Post liked successfully:", result);

        // Return the result to allow further handling
        return result;
    } catch (error) {
        console.error("Error liking post:", error.message);
        throw error;
    }
};


export const getComments = async (id) => {
    if (!id) {
        console.error('Post ID is missing');
        return;
    }

    setReplyComments(0);
    setLoading(true);
    try {
        console.log('Fetching comments for post ID:', id);
        
        const res = await apiRequest({
            url: `/posts/comments/${id}`,
            token: user?.token,
        });

        if (res?.data?.comments) {
            setComments(res.data.comments);
        } else {
            setComments([]);
        }
    } catch (error) {
        console.error('Error fetching comments:', error);
    } finally {
        setLoading(false);
    }
};

export const onSubmit = async (data) => {
    setLoading(true);
    setErrMsg("");

    try {
        if (!data?.comment || !id) {
            console.error('Comment or post ID is missing');
            setErrMsg("Comment or post ID is missing");
            return;
        }

        const URL = !replyAt ? `/posts/comment/${id}` : `/posts/reply-comment/${id}`;
        const newData = {
            comment: data.comment,
            from: `${user?.firstName} ${user?.lastName}`,
            replyAt: replyAt,
        };

        console.log('Posting comment data:', newData);

        const res = await apiRequest({
            url: URL,
            data: newData,
            token: user?.token,
            method: "POST",
        });

        if (res?.status === "failed") {
            setErrMsg(res.message || "Failed to submit comment");
        } else {
            reset({ comment: "" });
            setErrMsg("");
            await getComments(id);
        }
    } catch (error) {
        console.error('Error submitting comment:', error);
        setErrMsg("Error submitting comment: " + (error.message || error));
    } finally {
        setLoading(false);
    }
};

export const deletePost = async (id, token) => {
    try {
        await apiRequest({
            url: `/posts/${id}`,
            token: token,
            method: "DELETE",
        });
    } catch (error) {
        console.error("Delete Post Error:", error);
    }
};

export const getUserInfo = async (token) => {
    try {
        const uri = "/users/get-user";
        const res = await apiRequest({
            url: uri,
            token: token,
            method: "POST",
        });
        if (res?.message === "Authentication failed") {
            localStorage.removeItem("user");
            window.alert("User session expired. Please log in again.");
            window.location.replace("/mgo");
        }
        return res?.user;
    } catch (error) {
        console.error("Get User Info Error:", error);
        throw error;
    }
};

export const sendFriendRequest = async (token, id) => {
    try {
        const response = await apiRequest({
            url: "/users/friend-request",
            token: token,
            method: "POST",
            data: { requestTo: id },
        });

        if (response.success === false) {
            throw new Error(response.message || 'Failed to send friend request');
        }

        return response;
    } catch (error) {
        console.error("Send Friend Request Error:", error.message || JSON.stringify(error));
        throw error;
    }
};

export const viewUserProfile = async (token, id) => {
    try {
        const res = await apiRequest({
            url: "/users/profile",
            token: token,
            method: "POST",
            data: { id },
        });
        return res;
    } catch (error) {
        console.error("View User Profile Error:", error);
    }
};

export const updateUserProfile = async (id, token, updateData) => {
    try {
        const res = await apiRequest({
            url: `/users/update/${id}`,
            token: token,
            method: "PUT",
            data: updateData,
        });
        return res;
    } catch (error) {
        console.error("Update User Profile Error:", error);
        throw error;
    }
};
