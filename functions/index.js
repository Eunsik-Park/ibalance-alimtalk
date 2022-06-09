const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.getBirthDate = functions.region('asia-northeast3').https.onRequest((request, response) => {
  ({reportKey, birthDate} = request.body);
  request.get('content-type', 'application/json');

  if(reportKey || reportKey !== 'undefined'){
    populateFirebaseUser(`${reportKey}`, `${birthDate}`).then((uid) => {
      console.log(uid);
      // storeReport(uid); 
    });
    response.send(`reponse Data : {reportKey : ${reportKey} birthDate : ${birthDate}}`);

    //TODO : Use this request.data for uploading images.
    // console.log("request.data : " + `${data}`);
    //storeReport(uid);

  }else{
    console.log("Please check birthDate");
  }});


let populateFirebaseUser = async (reportKey, birthDate) => {  
  return admin.auth().createUser({
    email: reportKey+'@teamelysium.kr',
    emailVerified: false,
    password: birthDate
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    // console.log('Successfully created new user and reportKey :', userRecord.id);
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