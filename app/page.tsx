"use client"

import Image from 'next/image'
import Create from '@/components/Create';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { doc, setDoc, updateDoc,collection,getDocs,onSnapshot,query } from "firebase/firestore"; 
import { db } from "./firebase";
import React, { useEffect, useState } from "react";
export default function Home() {
  const frankDocRef = doc(db, "users", "random");
  const x="color"
  const y={"sadw":x}
    useEffect(()=>{

      const call=async ()=>{
        const q = query(collection(db, "users"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
  
          querySnapshot.forEach((doc) => {
  
              console.log({id:doc.id,...doc.data()});
          });
        });

      };
        
        
        // To update age and favorite color
      call();

    },[])

    const signout=()=>{
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    }
    const update=async()=>{
      console.log(auth.currentUser)
    //   await setDoc(frankDocRef, {
    //     name: "Frank",
    //     favorites: { food: "Pizza", color: "Blue", subject: "recess" },
    //     age: 12
    // });
      await updateDoc(frankDocRef, y);
    }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <div>hello
      <button className=' bg-black' onClick={update}> hello</button>
      <button className=' bg-red-600' onClick={signout}> hello</button>
     </div>
     <Create/>
    </main>
  )
}
