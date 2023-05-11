import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signInClicked: false,
    signUpClicked: false,
    user: null,
    errors: []
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
        }
    }
})

export const { signInModalClick, signUpModalClick } = authSlice.actions

export default authSlice.reducer