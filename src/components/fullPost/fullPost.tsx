import { useLocation, useNavigate } from 'react-router-dom';

import userProfile from '../../assets/images/user.png'
import  retweetIcon from '../../assets/interact-icons/share-white.svg'
import  retweetIconGreen from '../../assets/interact-icons/share-green.svg'

import likeIcon from '../../assets/interact-icons/like-white.svg'
import likeIconRed from '../../assets/interact-icons/like-red.svg'

import commentIcon from '../../assets/interact-icons/comment-white.svg'

import './fullPost.scss';
import { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { useAppDispatch } from '../../store/hooks';
import { deletePostInCollection } from '../../store/userInfo/userInfo.thunk';
import { AddLikedPostInFirabase, RemoveLikedPostFromFirbase } from '../home/tweet/userInteractFunctions';

const FullPost = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // for post removing and other functions
    const [showHiddenDiv, setShowhiddenDiv] = useState(false)

    const [liked, setLiked] = useState(false)
    const [retweeted, setRetweeted] = useState(false)
    const [numberOfLikes, setNumberOfLikes] = useState(location.state.likes.length)

    useEffect(() => {
        setLiked(location.state.liked)
    },[])

    //only if currentuser and post author are the same.
    const removePost = () => {
        const data = {
            post: location.state.post,
            likes: location.state.likes,
            shares: location.state.shares
        }
        dispatch(deletePostInCollection(data))
        navigate('/home')
    }

    return (
        <div className='fullpost-container'>
            <div className='fullpost-title'>
                <span onClick={() => navigate('/home')}>X</span>
                <h1>Tweet</h1>
            </div>

            <div className='fullpost-post'>
                <div className='fullpost-post_user'>
                    <div className='fullpost-post_user__profile'>
                        <img src={userProfile}/>
                        <h3>{location.state?.username}</h3>
                    </div>
                    <div className='fullpost-post-hidden'>
                        <span onClick={() => setShowhiddenDiv(!showHiddenDiv)}>...</span>
                        <div className={showHiddenDiv ? 'fullpost-hidden-active': 'hidden'}>
                            <li>Follow @{location.state.username}</li>
                            {auth.currentUser?.uid === location.state.uid && <li onClick={removePost}>Remove Post</li>}
                        </div>
                    </div>
                    
                </div>
                <div className='fullpost-post_content'>
                    {location.state?.post}
                </div>
            </div>

            <div className='fullPost-all-interacts'>
                <span>{numberOfLikes} <p>likes</p></span>
                <span>{location.state.shares.length} <p>retweets</p></span>
            </div>

            <div className='fullpost-user-interacts'>
                <img src={commentIcon} alt="comment icon" />    
                {retweeted 
                ? <img src={retweetIconGreen} alt='retweet icon'/>
                : <img src={retweetIcon} alt='retweet icon'/>
                }
                { liked 
                ? 
                <img onClick={() => {
                    setLiked(!liked)
                    RemoveLikedPostFromFirbase(location.state.uid, location.state.post)
                    setNumberOfLikes(numberOfLikes-1)
                    }
                } src={likeIconRed} alt="like icon" /> 
                :
                <img onClick={() => {
                    setLiked(!liked)
                    AddLikedPostInFirabase(location.state.uid, location.state.post)
                    setNumberOfLikes(numberOfLikes+1)
                    }
                } src={likeIcon} alt="comlikement icon" />
                }
               
            </div>
        </div>
    )
}


export default FullPost;