
import AccountInfo from '../Account-info/account-info';
import './twitter.scss'

import { useEffect, useState } from 'react';
import Home from '../home/home';
import MobileNavigation from './mobile-navigation/mobileNavigation';
import ChangeUsernameModal from '../../modals/changeUsername/changeUsername.modal';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../main';
import {Route, Routes, useParams } from 'react-router-dom';

import user from '../../assets/images/user.png'
import FullPost from '../fullPost/fullPost';
import Profile from '../profile/profile';
import Explore from '../explore/explore';
const Twitter = () => {
    
    const [click, setClick] = useState(false)
    const [maxWidth, setMaxWidth] = useState(window.innerWidth)

    const params = useParams()
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
        return <ChangeUsernameModal />
    }

    return (
        <div id='twitter' className='twitter-container'>
            <div className={click ? 'active-twitter-account-info' :'twitter-account-info'}>
                <AccountInfo collapse={collapseClickHandler}/>
            </div>

            <div className='twitter-account-content'>
                {(maxWidth < 500 && params['*'] === '' ) &&
                (<div className='twitter-user'>
                    <img onClick={() => setClick(true)} src={selector.photoURL || user}/>
                </div>)}

                <div className='twitter-home'>
                    <Routes>
                        <Route path='' Component={Home}/> 
                        <Route path='/explore' Component={Explore} />
                        <Route path='/:username' Component={Profile}/>
                        <Route path='/:username/:postId' Component={FullPost}/>
                    </Routes>
                    
                    
                </div>
            </div>

           { maxWidth > 1100 && 
           (<div className='twitter-account-search'>
                Search Components
            </div>
           )}

            <div className='mobile-fiexd-main-list'>
                <MobileNavigation />
            </div>
            {selector.changeUsernameModal && changeBackStyles()}
        </div>

    )
}

export default Twitter;