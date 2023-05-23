

import './signIn.modal.scss'

import twitter from '../../assets/images/twitter-white.svg'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { signInModalClick } from '../../store/auth/auth.slice'
import { userSignIn } from '../../store/auth/auth.thunk'
import { RootState } from '../../main'
import { useNavigate } from 'react-router'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'

const SignIn = () => {

    const navigate = useNavigate()

    type SignInForm = {
        email: string,
        password: string
    }


    // for database
    const creatNewUserDocument = (email: string) => {
        const newUser = auth.currentUser!.uid
        const usersCollection = doc(db,'users', newUser)
        const userData = {
            posts: [],
            email: email,
            username: '',
        }

        setDoc(usersCollection, userData)
    }

    const { register, handleSubmit, formState: {errors}} = useForm<SignInForm>()
    const onSubmit = (data: SignInForm) => {
        dispatch(userSignIn(data.email, data.password))
        .then((res:any)=>{
            if(res.payload.user) {
                creatNewUserDocument(data.email)
                navigate('/home')
            }
        })
    }

    //store 
    const dispatch = useAppDispatch()
    const selector = useAppSelector((state: RootState) => state.auth)


    return (
        <div className='signIn-container'>
            <div className='signIn-steps'>
                <p onClick={() => dispatch(signInModalClick(false))}>X</p>
                <img src={twitter} alt='twitter'/>
            </div>

            <div className='signIn'>
                <h1>Sign in to Twitter</h1>
                <input 
                type='email' 
                placeholder='email'
                {...register('email')}
                />
                {selector.errors && <span className='invalid-message'>{selector.errors}</span>}

                <input 
                type='password' 
                placeholder='password'
                {...register('password')}
                />
            </div>

            <div className='signIn-buttons'>
                <button onClick={handleSubmit(onSubmit)}>Sign In</button>
                <button className='button-forget'>Forgot Password?</button>
            </div>
            
            <p className='signIn-noAccount'>Don't have an accont? <a>Sign Up</a></p>
        </div>
    )
}


export default SignIn;
