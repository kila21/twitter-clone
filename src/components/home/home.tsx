
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NewTweet from './newTweet/newTweet';
import Tweet from './tweet/tweet';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { auth, db } from '../../config/firebase';
import { deletePostInCollection, getUserInfoThunk } from '../../store/userInfo/userInfo.thunk';

import './home.scss'
import { RandomPost } from '../../types/RandomPost.type';

import { collection, getDocs } from 'firebase/firestore';


const Home = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector((state) => state.userInfo)
    const [posts, setPosts] = useState<RandomPost[]>([]);
    
    // const reversedPosts = selector?.posts?.slice().reverse()
    // let posts: RandomPost[] = [];

    const navigate = useNavigate()


    // const removeHandler = (post: any) => { 
    //     const newArray = reversedPosts.slice().reverse();
    //     dispatch(deletePostInCollection(post, newArray.indexOf(post)))
    // }

    const getUsers = async () => {
        const users = collection(db, 'users')
        const snap = await getDocs(users)
        const newPostsAray: RandomPost[] = []
        snap.docs.map((item) => {
            item.data().posts.map((i:any) => {
                const postForRandom: RandomPost = {
                    post: i.post, 
                    likes: i.likes,
                    shares: i.shares,
                    username: item.data()?.username,
                    email: item.data()?.email,
                    uid: item.id
                }
                newPostsAray.push(postForRandom)
            })
        })
        setPosts(newPostsAray);
      
    }

    useEffect(() => {
        if(auth.currentUser) {
            dispatch(getUserInfoThunk())
        }
        getUsers()
    // }, [reversedPosts?.length])
    },[selector.posts]);

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
                {posts.length > 0 && posts.map((p: RandomPost,index: number) => {
                    return <Tweet 
                    // remove={() => removeHandler(post)}
                    key={index} 
                    post={p.post} 
                    username={p.username} 
                    email={p.email}
                    likes={p.likes}
                    shares={p.shares}
                    uid={p.uid}
                    />
                })}
            </div>
        </div>


    )
}

export default Home;
