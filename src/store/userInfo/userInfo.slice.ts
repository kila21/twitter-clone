import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Post {
    post: string,
    likes: string[],
    shares: string[]
}
interface userInfoInitialState {
    changeUsernameModal: boolean,
    posts: Post[],
    username: null | string,
    email: string,
    following: number,
    followers: number,
    errors: any
}

const initialState: userInfoInitialState = {
    changeUsernameModal: false,
    posts: [],
    username: null,
    email: '',
    following: 0,
    followers: 0,
    errors: null
}


export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        getUserInfo: (state, action) => {
            state.posts = action.payload.posts;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.followers = action.payload.followers;
            state.following = action.payload.following
        },
        addNewPost: (state, action: PayloadAction<Post>) => {
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
        },
        changeUsernameModalClick: (state, action) => {
            state.changeUsernameModal = action.payload
        },

        setUsername: (state, action) => {
            state.username = action.payload
        }
    }
})

export const { getUserInfo, setError, addNewPost, removePost ,clearError, changeUsernameModalClick, setUsername } = userInfoSlice.actions

export default userInfoSlice.reducer;