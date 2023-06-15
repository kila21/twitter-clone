

import { useRef } from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { addNewPostInCollectionThunk } from '../../../store/userInfo/userInfo.thunk';

import './newTweet.scss'
import userIcon from '../../../assets/images/user.png'


const NewTweet = () => {
    const dispatch = useAppDispatch();
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    
    const clickHandler = () => {
        if (textareaRef.current) {
            const textareaValue = textareaRef.current.value;
            const date = new Date()
            dispatch(addNewPostInCollectionThunk(textareaValue, date))
            textareaRef.current.value = ''
          }
    }
    return (
        <div className="newTweet">
            <div className='newTweet-post'>
                <img src={userIcon} alt='userIcon'/>
                <textarea ref={textareaRef} placeholder='What is Happening?'></textarea>  
            </div>
           
            
            <div className='post-contents'>
                <button onClick={clickHandler}>Tweet</button>
            </div>
        </div>
    )
}

export default NewTweet;