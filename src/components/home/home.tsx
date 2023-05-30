
import { useEffect } from 'react';
import './home.scss'
import NewTweet from './newTweet/newTweet';
import Tweet from './tweet/tweet';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deletePostInCollection, getUserInfoThunk } from '../../store/userInfo/userInfo.thunk';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector((state) => state.userInfo)
    const reversedPosts = selector?.posts?.slice().reverse()

    const navigate = useNavigate()


    const removeHandler = (post: any) => { 
        const newArray = reversedPosts.slice().reverse();
        dispatch(deletePostInCollection(post, newArray.indexOf(post)))
    }

    useEffect(() => {
        if(auth.currentUser) {
            dispatch(getUserInfoThunk())
        }
    }, [reversedPosts?.length])

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
                {reversedPosts.map((post,index) => {
                    return <Tweet 
                    remove={() => removeHandler(post)}
                    key={index} 
                    post={post} 
                    username={selector.username} 
                    email={selector.email}
                    />
                })}
            </div>
        </div>


    )
}

export default Home;
