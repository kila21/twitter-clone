

import './signIn.modal.scss'

import twitter from '../../assets/images/twitter-white.svg'

const SignIn = () => {
    return (
        <div className='signIn-container'>
            <div className='signIn-steps'>
                <p>X</p>
                <img src={twitter} alt='twitter'/>
            </div>

            <div className='signIn'>
                <h1>Sign in to Twitter</h1>
                <input type='text' placeholder='username'/>
                <input type='password' placeholder='password'/>
            </div>

            <div className='signIn-buttons'>
                <button>Sign In</button>
                <button className='button-forget'>Forgot Password?</button>
            </div>
            
            <p className='signIn-noAccount'>Don't have an accont? <a>Sign Up</a></p>
        </div>
    )
}


export default SignIn;
