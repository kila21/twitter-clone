import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export interface Post {
    post: string,
    likes: number,
    shares: number
}
interface userInfoInitialState {
    posts: Post[],
    username: null | string,
    email: string,
    errors: any
}

const initialState: userInfoInitialState = {
    posts: [],
    username: null,
    email: '',
    errors: null
}


export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        getUserInfo: (state, action) => {
            state.posts = action.payload.posts;
            state.username = action.payload.username;
            state.email = action.payload.email
        },
        addNewPost: (state, action: PayloadAction<Post>) => {
            // console.log(action.payload)
            state.posts.push(action.payload)
        },
        removePost: (state, action) => {
            if(state.posts.length === 1) {
                state.posts = []
            }else {
                const newPostsArray = state.posts.splice(action.payload, 1)
                state.posts = newPostsArray
            }
        }
        ,
        setError: (state, action) => {
            state.errors = action.payload
        },
        clearError: (state) => {
            state.errors = null
        }
    }
})

export const { getUserInfo, setError, addNewPost, removePost ,clearError } = userInfoSlice.actions

export default userInfoSlice.reducer;