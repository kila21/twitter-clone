
import { arrayRemove, arrayUnion, doc, documentId, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';



// export const likePost = async (postAuthor: string, post: string) => {
//     await AddLikedPostInFirabase(postAuthor, post)
// }


// in usersm likedPost array  field.
export const AddLikedPostInFirabase = async (postAuthor: string, post: string) => {
    const userCollection = doc(db, 'users', auth.currentUser!.uid);
    const data = {
        post: post,
        id: postAuthor
    }
    await updateDoc(userCollection, {
        likedPosts: arrayUnion(data)
    })
}


export const RemoveLikedPostFromFirbase = async (postAuthor: string, post: string) => {
    const userCollection = doc(db, 'users', auth.currentUser!.uid);
    const snapshot = await getDoc(userCollection)

    const data = {id: postAuthor, post: post}

    await updateDoc(userCollection, {
        likedPosts: arrayRemove(data)
    })
}

export const UserHaveLikedOrNot = async (postAuthor: string, post: string) => {
    const data = {id: postAuthor, post: post}
    let returnedValue = false;
    
    const userCollection = doc(db, 'users', auth.currentUser!.uid);
    const snapshot = await getDoc(userCollection)
    console.log(snapshot.data())

    snapshot.data()!.likedPosts.map((item: {id: string, post: string})=>{
        if(item.id === data.id && item.post === data.post) {
            returnedValue = true;
        }
    })
    return returnedValue
}