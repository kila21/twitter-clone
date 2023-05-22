import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
        addNewPost: (state, action) => {

        },

        setError: (state, action) => {
            state.errors = action.payload
        },
    }
})

export const { getUserInfo, setError } = userInfoSlice.actions

export default userInfoSlice.reducer;