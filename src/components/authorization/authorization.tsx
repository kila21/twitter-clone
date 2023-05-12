import './authorization.scss'
import twitter from '../../assets/images/twitter-white.svg';

import SignUp from '../../modals/sing-up/signUp.modal';
import SignIn from '../../modals/sign-in/signIn.modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signInModalClick, signUpModalClick } from '../../store/auth/auth.slice';
import { RootState } from '../../main';

const Authorization = () => {
    const dispatch = useAppDispatch()
    const selector = useAppSelector((state: RootState) => state.auth)

    return (
        <div className={selector.signInClicked || selector.signUpClicked ? 'authorization-container modal' : 'authorization-container'}>
            <div className='authorization_twitter-logo'>
                <img src={twitter} alt='twitter'/>
                <h1>Twitter</h1>
            </div>

            <div className='authorization_content'>
                <button onClick={() => dispatch(signInModalClick(true))}>Sign In</button>
                <button onClick={() => dispatch(signUpModalClick(true))}>Create Account</button>
            </div>

            {selector.signUpClicked && <SignUp />}
            {selector.signInClicked && <SignIn />}
        </div>
    )
}


export default Authorization ;