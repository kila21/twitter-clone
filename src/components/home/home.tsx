
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NewTweet from './newTweet/newTweet';
import Tweet from './tweet/tweet';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { auth, db } from '../../config/firebase';
import { getUserInfoThunk } from '../../store/userInfo/userInfo.thunk';

import './home.scss'
import { RandomPost } from '../../types/RandomPost.type';

import { collection, getDocs } from 'firebase/firestore';


const Home = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector((state) => state.userInfo)
    const [randomPosts, setRandomPosts] = useState<RandomPost[]>([]);
    
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
        setRandomPosts(newPostsAray);
      
    }

    useEffect(() => {
        if(auth.currentUser) {
            dispatch(getUserInfoThunk())
        }

        const newPostsFordisplay = randomPosts
        const data: any = {
            ...selector.posts[selector.posts.length-1],
            username: selector.username,
            email: selector.email,
            uid: auth.currentUser!.uid
        }
        console.log(randomPosts[randomPosts.length-1].post)
        console.log(data.post)
        if(randomPosts[randomPosts.length-1].post !== data.post) {
            newPostsFordisplay.push(data)
            setRandomPosts(newPostsFordisplay)
        }
    // }, [reversedPosts?.length])
    },[selector.posts.length]);

    useEffect(()=>{ 
        getUsers()
    },[])

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
                {randomPosts.length > 0 && randomPosts.map((p: RandomPost,index: number) => {
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
