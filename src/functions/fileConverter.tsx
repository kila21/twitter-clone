import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { auth, db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

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
    
    return await uploadBytes(storageRef, file).then((snapshot) => {
        // Get the download URL
        return getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          const userCollection = doc(db, 'users', auth.currentUser!.uid)
          await updateDoc(userCollection, {
            photoURL: downloadURL
          })
          return downloadURL
          // Now you can store the download URL in Firestore or use it as needed
        }).catch((error) => {
          alert(`Error getting download URL', ${error}`);
        });
      }).catch((error) => {
        alert(`Error uploading file', ${error}`);
      });
};