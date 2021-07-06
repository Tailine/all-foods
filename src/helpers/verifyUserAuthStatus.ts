import firebaseAdmin from 'config/firebaseAdmin'
import { GetServerSidePropsContext } from 'next'
import nookies from 'nookies'

export default async function verifyUserAuthStatus(
  context: GetServerSidePropsContext
) {
  try {
    const cookies = nookies.get(context)
    console.log({ context })
    const resp = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    console.log('resp', resp)
    return {
      props: {
        userId: resp.uid
      }
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
}
