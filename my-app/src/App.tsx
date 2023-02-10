import React, {useEffect, useState} from 'react';

import { firebaseAuth, fireStoreJob } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

import './App.css';
import Router from 'router';
import {UserInterface} from 'interfaces/UserInputInterface';

function App() {

  const [init, setInit] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<UserInterface | null>(null)

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if(user){
        const q = query(
            collection(fireStoreJob, 'users'),
            where('uid', '==', user.uid)
        )
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          setUserInfo({
            uid: data.uid,
            email: data.email,
            displayName: data.displayName,
            date_created: data.date_created,
          })
        })
        setIsLogin(true)
      }else{
        setIsLogin(false)
      }
      setInit(true)
    })
  }, [])

  return (
      <>
        {
          init ? (
              <Router isLogin={isLogin} userInfo={userInfo}/>
          ) : 'Initializing...'
        }
      </>
  );
}

export default App;
