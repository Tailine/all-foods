import firebase from 'config/firebase'

export async function getImageFromFirebase(
  userId: string,
  filename: string
): Promise<string> {
  const storageRef = firebase.storage().ref()
  return storageRef.child(`covers/${userId}/${filename}`).getDownloadURL()
}
