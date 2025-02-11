import { signIn, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { LogInIcon } from 'lucide-react'
import Link from 'next/link'

const LoginButton = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <Link href={'/dashboard/profile'} title={session.user?.name ?? 'Profile'}>
        <div className='flex gap-2 md:items-center justify-end flex-col'>
          <div className='rounded h-7 w-7 flex relative'>
            <Image
              alt='profileImage'
              fill
              src={session.user?.image as string}
              className='rounded'
              placeholder='empty'
            />
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Button onClick={() => signIn('google', { callbackUrl: '/' })}>
      <LogInIcon />
      Sign in
    </Button>
  )
}

export default LoginButton
