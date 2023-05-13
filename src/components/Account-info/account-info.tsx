

import { useState } from 'react'


//scss
import './account-info.scss'

//icons
import autoUserImage from '../../assets/images/user.png'
import profileIcon from '../../assets/images/profile-white.svg'
import bookmarkIcon from '../../assets/images/bookmark-white.svg'
import listIcon from '../../assets/images/list-white.svg'
import twitterBlueIcon from '../../assets/images/twitter-blue-white.svg'
import verifiedIcon from '../../assets/images/verified-white.svg'
import logoutIcon from '../../assets/images/logout-white.svg'
import settingIcon from '../../assets/images/setting-white.svg'


const AccountInfo = () => {
    const [active, setActive] = useState(false)

    return (
        <div className='account-info_container'>
            <div className='account-info_title'>
                <p>Account Info</p>
                <p className='account-info_title--collapse'>X</p>
            </div>

            <div className='account-info_user'>
                <img src={autoUserImage} alt='auto user Image'/>
                <p className='account-info_user-name'>Luka</p>
                <div className='account-info_user-following'>
                    <p>0 <span>following</span></p>
                    <p>10 <span>followers</span></p>
                </div>
            </div>

            <div className='account-info_list'>
                <div className='account-info_list-item'>
                    <img src={profileIcon} alt='profile'/>
                    <h3>Profile</h3>
                </div>

                <div className='account-info_list-item'>
                    <img src={twitterBlueIcon} alt='twitter blue icon'/>
                    <h3>Twitter Blue</h3>
                </div>

                <div className='account-info_list-item'>
                    <img src={listIcon} alt='list icon'/>
                    <h3>Lists</h3>
                </div>


                <div className='account-info_list-item'>
                    <img src={bookmarkIcon} alt='bookmark icon'/>
                    <h3>Bookmarks</h3>
                </div>

                <div className='account-info_list-item'>
                    <img src={verifiedIcon} alt='verified orgs Icon'/>
                    <h3>Verified Orgs</h3>
                </div>
            </div>

            <div className='account-info_help'>
                <div 
                className={active ? 'help-title active-div' : 'help-title'}
                onClick={() => setActive(!active)}
                >
                    <h2>Settings And Supports</h2>
                    <span className={active ? 'active-span' : ''}>&lt;</span>
                </div>

                <div className={active ? 'help-hidden-list active-list' : 'help-hidden-list'}>
                    <div className='help-hidden-list-item'>
                        <img src={settingIcon} alt="setting Icon" />
                        <h3>Setting And Privacy</h3>
                    </div>

                    <div className='help-hidden-list-item'>
                        <img src={logoutIcon} alt="logout icon" />
                        <h3>Log Out</h3>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default AccountInfo;