import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../config/firebase"

import { signInModalClick, signUpModalClick, signUp } from "./auth.slice"

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