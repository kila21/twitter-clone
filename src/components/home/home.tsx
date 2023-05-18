
import './home.scss'
import NewTweet from './newTweet/newTweet';
import Tweet from './tweet/tweet';


const Home = () => {
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
                <Tweet />
                <Tweet />
                <Tweet />
            </div>
        </div>


    )
}

export default Home;
