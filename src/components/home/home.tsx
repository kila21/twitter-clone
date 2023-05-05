import './home.scss'

import twitter from '../../assets/images/twitter-white.svg';

const Home = () => {
    return (
        <div className='home-container'>
            <div className='home_twitter-logo'>
                <img src={twitter} alt='twitter'/>
                <h1>Twitter</h1>
            </div>

            <div className='home_content'>
                <button>Sign In</button>
                <button>Create Account</button>
            </div>
        </div>
    )
}


export default Home;