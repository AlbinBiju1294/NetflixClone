import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';

import { getFirestore, collection, getDocs, doc , arrayUnion, updateDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyAcbi3_oCi8ZvIaVJCo_nity5rZnjpObow",
    authDomain: "netflixclone-28d52.firebaseapp.com",
    projectId: "netflixclone-28d52",
    storageBucket: "netflixclone-28d52.appspot.com",
    messagingSenderId: "478121105015",
    appId: "1:478121105015:web:f14cdfd963421075805872"
  };
  
  // Initialize Firebase
 const app = initializeApp(firebaseConfig);
  
const db = getFirestore(app);

const colRef = collection(db, "profileCollection");
const docRef = doc(colRef,"user1");
const querySnapshot = await getDocs(collection(docRef, "profiles"));

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });

// const collection2 = collection(docRef,"profiles");
// const document2 = doc(collection2,"profile1");
// // const newDoc = await getDoc(document2);
// // console.log(newDoc.data().watchHistory);
// const unionRes = await updateDoc(document2,{
//     watchHistory: arrayUnion({id:101,title:"test",desc:"djbcjhfbgfbfg"})
//   });

// console.log(unionRes);



