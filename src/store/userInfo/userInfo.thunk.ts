import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase"
import { Post, addFollower, addNewPost, clearError, getUserInfo, removeFollower, removePost, setError } from "./userInfo.slice";



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

export const addNewPostInCollectionThunk = (post: string, date: Date) => {
    return async (dispatch: any) => {
        if(auth.currentUser?.uid) {
            const userCollection = doc(db, 'users', auth.currentUser!.uid)
            try {
                const data: Post = {
                        post: post,
                        likes: [],
                        shares: [],
                        date: date.toISOString()
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



export const deletePostInCollection = (data: Post) => {
    return async (dispatch: any) => {
        if(auth.currentUser?.uid) {
            const userCollection = doc(db, 'users', auth.currentUser.uid)
            await updateDoc(userCollection, {
                posts: arrayRemove(data)
            })

            // if user have like his(this) post, this will remove from likedposts array in firabse.
            const dataForLikedPostsRemove = {
                id: auth.currentUser.uid,
                post: data.post
            }
            await updateDoc(userCollection, {
                likedPosts: arrayRemove(dataForLikedPostsRemove)
            })

            // users who liked post
            data.likes.map((item)=>{
                const collection = doc(db,'users', item);
                const deleteData = {
                    id: auth.currentUser!.uid,
                    post: data.post
                }
                updateDoc(collection, {
                    likedPosts: arrayRemove(deleteData)
                })
            })

            //dispatch action
            dispatch(removePost(data))
        }
    }
    
}


// new Follow and update following array in firabase

export const AddNewFollowInCollection = (id: string) => {
    return async (dispatch: any) => {

        // user who click follow
        const userCollection = doc(db, 'users', auth.currentUser!.uid)

        // user who are followed 
        const followedCollection = doc(db, 'users', id)


        await updateDoc(userCollection, {
            following: arrayUnion(id)
        })
        
        await updateDoc(followedCollection, {
            followers: arrayUnion(auth.currentUser!.uid)
        })

        dispatch(addFollower(id))
    }
}

// remove follower

export const RemoveUserFollowinInCollection = (id: string) => {
    return async (dispatch: any) => {
          // user who click unFollow
          const userCollection = doc(db, 'users', auth.currentUser!.uid)

          // user who are followed 
          const followedCollection = doc(db, 'users', id)

          await updateDoc(userCollection, {
            following: arrayRemove(id)
          })

          await updateDoc(followedCollection, {
            followers: arrayRemove(auth.currentUser!.uid)
          })

          dispatch(removeFollower(id))
    }
}
