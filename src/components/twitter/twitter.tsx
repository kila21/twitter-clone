
import AccountInfo from '../Account-info/account-info';
import './twitter.scss'

import user from '../../assets/images/user.png'
import { useEffect, useState } from 'react';

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

        console.log(maxWidth)
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
            <div className='twitter-account-content'></div>
            
        </div>

    )
}

export default Twitter;