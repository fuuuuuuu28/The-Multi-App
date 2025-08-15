import { Button } from '@/components/ui/button'
import { useSignIn } from '@clerk/clerk-react'
import React from 'react'

const SignInOAuth = () => {
    const { signIn, isLoaded } = useSignIn()
    const signInWithGG = () =>{
        signIn?.authenticateWithRedirect({
            strategy:"oauth_google",
            redirectUrl:"/sso-callback",
            redirectUrlComplete:"/auth-callback",
        })
    }

  return (
    <Button onClick={signInWithGG} variant={"secondary"} className='w-full text-white border-zinc-200 h-11' >
        Sign In
    </Button>
  )
}

export default SignInOAuth
