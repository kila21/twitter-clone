
import { useEffect, useState } from 'react'

import userIcon from '../../../assets/images/user.png'
import likeIconWhite from '../../../assets/interact-icons/like-white.svg';
import likeIconRed from '../../../assets/interact-icons/like-red.svg';
import shareIconWhite from '../../../assets/interact-icons/share-white.svg';
// import commentIconWhite from '../../../assets/interact-icons/comment-white.svg';
// import shareIconRed from '../../../assets/interact-icons/share-green.svg';

import { RootState } from '../../../main';
import { useAppSelector } from '../../../store/hooks';

import { RemoveLikedPostFromFirbase, UserHaveLikedOrNot, AddLikedPostInFirabase, getPostLikes } from './userInteractFunctions';
import { auth, db } from '../../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

import './tweet.scss'


const Tweet = (props: any) => {
    const [showHidden, setShowHidden] = useState(false)
    const [liked, setLiked] = useState(false)
    const [countOfLikes, setCountofLikes] = useState(0)

    const selector = useAppSelector((state: RootState) => state.userInfo)
    // let postAuthorID = ''
    let interacterUserID = ''

    const getInfosForLikePost = async () => {
        const collect = collection(db, 'users');
        const snap = await getDocs(collect)

        snap.docs.map(doc => {
            const authorEmail = doc.data().email
            // if(authorEmail === props.email ) {
            //     postAuthorID = doc.id
            // }
            if(auth.currentUser?.email === doc.data().email) {
                interacterUserID = doc.id
            }
        })

        const isLiked =  await UserHaveLikedOrNot(props.uid, props.post)
        setLiked(isLiked)
    }

    useEffect(() => {
        getInfosForLikePost()
        getPostLikes(props.uid, props.post).then(res=>{
            console.log(res)
            setCountofLikes(res)
        })
        
    }, [])
    
    return (
        <div className="tweet-container">
           {(auth.currentUser?.uid === props.uid)  && <div onClick={() => setShowHidden(!showHidden)} className='remove-post-container'>
                ...
            </div>}
            <div className={showHidden ? 'remove-post-hidden remove-post-show' : 'remove-post-hidden'}>
                    remove post
            </div>

            <div className="tweet-icon">
                <img src={userIcon}/>
            </div>

            <div className='tweet-user-post'>
                <div className='tweet-user-name'>
                    <p>{props.username ? props.username : props.email}</p>
                    <span>May 18</span>
                </div>

                <div className='tweet-user-content'>
                    <p>
                        {props.post}
                    </p>
                </div>

                <div className='tweet-user-post-reacts'>
                    {/* <div className='react-comment'>
                        <img src={commentIconWhite}/>
                        <p>{props.post.comments}</p>
                    </div> */}

                    <div className='react-share'>
                        <img  src={shareIconWhite}/>
                        <p>{props.shares?.length}</p>
                    </div>

                    <div className='react-like'>
                        {!liked && 
                        <img onClick={() => {
                            AddLikedPostInFirabase(props.uid, props.post)
                            setLiked(true)
                            setCountofLikes(countOfLikes+1)
                        }} 
                        src={likeIconWhite}/>}


                        {liked && 
                        <img onClick={() => { 
                            RemoveLikedPostFromFirbase(props.uid, props.post)
                            setLiked(false)
                            setCountofLikes(countOfLikes-1)
                        } }
                        src={likeIconRed} />}
                        <p>{countOfLikes}</p>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default Tweet;