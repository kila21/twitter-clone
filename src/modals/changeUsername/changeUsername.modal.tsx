import { doc, updateDoc } from 'firebase/firestore';
import { useAppDispatch } from '../../store/hooks';
import { changeUsernameModalClick, setUsername } from '../../store/userInfo/userInfo.slice';
import './changeUsername.modal.scss'
import { auth, db } from '../../config/firebase';
import { useRef } from 'react';

const ChangeUsernameModal = () => {
    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null)

    const updateUsername = async () => {
        if(inputRef.current) {
            const value = inputRef.current.value

            const userCollection = doc(db, 'users', auth.currentUser!.uid) 
            await updateDoc(userCollection, {
                username: value
            });

            dispatch(setUsername(value))
            dispatch(changeUsernameModalClick(false));
        }
    }

    return (
        <div className='changeUsername-container-background'>
            <div className='changeUsername-container'>
                <span onClick={() => dispatch(changeUsernameModalClick(false))} className='close-changeUsername'>X</span>
                <h2>Change Username</h2>
                <input id='usernameValue' ref={inputRef} type='text' minLength={3}/>
                <button onClick={() => updateUsername()}>Change</button>
            </div>
        </div>
    )
}

export default ChangeUsernameModal;