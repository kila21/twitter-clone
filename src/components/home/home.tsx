
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import NewTweet from './newTweet/newTweet';
import Tweet from './tweet/tweet';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { auth, db } from '../../config/firebase';
import { getUserInfoThunk } from '../../store/userInfo/userInfo.thunk';

import './home.scss'
import { RandomPost } from '../../types/RandomPost.type';

import { collection, getDocs } from 'firebase/firestore';
import { Post } from '../../store/userInfo/userInfo.slice';

import { ClipLoader } from 'react-spinners'


const Home = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector((state) => state.userInfo)
    const [randomPosts, setRandomPosts] = useState<RandomPost[]>([]);
    const [isLoading, setIsLoading] = useState(true)
 
    // const navigate = useNavigate()

    const getUsers = async () => {
        setTimeout(async () => {
            const users = collection(db, 'users')
            const snap = await getDocs(users)
            const newPostsAray: RandomPost[] = []
            snap.docs.map((item) => {
                if(item.data().posts.length >= 3) {
                    const index = item.data().posts.length-1;
                    for(let i = 0; i < 3; i++)  {
                        const data = {
                            ...item.data().posts[index-i],
                            uid: item.id,
                            email: item.data().email,
                            username: item.data().username,
                            postIndex: index,
                            photoURL: item.data().photoURL
                        }
                        newPostsAray.push(data)
                    
                    }
                }else {
                    const randomPostsArray: RandomPost[] = [];
                    item.data().posts.map((i: Post, index: number) => {
                        const data = {
                            ...i,
                            uid: item.id,
                            email: item.data().email,
                            username: item.data().username,
                            postIndex: index,
                            photoURL: item.data().photoURL
                        }
                        randomPostsArray.push(data)
                    })
                    const reversedPosts: RandomPost[] = randomPostsArray?.slice().reverse()
                    newPostsAray.push(...reversedPosts)
                
                }
            })
            setRandomPosts(newPostsAray);
            setIsLoading(false)
    },2000) 
    }
    useEffect(() => {
        getUsers()
    },[selector.posts?.length,selector.posts])

    useEffect(() => {
        setTimeout(()=> {
            dispatch(getUserInfoThunk())
        },2000)
        

        if(selector.posts && selector.posts.length > 0) {
            let pushNewPost = false;
            for(let p = 0; p <= randomPosts.length-1; p++) {
                if(randomPosts[p].post === selector.posts[selector.posts.length-1].post) {
                    pushNewPost = false;
                    break
                }
                pushNewPost = true;
            }
            if(pushNewPost) {
                const data: RandomPost = {
                    ...selector.posts[selector.posts.length-1],
                    uid: auth.currentUser!.uid,
                    username: selector.username,
                    email: selector.email,
                    postIndex: selector.posts.length-1,
                    photoURL: selector.photoURL
                }
                const newArray = [data,...randomPosts]
               
                setRandomPosts(newArray)
            }
        }

    },[selector.posts?.length]);


    return (
        <div className='home-container'>
            <div className='home-container_title'>
                    <h1>Home</h1>
                    <span>For you</span>
            </div>

            <div className='home-newTweet'>
                <NewTweet />
            </div>

            <div className='home-tweets'> 
                {isLoading && <div className='spinner'>
                    <ClipLoader color='blue'/>
                </div>
                }   

                {!isLoading && randomPosts.length > 0 && randomPosts?.map((p: any,index: number) => {
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
                    photoURL = {p.photoURL}
                    />
                })}
            </div>
        </div>


    )
}

export default Home;
