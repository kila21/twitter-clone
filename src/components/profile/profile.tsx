
import profileIcon from '../../assets/images/user.png'
import calendar from '../../assets/images/message.svg'

import './profile.scss'

const Profile = () => {
    return (
        <div className='profile-container'>
            <div className='profile-name-fixed'>
                    <span>X</span>
                <div>
                    <h3>thelastdance</h3>
                    <h5>50 Tweet</h5>
                </div>
                
            </div>

            <div className='profile-cover'>

            </div>

            <div className='profile-user'>
                <img className='profile-user__image' src={profileIcon} alt='user icon'/>
                <h1>The last Dance</h1>
                <div className='profile-joined-date'>
                    <img src={calendar} alt='calendar icon'/>
                    <p>Joined April 2023</p>
                </div>
                <div className='profile-followers'>
                    <span>
                        10 <p>following</p>
                    </span>

                    <span>
                        20 <p>followers</p>
                    </span>
                </div>
            </div>

            <div className='profile-interaction-list'>

            </div>
        </div>
    )
}

export default Profile;