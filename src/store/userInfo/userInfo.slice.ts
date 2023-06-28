import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { auth } from "../../config/firebase";
import { act } from "react-dom/test-utils";


export interface Post {
    post: string,
    likes: string[],
    shares: string[],
    date: string
}
interface userInfoInitialState {
    changeUsernameModal: boolean,
    whoLikesModal: boolean;
    posts: Post[] | null,
    username: null | string,
    email: string,
    following: string[],
    followers: string[],
    errors: any,
    photoURL: string
}

const initialState: userInfoInitialState = {
    changeUsernameModal: false,
    whoLikesModal: false,
    posts: null,
    username: null,
    email: '',
    following: [],
    followers: [],
    errors: null,
    photoURL: ''
}


export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        getUserInfo: (state, action) => {
            if(action.payload) {
                state.posts = action.payload.posts;
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.followers = action.payload.followers;
                state.following = action.payload.following,
                state.photoURL = action.payload.photoURL
            }
        },
        addLike: (state,action) => {
            if(state.posts) {
                const newArray = state.posts;
                const forStateUpdate = newArray.map((item)=>{
                    if(item.post === action.payload) {
                        const updated = item
                        updated.likes.push(auth.currentUser!.uid)
                        return updated

                    }
                    return item
                })
                state.posts = forStateUpdate
            }
        },

        addNewPost: (state, action: PayloadAction<Post>) => {
            if(state.posts) {
                state.posts.push(action.payload)
            }
        },
        removePost: (state, action) => {
            if(state.posts) {
                if(state.posts.length === 1) {
                    state.posts = []
                }else {
                    const newPostsArray = state.posts
                    state.posts.map((post, index)=>{
                        if(post.post === action.payload.post) {
                            newPostsArray.splice(index, 1)
                        }
                    })
                    // const newPostsArray = state.posts?.splice(action.payload, 1)
                    state.posts = newPostsArray
                }
            }
        }
        ,
        setError: (state, action) => {
            state.errors = action.payload
        },
        clearError: (state) => {
            state.errors = null
        },
        changeUsernameModalClick: (state, action) => {
            state.changeUsernameModal = action.payload
        },
        postLikesModal: (state,action) => {
            state.whoLikesModal = action.payload
        },

        setUsername: (state, action) => {
            state.username = action.payload
        },
        setEmail: (state,action) => {
            state.username = action.payload
        },
        addFollower: (state, action) => {
            const newFollowingArray = [...state.following, action.payload]
            state.following = newFollowingArray
        },
        removeFollower: (state, action) => {
            const index = state.following.indexOf(action.payload)
            const newFollowingArray = [...state.following]
            newFollowingArray.splice(index, 1)
            state.following = newFollowingArray
        },
        updatePhotoURL: (state, action) => {
            state.photoURL = action.payload
        }
    }
})

export const   { 
    getUserInfo, 
    setError, 
    addNewPost,
    removePost,
    clearError,
    changeUsernameModalClick, 
    setUsername, 
    addLike,
    setEmail,
    postLikesModal,
    addFollower,
    removeFollower,
    updatePhotoURL
} = userInfoSlice.actions

export default userInfoSlice.reducer;