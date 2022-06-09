// import {firebase} from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAADchBOBr9crcF2MWGxk_GQrJlUToIHp4",
  authDomain: "ibalance-alimtalk.firebaseapp.com",
  projectId: "ibalance-alimtalk",
  storageBucket: "ibalance-alimtalk.appspot.com",
  messagingSenderId: "142352845326",
  appId: "1:142352845326:web:aaaa71633f132cf7c78a5f"
};
// const functions = require("firebase-functions");
// const admin = require("firebase-admin");

const auth = getAuth();
// initialize on Cloud Functions
const firebaseApp = initializeApp(firebaseConfig);
// get a refer to the storage service
const storage = getStorage(firebaseApp);


exports.getBirthDate = functions.region('asia-northeast3').https.onRequest((request, response) => {
  ({reportKey, birthDate} = request.body);
  // ({data} = request.data); 
  request.get('content-type', 'application/json');

  if(reportKey || reportKey !== 'undefined'){
    populateFirebaseUser(`${reportKey}`, `${birthDate}`).then((receiveId) => {
      // const uid = receiveId;
      // storeReport(receiveId); 
    });
    response.send(`reponse Data : {reportKey : ${reportKey} birthDate : ${birthDate}}`);
    
    
    //TODO : Use this request.data for uploading images.
    
    // console.log("request.data : " + `${data}`);
    //storeReport(uid);

  }else{
    console.log("Please check birthDate");
  }

});



const requestAlimTalk = (reportKey, birthDate, phoneNumber, reportFile) => {
  
}

const populateFirebaseUser = async(reportKey, birthDate) => {
  return getAuth().createUser({
    email: reportKey+'@teamelysium.kr',
    emailVerified: false,
    password: birthDate
  })
  .then((userRecord) => {
    return userRecord.uid;
  })
  .catch((error) => {
    const errorCode = error.code;
    switch(errorCode){
      case 'auth/invalid-email':
        // TODO : need to edit later
        console.log("auth/invalid-email.");
        case 'auth/email-already-exists':
          // TODO : need to edit later
          console.log("auth/email-already-exists.");
        }


    const errorMessage = error.message;
  });
}

const storeReport = (uid)=> {  
  // console.log("storage : " + storage);
  // const storageReference = storageBucket.ref();
  for(proper in storageReference){
    console.log("storage data : " + proper);
  }
  //storageReference.child('images/mountains.jpg');
} 

let notifyToClient = (phoneNumber, reportKey) => {

}