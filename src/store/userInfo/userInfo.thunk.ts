import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase"
import { Post, addNewPost, getUserInfo, setError } from "./userInfo.slice";
import { set } from "react-hook-form";


export const getUserInfoThunk = () => {
    return async (dispatch: any) => {
        if (auth.currentUser?.uid) {
            try {
            const userCollection = doc(db, 'users', auth.currentUser!.uid)
                const data = await getDoc(userCollection)

                return dispatch(getUserInfo(data.data()))
            }catch(err) {
                return dispatch(setError(err))
            }
        }else {
            return dispatch(setError('user Dosn`t exists'))
        }
    }
}

export const addNewPostInCollectionThunk = (post: string) => {
    return async (dispatch: any) => {
        if(auth.currentUser?.uid) {
            const userCollection = doc(db, 'users', auth.currentUser!.uid)
            try {
                const data: Post = {
                        post: post,
                        likes: 0,
                        shares: 0
                    }
                await updateDoc(userCollection,{
                    posts: arrayUnion(data)
                })
                dispatch(addNewPost(data))
            }catch(err) {
                dispatch(setError(err))
            }
        }else {
            dispatch(setError('user dosn`t exisist '))
        }
    }
}