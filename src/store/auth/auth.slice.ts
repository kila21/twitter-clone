import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signInClicked: false,
    signUpClicked: false,
    user: null,
    errors: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInModalClick: (state, action) => {
            state.signInClicked = action.payload
        },

        signUpModalClick: (state, action) => {
            state.signUpClicked = action.payload
        },

        signUp: (state,action) => {
            if(action.payload) {
                state.errors = action.payload
            }else {
                state.errors = null
            }
        }
    }
})

export const { signInModalClick, signUpModalClick, signUp } = authSlice.actions

export default authSlice.reducer