
import { useEffect } from 'react'
import { collection, getDoc, doc} from 'firebase/firestore'


import {auth, db } from '../../../config/firebase'

import './tweet.scss'
import userIcon from '../../../assets/images/user.png'
import { useAppSelector } from '../../../store/hooks'



const Tweet = (props: any) => {
 

    return (
        <div className="tweet-container">
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