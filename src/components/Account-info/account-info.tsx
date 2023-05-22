

import { useEffect, useState } from 'react'
import SettingWrapper from './wraper/setting-wrapper'


//scss
import './account-info.scss'

//icons
import autoUserImage from '../../assets/images/user.png'
import profileIcon from '../../assets/images/profile-white.svg'
import bookmarkIcon from '../../assets/images/bookmark-white.svg'
import listIcon from '../../assets/images/list-white.svg'
import twitterBlueIcon from '../../assets/images/twitter-blue-white.svg'
import verifiedIcon from '../../assets/images/verified-white.svg'

import homeIcon from '../../assets/images/home.svg'
import searchIcon from '../../assets/images/search.svg'
import notificationIcon from '../../assets/images/notification.svg'
import messageIcon from '../../assets/images/message.svg'


const AccountInfo = (props: any) => {
    const [maxWidth, setMaxWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setMaxWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        console.log(maxWidth)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [maxWidth])


    const listItem = (title: string, src: string) => {
        // {maxWidth > 500 && 
        //     (<div className='account-info_list-item'>
        //         <img src={homeIcon} alt='home'/>
        //         {maxWidth < 500 && maxWidth > 1280 && <h3>Home</h3>}
        //     </div>)
        // }
        return (
            <div className='account-info_list-item'>
                <img src={src} alt={src}/>
                {(maxWidth < 500 || maxWidth > 1280) && <h3>{title}</h3> }
            </div>
        )
    }


    return (
        <div className='account-info_container'>
            { maxWidth < 500 && 
            (<div className='account-info_title'>
                <p>Account Info</p>
                <p onClick={props.collapse} className='account-info_title--collapse'>X</p>
            </div>)
            }
            
            {maxWidth < 500 && 
            ( 
            <div className='account-info_user'>
                <img src={autoUserImage} alt='auto user Image'/>
                <p className='account-info_user-name'>Luka</p>
                <div className='account-info_user-following'>
                    <p>0 <span>following</span></p>
                    <p>10 <span>followers</span></p>
                </div>
            </div>
            )
            }
        
            <div className='account-info_list'>
                { maxWidth > 500 && listItem('Home', homeIcon) }
                { maxWidth > 500 && listItem('Search', searchIcon) }
                { maxWidth > 500 && listItem('Notification', notificationIcon) }
                { maxWidth > 500 && listItem('Message', messageIcon) }
                
                { listItem('Profile', profileIcon)}
                { listItem('Twitter Blue', twitterBlueIcon)}
                { listItem('Lists', listIcon)}
                { listItem('Bookmarks', bookmarkIcon)}
                { listItem('Verified Orgs', verifiedIcon)}
            </div>
       
            <SettingWrapper />
            
        </div>
    )
}

export default AccountInfo;