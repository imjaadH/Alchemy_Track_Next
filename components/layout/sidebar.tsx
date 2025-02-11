'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'
import { Car, CircleUser, HomeIcon, Map, Users } from 'lucide-react'
import { SignOutButton } from '../signout-button'
import LoginButton from '../login-button'
import { ThemeButton } from './theme-button'
interface SidebarProps {
  children: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname()

  const routes = useMemo(
    () => [
      {
        icon: HomeIcon,
        label: 'Home',
        active: pathname == '/dashboard',
        href: '/dashboard/',
      },
      {
        icon: Map,
        label: 'Trips',
        active: pathname === '/dashboard/trips',
        href: '/dashboard/trips',
      },
      {
        icon: Car,
        label: 'Vehicles',
        active: pathname === '/dashboard/vehicles',
        href: '/dashboard/vehicles',
      },
      {
        icon: Users,
        label: 'Drivers',
        active: pathname === '/dashboard/drivers',
        href: '/dashboard/drivers',
      },
      {
        icon: CircleUser,
        label: 'Profile',
        active: pathname === '/dashboard/profile',
        href: '/dashboard/profile',
      },
    ],
    [pathname],
  )

  return (
    <div className='flex h-full'>
      {/* SIDEBAR ITEMS */}
      <div
        className={cn(
          `flex h-screen w-12 md:w-16 flex-col justify-between border-e `,
          (pathname === '/user/signin' || pathname === '/') && 'hidden',
        )}
      >
        <div>
          <div className=' border-gray-100 dark:border-gray-600'>
            <div className='px-2'>
              <ul className='space-y-1  border-gray-100 pt-4 '>
                {routes.map((item, index) => {
                  return (
                    <li key={index}>
                      <a
                        href={item.href}
                        className={cn(
                          `group relative flex justify-center rounded md:px-2 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-700`,
                          item.active && 'bg-blue-50',
                        )}
                      >
                        {
                          <item.icon
                            size={18}
                            className={cn(
                              `text-gray-500`,
                              item.active &&
                                'text-blue-700 dark:text-slate-800',
                            )}
                          />
                        }

                        <span className='invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                          {item.label}
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center gap-4 border-gray-100  p-2 inset-x-0 bottom-0 border-t dark:border-gray-700'>
          <ThemeButton />
          <LoginButton />
          <SignOutButton />
        </div>
      </div>
      {/* MAIN COMPONENT */}
      <main className='h-full flex-1 overflow-y-auto'>{children}</main>
    </div>
  )
}

export default Sidebar
