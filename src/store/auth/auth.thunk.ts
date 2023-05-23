import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../config/firebase"

import { signInModalClick, signUpModalClick, signUp, signIn, signOut } from "./auth.slice"




interface user  {
    email: string,
    password: string
}



export const userSignUp = (email: string, password: string) => {
    return async (dispatch: any) => {
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

export const userSignIn = (email: string, password: string) => {
    return async (dispatch: any) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            return dispatch(signIn({user: true, error: null}))
        }catch(err: any) {
            return dispatch(signIn({user: false, error: err.message}))
        }
    }
}


export const userLogOut = () => {
    return async (dispatch: any) => {
        await auth.signOut()
        dispatch(signOut())
    }
}