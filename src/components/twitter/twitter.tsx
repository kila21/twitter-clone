
import AccountInfo from '../Account-info/account-info';
import './twitter.scss'

import user from '../../assets/images/user.png'
import { useEffect, useState } from 'react';
import Home from '../home/home';
import MobileNavigation from './mobile-navigation/mobileNavigation';

const Twitter = () => {
    
    const [click, setClick] = useState(false)
    const [maxWidth, setMaxWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setMaxWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
        if(maxWidth >= 500) {
            setClick(false)
        }
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    },[maxWidth])

    const collapseClickHandler = () => {
        setClick(false)
    }
    return (
        <div className='twitter-container'>
           {maxWidth < 500 &&
            (<div className='twitter-user'>
                <img onClick={() => setClick(true)} src={user}/>
            </div>)}


            <div className={click ? 'active-twitter-account-info' :'twitter-account-info'}>
                <AccountInfo collapse={collapseClickHandler}/>
            </div>
            <div className='twitter-account-content'>
                <Home />
            </div>


            <div className='mobile-fiexd-main-list'>
                <MobileNavigation />
            </div>
        </div>

    )
}

export default Twitter;