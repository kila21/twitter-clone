import { useForm } from 'react-hook-form'
import './signUp.modal.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { signUpModalClick } from '../../store/auth/auth.slice'
import { userSignUp } from '../../store/auth/auth.thunk'
import { RootState } from '../../main'

const SignUp = () => {
    type SignUpForm = {
        email: string,
        password: string,
        date: string
    }

    //forms
    const { register, handleSubmit, watch, formState: {errors, touchedFields} } = useForm<SignUpForm>()
    const onSubmit = (data: SignUpForm) => {
        dispatch(userSignUp(data.email, data.password))
    }

    const password = watch('password')
    const name = watch('email')

    //store
    const dispatch = useAppDispatch()
    const selector = useAppSelector((state: RootState) => state.auth.errors)

    return (
        <div className='signUp-container'>
            <div className='signUp'>
                <div className='signUp-steps'>
                    <p onClick={() => dispatch(signUpModalClick(false))}> X </p>
                    <span> Step 1 OF 1</span>
                </div>
                
                <div className='signUp-create'>
                    <h1>Create your account</h1>
                    <input 
                    className={errors.email ? 'invalid' : ''}
                    type='email' 
                    placeholder='Email'
                    {...register('email', {required: 'Required'})}
                    />
                    {/* {errors.name && <span className='invalid-message'>{errors.name?.message}</span>} */}
                    {!name && touchedFields.email && <span className='invalid-message'>Required</span>}
                    {selector && <span className='invalid-message'>{selector}</span>}

                    <input 
                    type='password' 
                    className={errors.password ? 'invalid' : ''}
                    placeholder='Password'
                    {...register('password', {required: 'Required', minLength: {value: 6, message: 'Min 6 Character'}})}
                    />
                    {/* {errors.password && <span className='invalid-message'>{errors.password?.message}</span>} */}
                    {!password && touchedFields.password && <span className='invalid-message'>Required</span>}
                    {password && password.length < 6 && <span className='invalid-message'>Min 6 character</span>}
                </div>
                    
                <div className='signUp-date'>
                    <h1>Date of Birth</h1>
                    <p>
                    This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.
                    </p>
                    <input 
                    className={errors.date ? 'invalid' : ''}
                    type='date'
                    {...register('date', {required: true})}
                    />
                </div>
            </div>

            <div className='confirm'>
                <button onClick={handleSubmit(onSubmit)}>Confirm</button>
            </div>
        
        </div>
    )
}

export default SignUp;