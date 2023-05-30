
import AccountInfo from '../Account-info/account-info';
import './twitter.scss'

import user from '../../assets/images/user.png'
import { useEffect, useState } from 'react';
import Home from '../home/home';
import MobileNavigation from './mobile-navigation/mobileNavigation';
import ChangeUsernameModal from '../../modals/changeUsername/changeUsername.modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../main';

const Twitter = () => {
    
    const [click, setClick] = useState(false)
    const [maxWidth, setMaxWidth] = useState(window.innerWidth)

    const selector = useAppSelector((state: RootState) => state.userInfo)

    useEffect(() => {
        const handleResize = () => {
           setMaxWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
        if(maxWidth >= 500 || selector.changeUsernameModal) {
            setClick(false)
        }
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    },[maxWidth, selector.changeUsernameModal])

    const collapseClickHandler = () => {
        setClick(false)
    }

    const changeBackStyles = () => {

        // if(selector.changeUsernameModal) {
        //     const pageContainer = document.getElementById('twitter')
        //     if(pageContainer) {
        //         pageContainer.style.backgroundColor = 'red'
        //     }
        // }
       
        return <ChangeUsernameModal />
    }

    return (
        <div id='twitter' className='twitter-container'>
            <div className={click ? 'active-twitter-account-info' :'twitter-account-info'}>
                <AccountInfo collapse={collapseClickHandler}/>
            </div>

            <div className='twitter-account-content'>
                {maxWidth < 500 &&
                (<div className='twitter-user'>
                    <img onClick={() => setClick(true)} src={user}/>
                </div>)}

                <div className=''>
                    <Home />
                </div>
            </div>

            <div className='mobile-fiexd-main-list'>
                <MobileNavigation />
            </div>
            {selector.changeUsernameModal && changeBackStyles()}
        </div>

    )
}

export default Twitter;