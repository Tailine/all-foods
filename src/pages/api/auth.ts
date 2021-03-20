import { NextApiRequest, NextApiResponse } from "next";
import firebase from "config/firebase";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {method, body} = req;
  // return object with data or error??
  // { data?: T; error?: {statusCode: number, message: string} }


  switch(method) {
    case 'GET':
      // authenticate user
      // await signIn(body.email, body.password);
      break;
      case 'POST':
        await signUp(body.email, body.password);
      break;
  }
}

async function signUp(email: string, password: string) {
  try {
    const credential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log("user", credential.user.toJSON());
  } catch(err) {
    console.error(err)
  }
}

async function signIn(email: string, password: string) {
const credential = firebase.auth().signInWithEmailAndPassword(email, password);
    console.log("credential", credential);
    
}