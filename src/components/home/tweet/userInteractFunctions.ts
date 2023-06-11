
import { arrayRemove, arrayUnion, doc, documentId, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';
import { Post } from '../../../store/userInfo/userInfo.slice';



// export const likePost = async (postAuthor: string, post: string) => {
//     await AddLikedPostInFirabase(postAuthor, post)
// }


// in userslikedPost array  field.
export const AddLikedPostInFirabase = async (postAuthor: string, post: string) => {
    const userCollection = doc(db, 'users', auth.currentUser!.uid);
    const userCollectionSnapshot = await getDoc(userCollection);

    const postAuthorCollection = doc(db, 'users', postAuthor);
    const postAurhorCollectionSnapshot = await getDoc(postAuthorCollection)

    const data = {
        post: post,
        id: postAuthor
    }

    let postIsLiked = false;
    if(userCollectionSnapshot.exists()) {
        userCollectionSnapshot.data().likedPosts.map((item: any) => {
            if(item === auth.currentUser!.uid) {
                postIsLiked = true
            }
        })
    }
    if(!postIsLiked) {
        await updateDoc(userCollection, {
            likedPosts: arrayUnion(data)
        })
    }


    // vamowmebt arsebobs tuara snapshoti da shemdeg vaapdeitebt postis arrays likebs.
    if(postAurhorCollectionSnapshot.exists()) {
        const updatedArray = postAurhorCollectionSnapshot.data().posts
        if(!postIsLiked) {
            postAurhorCollectionSnapshot.data().posts.map((p: any, index: number) => {
                if(p.post === post) {
                    updatedArray[index].likes.push(auth.currentUser!.uid)
                }
            })
            
            await updateDoc(postAuthorCollection, {
                posts: updatedArray
            })
        }
    }

}

// remove like in database
export const RemoveLikedPostFromFirbase = async (postAuthor: string, post: string) => {
    const userCollection = doc(db, 'users', auth.currentUser!.uid);
    const postAuthorCollection = doc(db, 'users', postAuthor);

    const postAurhorCollectionSnapshot = await getDoc(postAuthorCollection)
    const snapshot = await getDoc(userCollection)

    const data = {id: postAuthor, post: post}

    await updateDoc(userCollection, {
        likedPosts: arrayRemove(data)
    })


    // washala likebis databaseshi
    if(postAurhorCollectionSnapshot.exists()) {
        const updatedArray = postAurhorCollectionSnapshot.data().posts;
        postAurhorCollectionSnapshot.data().posts.map((p: any, index: number)=>{
            if(post === p.post) {
                const indexOfPost = updatedArray[index].likes.indexOf(auth.currentUser!.uid);
                updatedArray[index].likes.splice(indexOfPost, 1)
            }
        })
        await updateDoc(postAuthorCollection, {
            posts: updatedArray
        })
    }

}



// check if user have liked or not post.
export const UserHaveLikedOrNot = async (postAuthor: string, post: string) => {
    const data = {id: postAuthor, post: post}
    let returnedValue = false;
    
    const userCollection = doc(db, 'users', auth.currentUser!.uid);
    const snapshot = await getDoc(userCollection)
    // console.log(snapshot.data())

    if(snapshot.exists()){
        snapshot.data().likedPosts.map((item: {id: string, post: string})=>{
            if(item.id === data.id && item.post === data.post) {
                returnedValue = true;
            }
        })
    }
    return returnedValue
}

// get likes for count
export const getPostLikes = async (postAuthor: string, post: string) => {
    const userCollection = doc(db, 'users', postAuthor)
    const snap = await getDoc(userCollection)

    let returnedValue = 0;

    if(snap.exists()) {
        snap.data().posts.map((p: Post) => {
            if(p.post === post) {
                // console.log(p)
                returnedValue = p.likes.length
            }
        })
    }
    return returnedValue
}