
import profileIcon from '../../assets/images/user.png'
import calendar from '../../assets/images/message.svg'

import './profile.scss'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { RandomPost } from '../../types/RandomPost.type'
import Tweet from '../home/tweet/tweet'
import { Post } from '../../store/userInfo/userInfo.slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { AddNewFollowInCollection, RemoveUserFollowinInCollection } from '../../store/userInfo/userInfo.thunk'
import { RootState } from '../../main'

type userDataType = {
    following: string[],
    followers: string[], 
    username: string, 
    email: string,
    dateOfJoin: Date
}

const Profile = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const selector = useAppSelector((state: RootState) => state.userInfo)

    // userLikedPosts
    const [postsArray, setPostsArray] = useState<RandomPost[]>([])

    //userData 
    const [userData, setUserData] = useState<userDataType>()

    //userTweets
    const [userTweets, setUserTweets] = useState<RandomPost[]>([])

    // pick which content to show, false === liked,  true === tweets
    const [clicked, setClicked] = useState(false)

    // current user have follow or not 
    const [follow, setFollow] = useState(false)

    // getUserTweets 
    const getUserTweets = async () =>{
        const profileUser = doc(db, 'users', location.state)
        const profileUserSnap = await getDoc(profileUser)
        const newArray: RandomPost[] = [];

        if(profileUserSnap.exists()) {
            await Promise.all(
                profileUserSnap.data().posts.map((post: Post, i: number) => {
                    const data = {
                        post: post.post,
                        username: profileUserSnap.data().username,
                        email: profileUserSnap.data().email,
                        likes: post.likes,
                        date: post.date,
                        shares: post.shares,
                        uid: profileUserSnap.id,
                        postIndex: i
                    }
                    newArray.push(data)
                })
            )
            setUserTweets(newArray)
            const data = {
                following: profileUserSnap.data().following,
                followers: profileUserSnap.data().followers,
                username: profileUserSnap.data().username,
                email: profileUserSnap.data().email,
                dateOfJoin: new Date(profileUserSnap.data().dateOfJoin)
            }
            setUserData(data)
        }
    }

    // Get User likedPosts
    const getUserProfile = async () => {
        const profileUser = doc(db, 'users', location.state)
        const profileUserSnap = await getDoc(profileUser)
        const newArray: RandomPost[] = [];
    
        if(profileUserSnap.exists()) {
            await Promise.all(
            profileUserSnap.data().likedPosts.map(async (item: {id: string, post:string})=> {
                const likedPostUser = doc(db, 'users', item.id);
                const likedPostUserSnapshot = await getDoc(likedPostUser)
                if(likedPostUserSnapshot.exists()) {
                    likedPostUserSnapshot.data().posts.map(async (p: any, i: number) => {
                        if(p.post === item.post) {
                            const data = {
                                post: p.post,
                                username: likedPostUserSnapshot.data().username,
                                email: likedPostUserSnapshot.data().email,
                                likes: p.likes,
                                date: p.date,
                                shares: p.shares,
                                uid: likedPostUserSnapshot.id,
                                postIndex: i
                            }
                            newArray.push(data)
                        }
                    })
                }
            }))
            setPostsArray([...newArray])
            const data = {
                following: profileUserSnap.data().following,
                followers: profileUserSnap.data().followers,
                username: profileUserSnap.data().username,
                email: profileUserSnap.data().email,
                dateOfJoin: new Date(profileUserSnap.data().dateOfJoin)
            }
            if(data.followers.includes(auth.currentUser!.uid)) {
                setFollow(true)
            }
            setUserData(data)
        }
    }

    useEffect(() => {
        getUserProfile()
    },[location.state, selector.following.length])
    
    return (
        <div className='profile-container'>
            <div className='profile-name-fixed'>
                    <span onClick={() => navigate('/home')}>X</span>
                <div>
                    <h3>{userData?.username || userData?.email}</h3>
                    <h5>
                        {clicked ? `${userTweets?.length} Tweets` : `${postsArray.length} Likes`}
                    </h5>
                </div>
                
            </div>

            <div className='profile-cover'>

            </div>

            <div className='profile-user'>
                <img className='profile-user__image' src={profileIcon} alt='user icon'/>
                {(auth?.currentUser?.uid !== location.state ) && !follow && 
                <button className='profile-user__button' onClick={() => {
                    dispatch(AddNewFollowInCollection(location.state))
                    setFollow(true)
                }}>
                    Follow
                </button>
                }
                {(auth?.currentUser?.uid !== location.state ) && follow && 
                <button className='profile-user__button' onClick={() => {
                    dispatch(RemoveUserFollowinInCollection(location.state))
                    setFollow(false)
                }}>
                    unfollow
                </button>
                }
                <h1>{userData?.username || userData?.email}</h1>
                <div className='profile-joined-date'>
                    <img src={calendar} alt='calendar icon'/>
                    <p>
                        Joined {userData?.dateOfJoin.getDate()} 
                        {userData?.dateOfJoin.toLocaleString('default', {month: 'long'})} {userData?.dateOfJoin.getFullYear()}
                     </p>
                </div>
                <div className='profile-followers'>
                    <span>
                        {userData?.following.length} <p>following</p>
                    </span>

                    <span>
                        {userData?.followers.length} <p>followers</p>
                    </span>
                </div>
            </div>

            <div className='profile-interaction-list'>
                <div 
                className={!clicked ? 
                    'profile-interaction-list__item profile-interaction-list__item-active' : 
                    'profile-interaction-list__item'}
                // className='profile-interaction-list__item profile-interaction-list__item-active' 
                onClick={() => {
                    setClicked(false)
                    setUserTweets([])
                    getUserProfile()
                    }}>Likes</div>

                <div 
                className={clicked ? 
                'profile-interaction-list__item profile-interaction-list__item-active' :
                 'profile-interaction-list__item'
                } 

                onClick={() => {
                    setClicked(true)
                    getUserTweets()
                    setPostsArray([])
                }}
                >Tweets</div>
                {/* <div>Replies</div> */}
            </div>
            
            <div className='profile-tweets-content'>
                {!clicked && postsArray && postsArray.map((i,index) => {
                    return <Tweet 
                    key={index+i.post} 
                    post={i.post} 
                    username={i.username} 
                    email={i.email}
                    likes={i.likes}
                    date={i.date}
                    shares={i.shares}
                    uid={i.uid}
                    postIndex = {i.postIndex}
                    />
                })}

                {clicked && userTweets && userTweets.map((p,index) => {
                    return <Tweet 
                    key={index+p.post} 
                    post={p.post} 
                    username={p.username} 
                    email={p.email}
                    likes={p.likes}
                    date={p.date}
                    shares={p.shares}
                    uid={p.uid}
                    postIndex = {p.postIndex}
                    />
                })}

                {!clicked && postsArray && postsArray.length === 0 && <div className='profile-no-post'> No Post have Liked</div>}
                {clicked && userTweets && userTweets.length === 0 && <div className='profile-no-post'> No Post have Tweeted</div>}
            </div>
        </div>
    )
}

export default Profile;