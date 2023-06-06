
import { useEffect, useState } from 'react'

import userIcon from '../../../assets/images/user.png'
import likeIconWhite from '../../../assets/interact-icons/like-white.svg';
import likeIconRed from '../../../assets/interact-icons/like-red.svg';
import shareIconWhite from '../../../assets/interact-icons/share-white.svg';
// import commentIconWhite from '../../../assets/interact-icons/comment-white.svg';
// import shareIconRed from '../../../assets/interact-icons/share-green.svg';

import { RootState } from '../../../main';
import { useAppSelector } from '../../../store/hooks';

import { RemoveLikedPostFromFirbase, UserHaveLikedOrNot, AddLikedPostInFirabase } from './userInteractFunctions';
import { auth, db } from '../../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

import './tweet.scss'


const Tweet = (props: any) => {
    const [showHidden, setShowHidden] = useState(false)
    const [liked, setLiked] = useState(false)

    const selector = useAppSelector((state: RootState) => state.userInfo)
    let postAuthorID = ''
    let interacterUserID = ''

    const getInfosForLikePost = async () => {
        const collect = collection(db, 'users');
        const snap = await getDocs(collect)
        snap.docs.map(doc => {
            if(doc.data().email === props.email ) {
                postAuthorID = doc.id
            }
            if(auth.currentUser?.email === doc.data().email) {
                interacterUserID = doc.id
            }
        })

        const isLiked =  await UserHaveLikedOrNot(postAuthorID, props.post)
        setLiked(isLiked)
    }

    useEffect(() => {
        getInfosForLikePost()
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
                        <p>{props.shares.length}</p>
                    </div>

                    <div className='react-like'>
                        {!liked && 
                        <img onClick={() => {
                            AddLikedPostInFirabase(postAuthorID, props.post)
                            setLiked(true)
                        }} 
                        src={likeIconWhite}/>}


                        {liked && 
                        <img onClick={() => { 
                            RemoveLikedPostFromFirbase(postAuthorID, props.post)
                            setLiked(false)
                        } }
                        src={likeIconRed} />}
                        <p>{props.likes.length}</p>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default Tweet;