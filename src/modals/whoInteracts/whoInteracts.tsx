import { useAppDispatch } from '../../store/hooks';
import { postLikesModal } from '../../store/userInfo/userInfo.slice';

import userProfile from '../../assets/images/user.png'
import './whoInteracts.scss'
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { AddNewFollowInCollection, RemoveUserFollowinInCollection } from '../../store/userInfo/userInfo.thunk';

const WhoInteracts = (props: any) => {
    const dispatch = useAppDispatch()

    const [users, setUsers] = useState<{username: string, uid: string, followed: boolean}[]>([])


    const getAllUser = async () => {
        const newData = await Promise.all(
            props.likes.map(async (item: string)=> {
                const userCollection = doc(db, 'users', item);
                const snap = await getDoc(userCollection)

                const currentUserCollection = doc(db, 'users', auth.currentUser!.uid)
                const currentSnap = await getDoc(currentUserCollection)
                
                let currUserHaveFollowed = false;

                if(currentSnap.exists()) {
                    currentSnap.data().following.map((follow: string) => {
                        if(follow === item) {
                            currUserHaveFollowed = true
                        }
                    })
                }

                if(snap.exists()) {
                    const data = {
                        username: snap.data().username,
                        uid: snap.id,
                        // follow aqvs tuara current iusers,
                        followed: currUserHaveFollowed
                        //profilis surati
                    }
                    return data
                } return null
            })
        )
        setUsers(newData)
    }

    const addFollow = (id: string, index: number) => {
        dispatch(AddNewFollowInCollection(id))
        const newData = [...users]
        newData[index].followed = true
        setUsers(newData)
    }

    const removeFollow = (id: string, index:number) =>{ 
        dispatch(RemoveUserFollowinInCollection(id))
        const newData = [...users]
        newData[index].followed = false
        setUsers(newData)
    }


    useEffect(() => {
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
                                {(auth.currentUser!.uid !== i.uid) 
                                && !i.followed 
                                && <button onClick={() => addFollow(i.uid, index)}>Follow</button>
                                }

                                {(auth.currentUser!.uid !== i.uid) 
                                && i.followed 
                                && <button onClick={() => removeFollow(i.uid, index)}>unfollow</button>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default WhoInteracts;