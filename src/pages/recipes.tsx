import firebase from '../../config/firebase'
import { useEffect } from 'react'
import { GetServerSidePropsContext } from 'next'
import { useAuth } from 'hooks/useAuth'
import { Layout } from 'components/Layout'
import verifyUserAuthStatus from 'helpers/verifyUserAuthStatus'

export default function Recipes() {
  const { signOut } = useAuth()

  return (
    <Layout>
      <h1>Recipes</h1>
      <button onClick={signOut}>Sair</button>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem quo
        dolorum nostrum nihil, ad omnis animi quam doloremque ipsa sed tempore
        minus eveniet reprehenderit reiciendis. Odit molestias ut voluptate
        voluptates.Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Voluptatem quo dolorum nostrum nihil, ad omnis animi quam doloremque
        ipsa sed tempore minus eveniet reprehenderit reiciendis. Odit molestias
        ut voluptate voluptates.
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem quo
        dolorum nostrum nihil, ad omnis animi quam doloremque ipsa sed tempore
        minus eveniet reprehenderit reiciendis. Odit molestias ut voluptate
        voluptates.Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Voluptatem quo dolorum nostrum nihil, ad omnis animi quam doloremque
        ipsa sed tempore minus eveniet reprehenderit reiciendis. Odit molestias
        ut voluptate voluptates.
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem quo
        dolorum nostrum nihil, ad omnis animi quam doloremque ipsa sed tempore
        minus eveniet reprehenderit reiciendis. Odit molestias ut voluptate
        voluptates.Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Voluptatem quo dolorum nostrum nihil, ad omnis animi quam doloremque
        ipsa sed tempore minus eveniet reprehenderit reiciendis. Odit molestias
        ut voluptate voluptates.
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem quo
        dolorum nostrum nihil, ad omnis animi quam doloremque ipsa sed tempore
        minus eveniet reprehenderit reiciendis. Odit molestias ut voluptate
        voluptates.Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Voluptatem quo dolorum nostrum nihil, ad omnis animi quam doloremque
        ipsa sed tempore minus eveniet reprehenderit reiciendis. Odit molestias
        ut voluptate voluptates.
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem quo
        dolorum nostrum nihil, ad omnis animi quam doloremque ipsa sed tempore
        minus eveniet reprehenderit reiciendis. Odit molestias ut voluptate
        voluptates.Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Voluptatem quo dolorum nostrum nihil, ad omnis animi quam doloremque
        ipsa sed tempore minus eveniet reprehenderit reiciendis. Odit molestias
        ut voluptate voluptates.
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem quo
        dolorum nostrum nihil, ad omnis animi quam doloremque ipsa sed tempore
        minus eveniet reprehenderit reiciendis. Odit molestias ut voluptate
        voluptates.Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Voluptatem quo dolorum nostrum nihil, ad omnis animi quam doloremque
        ipsa sed tempore minus eveniet reprehenderit reiciendis. Odit molestias
        ut voluptate voluptates.
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem quo
        dolorum nostrum nihil, ad omnis animi quam doloremque ipsa sed tempore
        minus eveniet reprehenderit reiciendis. Odit molestias ut voluptate
        voluptates.Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Voluptatem quo dolorum nostrum nihil, ad omnis animi quam doloremque
        ipsa sed tempore minus eveniet reprehenderit reiciendis. Odit molestias
        ut voluptate voluptates.
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem quo
        dolorum nostrum nihil, ad omnis animi quam doloremque ipsa sed tempore
        minus eveniet reprehenderit reiciendis. Odit molestias ut voluptate
        voluptates.Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Voluptatem quo dolorum nostrum nihil, ad omnis animi quam doloremque
        ipsa sed tempore minus eveniet reprehenderit reiciendis. Odit molestias
        ut voluptate voluptates.
      </p>
    </Layout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return verifyUserAuthStatus(context)
}
