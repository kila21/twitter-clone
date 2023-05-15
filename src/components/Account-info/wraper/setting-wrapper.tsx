
import { useEffect, useState } from 'react'

import './setting-wrapper.scss'


import logoutIcon from '../../../assets/images/logout-white.svg'
import settingIcon from '../../../assets/images/setting-white.svg'
import userIcon from '../../../assets/images/user.png'

const SettingWrapper = () => {
    const [active, setActive] = useState(false)
    const [maxWidth, setMaxWidth] = useState(window.innerWidth)
    const [userClick, setUserClick] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setMaxWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        console.log(maxWidth)
        return () => {
            window.removeEventListener('resize', handleResize)
            setActive(false)
            setUserClick(false)
        }
    },[maxWidth])

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
                            <img src={logoutIcon} alt="logout icon" />
                            <h3>Log Out</h3>
                        </div>
                    </div>
                </div>
            )
        } else {
            
            return (
                <div className='account-info_help-user'>
                    <img onClick={() => setUserClick(!userClick)} src={userIcon} alt='user Icon'/>
                    {maxWidth > 1280 && <span>Luka</span>}
                    {
                        userClick && 
                        (
                            <div className={userClick ? 'accout-info_help-medium' :'account-info_help-hidden'}>
                                <div >
                                    <h3>Setting And Privacy</h3>
                                </div>

                                <div>
                                    <h3>Log Out</h3>
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