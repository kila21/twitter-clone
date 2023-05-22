import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase"
import { getUserInfo, setError } from "./userInfo.slice";


export const getUserInfoThunk = () => {
    return async (dispatch: any) => {
        if (auth.currentUser?.uid) {
            try {
            const userCollection = doc(db, 'users', auth.currentUser!.uid)
                const data = await getDoc(userCollection)
                console.log(data.data()?.posts)
                return dispatch(getUserInfo(data.data()))
            }catch(err) {
                return dispatch(setError(err))
            }
        }else {
            return dispatch(setError('user Dosn`t exists'))
        }
    }
}