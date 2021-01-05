import firebase from 'firebase';

let _app;
if (!_app) {
	_app = firebase.initializeApp({
    apiKey: "AIzaSyCFaGgUeBrIAcFm3rCmXqa_MZH3FAh8IUU",
    authDomain: "beautifulai-od3.firebaseapp.com",
    databaseURL: "https://beautifulai-od3.firebaseio.com",
    projectId: "beautifulai-od3",
    storageBucket: "beautifulai-od3.appspot.com",
    messagingSenderId: "106996876428",
    appId: "1:106996876428:web:1f317bc7bae0959f7567a9",
    measurementId: "G-MTH0YCTKE6"
  });
}

export const db = _app.database();