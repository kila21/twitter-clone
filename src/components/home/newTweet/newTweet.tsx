

import './newTweet.scss'
import userIcon from '../../../assets/images/user.png'

const NewTweet = () => {
    return (
        <div className="newTweet">
            <div className='newTweet-post'>
                <img src={userIcon} alt='userIcon'/>
                <textarea placeholder='What is Happening?'></textarea>  
            </div>
           
            
            <div className='post-contents'>
                <button>Tweet</button>
            </div>
        </div>
    )
}

export default NewTweet;