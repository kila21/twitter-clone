import './explore.scss'
import searchIcon from '../../assets/images/search.svg'
import userIcon from '../../assets/images/user.png'

import { useState } from 'react'
import { db } from '../../config/firebase'
import { collection, getDocs, query, where } from '@firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Explore = () => {
    const [isClicked, setIsClicked] = useState(false)
    const [data, setData] = useState<any>(null)
    const navigate = useNavigate()

    const checkUsernameExists = async (username: string) => {
        const usersCollectionRef = collection(db, 'users');
        const q = query(usersCollectionRef, where('username', '>=', username), where('username', '<', username + '\uf8ff'));
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map((doc) => {
            const newUserData = {
                ...doc.data(),
                id: doc.id
            }
            return newUserData
        });
        return users;
    };

    const getSearchUsers = async (text: string) => {
        if(text === '') {
            setData(null)
            return 
        }
        await checkUsernameExists(text).then(data => {
            setData(data)
        })
    }

    return (
        <div className='explore-container'>
            <div onClick={() => setIsClicked(true)} className='explore-search'>
                <img src={searchIcon} alt='search icon'/>
                <input onChange={(e) => getSearchUsers(e.target.value)} type='text'/>
            </div>

            {isClicked && 
            <div className='explore-users-container'>
                {!data && <div className='explore-noUser'>Try Searching For People</div>}
                {data && data.length > 0 && data.map((user: any)=>{
                    return (
                    <div onClick={() => navigate(`/home/${user.username}`,{state: user.id})} className='explore-user'>
                        <img src={user.photoURL || userIcon}/>
                        <h4>{user.username}</h4>
                    </div>)
                })}
            </div>
            }
        </div>
    )
}

export default Explore;