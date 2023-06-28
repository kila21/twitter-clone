import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { auth, db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { updatePhotoURL } from '../store/userInfo/userInfo.slice';

export const fileToString = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
};



export const uploadFileToStorage = async (file: File) => {
    // Assuming you have the file and storageRef defined
    const storage = getStorage();
    const storageRef = ref(storage, `${auth.currentUser!.uid}/profilePhoto/${file.name}`);
    
    await uploadBytes(storageRef, file).then((snapshot) => {
        // Get the download URL
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          const userCollection = doc(db, 'users', auth.currentUser!.uid)
          await updateDoc(userCollection, {
            photoURL: downloadURL
          })
          await updatePhotoURL(downloadURL)
          // Now you can store the download URL in Firestore or use it as needed
        }).catch((error) => {
          console.error('Error getting download URL', error);
        });
      }).catch((error) => {
        console.error('Error uploading file', error);
      });
};