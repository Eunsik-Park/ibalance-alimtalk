
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({credential: admin.credential.applicationDefault()});

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

exports.populateFirebaseUser = functions.region('asia-northeast3').https.onRequest((request, response) => {
  ({reportKey, birthDate} = request.body);
  request.get('content-type')
  //functions.logger.info("Hello logs!", {structuredData: true});
  response.send(populateFirebaseUser(`${reportKey}`, `${birthDate}`));
});


let populateFirebaseUser = (reportKey, birthDate) => {  
  admin.auth().createUser({
    email: reportKey+'@teamelysium.kr',
    password: birthDate
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user and reportKey :', userRecord.id);
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
  });
}


let requestAllimTalk = (reportKey, birthDate, phoneNumber, reportFile) => {

  
   
    return;
}



//
let storeReport = (reportKey, birthDate) => {

    return;
}


//
let notifyToClient = (phoneNumber, reportKey) => {

    return;
}