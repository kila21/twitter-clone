
import './tweet.scss'
import userIcon from '../../../assets/images/user.png'
import { useState } from 'react'

const Tweet = (props: any) => {
    const [showHidden, setShowHidden] = useState(false)

    return (
        <div className="tweet-container">
            <div onClick={() => setShowHidden(!showHidden)} className='remove-post-container'>
                ...
            </div>
            <div onClick={props.remove} className={showHidden ? 'remove-post-hidden remove-post-show' : 'remove-post-hidden'}>
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
                        {props.post.post}
                    </p>
                </div>

                <div className='tweet-user-post-reacts'>
                    <div className='react-comment'>
                        <p>{props.post.likes}</p>
                    </div>

                    <div className='react-share'>
                        <p>{props.post.shares}</p>
                    </div>

                    {/* <div className='react-like'>
                        <p>50</p>
                    </div> */}
                </div>
            </div>
        </div>
    ) 
}

export default Tweet;