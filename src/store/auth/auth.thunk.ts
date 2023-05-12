import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../config/firebase"

import { signInModalClick, signUpModalClick, signUp, signIn } from "./auth.slice"
import { Action, ThunkAction } from "@reduxjs/toolkit"
import { RootState } from "../../main"

export const userSignUp = (email: string, password: string): ThunkAction<void, RootState, null, Action> => {
    return async dispatch => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            dispatch(signUp(null))
            dispatch(signUpModalClick(false))
            dispatch(signInModalClick(true))
        }catch(err: any) {
            dispatch(signUp(err.message))
        }
    }
}

export const userSignIn = (email: string, password: string): ThunkAction<void, RootState, null, Action> => {
    return async dispatch => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            dispatch(signIn({user: true, error: null}))
        }catch(err: any) {
            dispatch(signIn({user: false, error: err.message}))
        }
    }
}