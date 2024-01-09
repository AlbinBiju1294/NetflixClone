import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDoc, doc , arrayUnion, updateDoc, getDocs} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import {firebaseConfig} from '../script/config.js'
import { apicall } from './apiexport.js';
import { setNavbarProfiles } from '../home/home.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "profileCollection");
const docRef = doc(colRef,`${localStorage.getItem('userId')}`);


const dynamicImages=[]



const imagePaths = [
    "../assets/leo1.jpg",
    "../assets/japan.jpg",
    "../assets/leo2.jpg",
    "../assets/jigar.jpg",
    "../assets/shesham.jpg"
  ];



  const  numimgpaths=[
    "../assets/oneblock.png",
    "../assets/2block.png",
    "../assets/3block.png",
    "../assets/4block.png",
    "../assets/5block.png",
    "../assets/6block.png",
    "../assets/7block.png",
    "../assets/8block.png",
    "../assets/9block.png",
    "../assets/10block.png"
  ]

  




  window.onload= () =>{
    setNavbarProfiles()
    for(let i=0;i<6;i++)
    {
        apicall(apiFetches[i],containerDivs[i]);
       
    }
     
   
  }

 

const apiFetches=[    
    "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    "https://api.themoviedb.org/3/trending/all/day?language=en-US"
]

const containerDivs=[
    "cardContainer",
    "worthWaitContainer",
    "nextWeekContainer",
    "comingThisWeekContainer",
    "showscontainer",
    "moviesContainer",
    "toptestinner"
]


   

  const addList = async (item) => {
    const collection2 = collection(docRef,"profiles");
    const document2 = doc(collection2,`${localStorage.getItem('profile')}`);
    const unionRes = await updateDoc(document2,{
      watchList: arrayUnion(item)
    });
    
  }

  const addHistory = async (item) => {
    const collection2 = collection(docRef,"profiles");
    const document2 = doc(collection2,`${localStorage.getItem('profile')}`);
    const unionRes = await updateDoc(document2,{
      watchHistory: arrayUnion(item)
    });
   
  }
  