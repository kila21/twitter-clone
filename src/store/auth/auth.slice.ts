import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signInClicked: false,
    signUpClicked: false,
    user: false,
    errors: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInModalClick: (state, action) => {
            state.signInClicked = action.payload
            if(!action.payload) {
                state.errors = null
            }
        },

        signUpModalClick: (state, action) => {
            state.signUpClicked = action.payload
            if(!action.payload) {
                state.errors = null
            }
        },

        signUp: (state,action) => {
            if(action.payload) {
                state.errors = action.payload
            }else {
                state.errors = null
            }
        },

        signIn: (state, action) => {
           state.errors = action.payload.error
           state.user = action.payload.user
           if(action.payload.user) {
               state.signInClicked = false
           }
        },
        signOut: (state) => {
            sessionStorage.removeItem('id')
            state.user = false
        }
    }
})

export const { signInModalClick, signUpModalClick, signUp, signIn, signOut } = authSlice.actions

export default authSlice.reducer