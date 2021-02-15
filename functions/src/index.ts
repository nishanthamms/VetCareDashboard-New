
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


admin.initializeApp(functions.config().firebase);

// const {SENDER_EMAIL,SENDER_PASSWORD,CLIENT_ID, CLIENT_SECRET,refreshToken,accessToken}= process.env;

exports.register = functions.https.onRequest((request, response) => {
  const useremail = request.query.email;
  const email = String(useremail);

  const name = request.query.fullName;
  const fullName = String(name);

  const desig = request.query.designation;
  const designation = String(desig);

  const gs = request.query.gsdevision;
  const gsdevision = String(gs);

  const password = request.query.password;
  const pass = String(password);

  const imgUrl = request.query.userImg;
  const userImg = String(imgUrl);
 // console.log('Successfully updated user', userRecord.toJSON());

  admin.auth().createUser({
    email,
    password: pass,
    emailVerified: true,
 }).then(function(userRecord) {
   // See the UserRecord reference doc for the contents of userRecord.
 //  console.log('Successfully added user');
 //  response.send({'uid': userRecord.uid});
   const userid = userRecord.uid;
   const uid = String(userid);
   admin.firestore().collection('userProfile').doc(userRecord.uid).set(
     {designation: desig, email: useremail, fullName: name, uid: userid, userImg: imgUrl, gsdevision: gs })
   .then(() => response.json([
       // message:'great!',
       designation,
       email,
       fullName,
       uid,
       userImg,
       gsdevision
   ]))
   .catch(function(error) {
  // console.log(uid);
   response.send('Error: ' + error);
   console.log('Error updating:', error);
   return 1;
 });
   console.log('Successfully added user', userRecord.toJSON());

 })
 .catch(function(error) {
   response.send('Error: ' + error);
   console.log('Error creating new user:', error);
   return 1;
 });

 });




exports.delete = functions.https.onRequest((request, response) => {

    const uid = request.query.userid;
    const secretText = String(uid);

   // console.log(uid);
    admin.auth().deleteUser(secretText)
   .then(function(){
     console.log('Successfully deleted user');
     admin.firestore().collection('userProfile').doc(secretText).delete()
        .then(() => response.json([
            // message:'great!',
            uid
        ]))
        /*admin.database().ref('/user').push({uid:secretText})
        .then(()=>response.json([
            // message:'great!',
            uid
        ]))*/
        .catch(function(error) {
        console.log(uid);
        response.send('Error: ' + error);
        console.log('Error deleting user:', error);
        return 1;
      });
   })
   .catch(function(error) {
     console.log(uid);
     response.send('Error: ' + error);
     console.log('Error deleting user:', error);
     return 1;
   });

 });

exports.update = functions.https.onRequest((request, response) => {
  const uid = request.query.userid;
  const secretText = String(uid);

  const useremail = request.query.useremail;
  const email = String(useremail);

  const fullName = request.query.fullName;
  const name = String(fullName);

  const designation = request.query.designation;
  const desig = String(designation);

  const gs = request.query.gsdevision;
  const gsdevision = String(gs);

  const pass = request.query.password;
  const password = String(pass);

  const imgUrl = request.query.userImg;
  const userImg = String(imgUrl);
  admin.auth().updateUser(secretText, {
   email,
   password,
   emailVerified: true,
})
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.

    admin.firestore().collection('userProfile').doc(secretText).set(
      {designation: desig, email: email, fullName: name, uid: secretText, userImg: imgUrl,gsdevision: gs})
    .then(() => response.json([
        // message:'great!',
        designation,
        email,
        fullName,
        uid,
        userImg,
        gsdevision
    ]))
    /*admin.database().ref('/user').push({uid:secretText})
    .then(()=>response.json([
        // message:'great!',
        uid
    ]))*/
    .catch(function(error) {
    console.log(uid);
    response.send('Error: ' + error);
    console.log('Error updating:', error);
    return 1;
  });

    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch(function(error) {
    console.log('Error updating user:', error);
    console.log(email);
    response.send('Error: '+ error);
  });
});

