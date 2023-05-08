
import './signUp.modal.scss'

const SignUp = () => {
    return (
        <div className='signUp-container'>
            <div className='signUp'>
                <div className='signUp-steps'>
                    <p> X </p>
                    <span> Step 1 OF 1</span>
                </div>
                
                <div className='signUp-create'>
                    <h1>Create your account</h1>
                    <input type='text' placeholder='Name'/>
                    <input type='password' placeholder='Password'/>
                </div>
                    
                <div className='signUp-date'>
                    <h1>Date of Birth</h1>
                    <p>
                    This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.
                    </p>
                    <input type='date'/>
                </div>
            </div>

            <div className='confirm'>
                <button>Confirm</button>
            </div>
        
        </div>
    )
}

export default SignUp;