
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import logoutIcon from '../../../assets/images/logout-white.svg'
import settingIcon from '../../../assets/images/setting-white.svg'
import userIcon from '../../../assets/images/user.png'


import './setting-wrapper.scss'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { userLogOut } from '../../../store/auth/auth.thunk'
import { RootState } from '../../../main'
// import ChangeUsernameModal from '../../../modals/changeUsername/changeUsername.modal'
import { changeUsernameModalClick } from '../../../store/userInfo/userInfo.slice'

const SettingWrapper = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const selector = useAppSelector((state: RootState) => state.userInfo)

    const [active, setActive] = useState(false)
    const [maxWidth, setMaxWidth] = useState(window.innerWidth)
    const [userClick, setUserClick] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setMaxWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
            setActive(false)
            setUserClick(false)
        }
    },[maxWidth])

    const logOut = () => {
        dispatch(userLogOut())
        navigate('/')
    }

    const returnedValue = () => {
        if(maxWidth < 500) {
            return (
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
                            <img src={settingIcon} alt="setting Icon" />
                            <h3 onClick={() => dispatch(changeUsernameModalClick(true))}>Change Username</h3>
                        </div>

                        <div className='help-hidden-list-item'>
                            <img src={logoutIcon} alt="logout icon" />
                            <h3 onClick={logOut}>Log Out</h3>
                        </div>
                    </div>
                </div>
            )
        } else {
            
            return (
                <div className='account-info_help-user'>
                    <img onClick={() => setUserClick(!userClick)} src={selector.photoURL || userIcon} alt='user Icon'/>
                    {maxWidth > 1280 && <span>{selector.username || selector.email}</span>}
                    {
                        userClick && 
                        (
                            <div className={userClick ? 'accout-info_help-medium' :'account-info_help-hidden'}>
                                <div >
                                    <h3>Setting And Privacy</h3>
                                </div>

                                <div>
                                    <h3 onClick={() => dispatch(changeUsernameModalClick(true))}>Change Username</h3>
                                </div>

                                <div>
                                    <h3 onClick={logOut}>Log Out</h3>
                                </div>
                        
                            </div>
                        )
                    }
                    
                </div>
               
            )
        }
    
    }

    return (
        returnedValue()
    )
}

export default SettingWrapper;