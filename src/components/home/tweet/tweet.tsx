
import './tweet.scss'
import userIcon from '../../../assets/images/user.png'

const Tweet = () => {
    return (
        <div className="tweet-container">
            <div className="tweet-icon">
                <img src={userIcon}/>
            </div>

            <div className='tweet-user-post'>
                <div className='tweet-user-name'>
                    <p>Ryan</p>
                    <span>May 18</span>
                </div>

                <div className='tweet-user-content'>
                    <p>
                        User post! .......... smth
                    </p>
                </div>

                <div className='tweet-user-post-reacts'>
                    <div className='react-comment'>
                        <p>10</p>
                    </div>

                    <div className='react-share'>
                        <p>20</p>
                    </div>

                    <div className='react-like'>
                        <p>50</p>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default Tweet;