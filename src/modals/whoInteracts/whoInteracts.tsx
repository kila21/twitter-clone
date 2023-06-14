import { useAppDispatch } from '../../store/hooks';
import { postLikesModal } from '../../store/userInfo/userInfo.slice';

import userProfile from '../../assets/images/user.png'
import './whoInteracts.scss'
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const WhoInteracts = (props: any) => {
    const dispatch = useAppDispatch()

    const [users, setUsers] = useState<{username: string}[]>([])


    const getAllUser = async () => {
        const newData = await Promise.all(
            props.likes.map(async (item: string)=> {
                const userCollection = doc(db, 'users', item);
                const snap = await getDoc(userCollection)
                
                if(snap.exists()) {
                    const data = {
                        username: snap.data().username,
                        // follow aqvs tuara current iusers,
                        //profilis surati
                    }
                    return data
                } return null
            })
        )
        setUsers(newData)
    }


    useEffect(() => {
        console.log(props)
        getAllUser()
    },[])

    return (
        <div className='whointeracts-page'>
            <div className='whointeracts-container'>
                <div className='whointeracts-container_title'>
                    <div onClick={()=> dispatch(postLikesModal(false))}>X</div> 
                    <h1>{props.title === 'like' ? 'Liked By' : 'Retweeted By'}</h1>
                </div>

                { (users && users.length > 0) && 
                    users.map((i,index) => {
                        return (
                            <div key={index+'username'} className='whointeracts-container_users'>
                                <div className='whointeracts-container_users--user'>
                                    <img src={userProfile} alt='user profile'/>
                                    <p>{i.username}</p> 
                                </div>
                                <button>Follow</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default WhoInteracts;