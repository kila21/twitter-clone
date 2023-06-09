
import { useEffect, useState } from 'react'

import userIcon from '../../../assets/images/user.png'
import likeIconWhite from '../../../assets/interact-icons/like-white.svg';
import likeIconRed from '../../../assets/interact-icons/like-red.svg';
import shareIconWhite from '../../../assets/interact-icons/share-white.svg';
// import commentIconWhite from '../../../assets/interact-icons/comment-white.svg';
// import shareIconRed from '../../../assets/interact-icons/share-green.svg';

import { useAppDispatch } from '../../../store/hooks';

import { RemoveLikedPostFromFirbase, UserHaveLikedOrNot, AddLikedPostInFirabase, getPostLikes } from './userInteractFunctions';
import { auth } from '../../../config/firebase';


import './tweet.scss'
import { deletePostInCollection } from '../../../store/userInfo/userInfo.thunk';
import { Post, addLike } from '../../../store/userInfo/userInfo.slice';
import { useNavigate } from 'react-router-dom';



const Tweet = (props: any) => {
    const [showHidden, setShowHidden] = useState(false)
    const [liked, setLiked] = useState(false)
    const [countOfLikes, setCountofLikes] = useState(0)
    
    const tweetDate = new Date(props.date)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    const getInfosForLikePost = async () => {
        const isLiked =  await UserHaveLikedOrNot(props.uid, props.post)
        setLiked(isLiked)
    }

    useEffect(() => {
        if(props.uid && props.post) {
            getInfosForLikePost()
            getPostLikes(props.uid, props.post).then(res=>{
                setCountofLikes(res)
            })
        }
        
    }, [])

    const removePost = () => {
        const data: Post = {
            post: props.post,
            likes: props.likes,
            shares: props.shares,
            date: props.date
        }
        dispatch(deletePostInCollection(data))
    }

    const NavigateToFullPost = () => {
        const data = {
            ...props,
            liked: liked
        }

        if(props.username) {
            navigate(`/home/${props.username}/${props.postIndex}`, {state: data})
        }else {
            navigate(`/home/${props.email}/${props.postIndex}`, {state: data})
        }
    }
    
    return (
        <div className="tweet-container">
          

            <div className="tweet-icon">
                <img src={props.photoURL || userIcon} alt='user profile icon'/>
            </div>

            <div className='tweet-user-post'>
                <div className='tweet-user-name'>
                    <p onClick={() => navigate(`/home/${props.username ? props.username : props.email}`,{state: props.uid})}>
                        {props.username ? props.username : props.email}
                    </p>
                    <span>
                        {tweetDate.getDate()}{tweetDate.toLocaleString('default', { month: 'short' })}, {tweetDate.getFullYear()}
                        </span>
                </div>

                <div onClick={NavigateToFullPost} className='tweet-user-content'>
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
                            dispatch(addLike(props.post))
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

            <div onClick={() => removePost()} className={showHidden ? 'remove-post-hidden remove-post-show' : 'remove-post-hidden'}>
                    remove post
            </div>
            {(auth.currentUser?.uid === props.uid)  && <div onClick={() => setShowHidden(!showHidden)} className='remove-post-container'>
                ...
            </div>}
        </div>
    ) 
}

export default Tweet;