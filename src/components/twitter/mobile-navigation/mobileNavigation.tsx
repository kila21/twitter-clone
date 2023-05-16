

import './mobileNavigation.scss'

import homeIcon from '../../../assets/images/home.svg'
import searchIcon from '../../../assets/images/search.svg'
import notificationIcon from '../../../assets/images/notification.svg'
import messageIcon from '../../../assets/images/message.svg'

const MobileNavigation = () => {
    return (
        <div className='mobileNavigation'>
            <img src={homeIcon} alt='home'/>
            <img src={searchIcon} alt='search'/>
            <img src={notificationIcon} alt='notification'/>
            <img src={messageIcon} alt='message'/>
        </div>
    )
}


export default MobileNavigation;