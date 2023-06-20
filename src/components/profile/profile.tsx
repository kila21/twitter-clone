
import profileIcon from '../../assets/images/user.png'
import calendar from '../../assets/images/message.svg'

import './profile.scss'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { RandomPost } from '../../types/RandomPost.type'
import Tweet from '../home/tweet/tweet'
import { Post } from '../../store/userInfo/userInfo.slice'

const Profile = () => {
    const location = useLocation()
    const navigate = useNavigate()

    // userLikedPosts
    const [postsArray, setPostsArray] = useState<RandomPost[]>([])

    //userData 
    const [userData, setUserData] = useState<{following: number, followers: number, username: string, email: string}>()

    //userTweets
    const [userTweets, setUserTweets] = useState<RandomPost[]>([])

    // pick which content to show, false === liked,  true === tweets
    const [clicked, setClicked] = useState(false)


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
                email: profileUserSnap.data().email
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
                email: profileUserSnap.data().email
            }
            setUserData(data)
        }
    }

    useEffect(() => {
        getUserProfile()
    },[location.state])
    
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
                <h1>{userData?.username || userData?.email}</h1>
                <div className='profile-joined-date'>
                    <img src={calendar} alt='calendar icon'/>
                    <p>Joined April 2023</p>
                </div>
                <div className='profile-followers'>
                    <span>
                        {userData?.following} <p>following</p>
                    </span>

                    <span>
                        {userData?.followers} <p>followers</p>
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

                {/* {postsArray && postsArray.length === 0 && <div> No Post have Liked</div>} */}
            </div>
        </div>
    )
}

export default Profile;