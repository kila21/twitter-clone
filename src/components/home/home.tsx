import './home.scss'

import twitter from '../../assets/images/twitter-white.svg';
import { useState } from 'react';
import SignUp from '../../modals/sing-up/signUp.modal';

const Home = () => {
    const [signUpClicked, setSignUpClicked] = useState(false)
    const [signInClicked, setSignInClicked] = useState(false)

    return (
        <div className={signInClicked || signUpClicked ? 'home-container modal' : 'home-container'}>
            <div className='home_twitter-logo'>
                <img src={twitter} alt='twitter'/>
                <h1>Twitter</h1>
            </div>

            <div className='home_content'>
                <button onClick={() => setSignInClicked(true)}>Sign In</button>
                <button onClick={() => setSignUpClicked(true)}>Create Account</button>
            </div>

            {signUpClicked && <SignUp />}
            {/* {signUpClicked && <SignIn />} */}
        </div>
    )
}


export default Home;