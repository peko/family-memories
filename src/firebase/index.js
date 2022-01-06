import firebaseConfig from './config'
import {initializeApp} from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, serverTimestamp} from 'firebase/firestore';
// import { getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import * as auth from 'firebase/auth';

// import { getAuth } from 'firebase/auth';
// import { onUnmounted } from 'vue';

console.log(firebaseConfig)
const app = initializeApp(firebaseConfig);
// getAnalytics();

const db = getFirestore(app);
// db.settings({timestampInSnapshots: true});

function login(email, pass) {
  auth.signInWithEmailAndPassword(auth.getAuth(), email, pass)
  .then((user_cred) => {
    const user = user_cred.user;
    // console.log(user);
    let user_ref = doc(db,"users", user.uid); 
    getDoc(user_ref)
    .then((user_snp)=> {
      if(!user_snp.exists()) {
        console.log("Create user doc", user, user_snp);
        setDoc(user_ref, {id:user.uid});
      } else {
        user_snp;
      }
    })
    .then((user_snp)=> {
      console.log(user_snp);
      this.$router.push("/");
    })
  })
  .catch((err) => {
    console.error(err);
  });
}

function signin(email, pass) {
  auth.signInWithEmailAndPassword(auth.getAuth(), email, pass)
  .then((user_cred) => {
    const user = user_cred.user;
    // console.log(user);
    let user_ref = doc(db,"users", user.uid); 
    getDoc(user_ref)
    .then((user_snp)=> {
      if(!user_snp.exists()) {
        // console.log("Create user doc", user, user_snp);
        setDoc(user_ref, {id:user.uid});
      } else {
        user_snp;
      }
    })
    .then(()=> {
      // console.log(user_snp);
      this.$router.push("/");
    })
  })
  .catch((err) => {
    console.error(err);
  });
}

function addVideo(video) {
    let uid = auth.getAuth().currentUser.uid;
    video.created = video.updated = serverTimestamp();
    let doc_ref = doc(db,"users", uid, "videos", video.id);
    return setDoc(doc_ref, video);
}

function getVideos() {
    let uid = auth.getAuth().currentUser.uid;
    return getDocs(collection(db,`users/${uid}/videos`))
    .then((snapshot)=>{
        let res = [];
        snapshot.forEach((doc)=>res.push(doc.data()))
        return res;
    });
}
function logout() {
  return auth.signOut(auth.getAuth())
  .then( () => {
    console.log("Signed out");
    this.$router.push("/login");
  })
  .catch((err)=>console.error(err))
}

function userName() {
  return auth.getAuth().currentUser.displayName.split(" ")[0];
}

function userUid() {
  return auth.getAuth().currentUser.uid;
}

export const useUserProduct = () => {

}

export {
  login, signin, logout,
  db, collection, getDocs, userName, userUid, addVideo, getVideos
}
