import * as functions from "firebase-functions";
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from "firebase-admin/storage";
import * as cryptoFunctions from "./cryptoscript.js"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAADchBOBr9crcF2MWGxk_GQrJlUToIHp4",
  authDomain: "ibalance-alimtalk.firebaseapp.com",
  projectId: "ibalance-alimtalk",
  storageBucket: "ibalance-alimtalk.appspot.com",
  messagingSenderId: "142352845326",
  appId: "1:142352845326:web:aaaa71633f132cf7c78a5f"
};

const app = initializeApp(firebaseConfig);
const rootStorage = getStorage(app);

export const requestAlimTalk = functions.region('asia-northeast3').https.onRequest((request, response) => {
  const {reportKey, birthDate} = request.body;
  request.get('content-type', 'application/json');

  if(`${reportKey}` || `${reportKey}` !== 'undefined'){
    populateFirebaseUser(`${reportKey}`, `${birthDate}`)
    .then((userRecord) => {
      response.send(`reponse Data : {reportKey : ${reportKey} birthDate : ${birthDate}}`);
      // TODO : Get report image for post data  `${reportImages}`
      //storeReport( `${reportImages}`, `${reportKey}`); 
    });
    

    const url = notifyToClient("01047094788", `${reportKey}`, `${birthDate}`);
    // console.log("phoneNumber, url : " + url.phone + ", " + url.url);

  }else{
    console.log("Please your reportKey");
  }
});


let populateFirebaseUser = async (reportKey, birthDate) => {
  return getAuth().createUser({
    email: reportKey+'@teamelysium.kr',
    emailVerified: false,
    password: birthDate
  })
  .then((userRecord) => {
    return userRecord;
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log("###errorCode### : " + errorCode);
    // switch(errorCode){
    //   case 'auth/invalid-email':
    //     // TODO : need to edit later
    //     console.log("auth/invalid-email.");
    //   case 'auth/email-already-exists':
    //       // TODO : need to edit later
    //       console.log("auth/email-already-exists.");
    // }
  });
}

 const storeReport = async (reportFile, reportKey)=> {  
  const imagesRef = rootStorage.bucket('gs://ibalance-image-bucket');
  // TODO : reportKey 유저만 접근 가능하게끔 access 권한 설정
  await imagesRef.upload(reportFile, {
    destination: reportKey,
  });

  console.log(`${reportFile} uploaded to images folder ${reportKey}` );

} 

// reuturn URL
// TODO : using phonenumber
const notifyToClient = (phoneNumber, reportKey, birthDate) => {
  cryptoFunctions.encryptText(reportKey, birthDate)
  .then((encryptedData) => {
    let phone = '82' + phoneNumber.substr(1,10);
    let url = `encryptedData=${encryptedData}`; 
    // return url;
    // console.log("Encrypt!!! phoneNumber, encryptedData : " + phone + ", " + url);
  })
  .catch((error)=>{
    const errorCode = error.code;
    console.log("###errorCode### : " + errorCode);
  });

}

const requestBirthDatePage = (reportKey, birthDate) => {
  // const url = getURL();
  const decryptedData = cryptoFunctions.decryptText(reportKey, birthDate);
  if(birthDate === decryptedData){
    // then.. move getReportPage
    // console.log("Decrypt!!! birthDate, decryptedData : " + birthDate + ", " + decryptedData);
  }else{
    // then.. move fail page
    console.log("Error is occured. Check birthData.");
  }
}

const getReportPage = (birthDate) => {
 // 저장해둔 파일 가져오기
}