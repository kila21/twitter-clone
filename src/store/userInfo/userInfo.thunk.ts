import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase"
import { Post, addNewPost, clearError, getUserInfo, removePost, setError } from "./userInfo.slice";



export const getUserInfoThunk = () => {
    return async (dispatch: any) => {
        if (auth.currentUser?.uid) {
            try {
            const userCollection = doc(db, 'users', auth.currentUser!.uid)
                const data = await getDoc(userCollection)

                dispatch(getUserInfo(data?.data()))
                dispatch(clearError())
            }catch(err: any) {
                dispatch(setError(err))
            }
        }else {
            dispatch(setError('user Dosn`t exists'))
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
                dispatch(clearError())
            }catch(err) {
                dispatch(setError(err))
            }
        }else {
            dispatch(setError('user dosn`t exisist '))
        }
    }
}



export const deletePostInCollection = (post: any, index: number) => {
    return async (dispatch: any) => {
        if(auth.currentUser?.uid) {
            const userCollection = doc(db, 'users', auth.currentUser.uid)
            await updateDoc(userCollection, {
                posts: arrayRemove(post)
            })
            dispatch(removePost(index))
        }
    }
}

