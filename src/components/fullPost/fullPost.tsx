import { useLocation, useNavigate } from 'react-router-dom';

import userProfile from '../../assets/images/user.png'
import  retweetIcon from '../../assets/interact-icons/share-white.svg'
import  retweetIconGreen from '../../assets/interact-icons/share-green.svg'

import likeIcon from '../../assets/interact-icons/like-white.svg'
import likeIconRed from '../../assets/interact-icons/like-red.svg'

import commentIcon from '../../assets/interact-icons/comment-white.svg'

import './fullPost.scss';

const FullPost = () => {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <div className='fullpost-container'>
            <div className='fullpost-title'>
                <span onClick={() => navigate('/home')}>X</span>
                <h1>Tweet</h1>
            </div>

            <div className='fullpost-post'>
                <div className='fullpost-post_user'>
                    <img src={userProfile}/>
                    <h3>{location.state?.username}</h3>
                </div>
                <div className='fullpost-post_content'>
                    {location.state?.post}
                </div>
            </div>

            <div className='fullPost-all-interacts'>
                <span>{location.state.likes.length} <p>likes</p></span>
                <span>{location.state.shares.length} <p>retweets</p></span>
            </div>

            <div className='fullpost-user-interacts'>
                <img src={commentIcon} alt="comment icon" />
                <img src={retweetIcon} alt='retweet icon'/>
                <img src={likeIcon} alt="like icon" />
            </div>
        </div>
    )
}


export default FullPost;