

import './mobileNavigation.scss'

import homeIcon from '../../../assets/images/home.svg'
import searchIcon from '../../../assets/images/search.svg'
import messageIcon from '../../../assets/images/message.svg'
import { useNavigate } from 'react-router-dom'

const MobileNavigation = () => {
    const navigate = useNavigate()


    return (
        <div className='mobileNavigation'>
            <img onClick={() => navigate('/home')} src={homeIcon} alt='home'/>
            <img onClick={() => navigate('/home/explore')} src={searchIcon} alt='search'/>
            <img onClick={() => navigate('/home/message')} src={messageIcon} alt='message'/>
        </div>
    )
}


export default MobileNavigation;