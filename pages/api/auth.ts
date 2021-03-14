import firebase from "firebase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {method, body} = req;
  // return object with data or error??
  // { data?: T; error?: {statusCode: number, message: string} }
console.log("REQUEST", req)
  switch(method) {
    case 'GET':
      // authenticate user
      signIn(body.email, body.password);
      break;
      case 'POST':
        // create user
        signUp(body.email, body.password)
      break;
  }
}

async function signUp(email: string, password: string) {
  try {
    const credential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log("credential", credential, "user", credential.user);

  } catch(err) {
    console.error(err)
  }
}

async function signIn(email: string, password: string) {
const credential = firebase.auth().signInWithEmailAndPassword(email, password);
    console.log("credential", credential);
    
}