import { SideBarNavProps } from './types'
import { IconButton } from '@/components'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'

const SideBarNav = ({ menu }: SideBarNavProps) => {
  return (
    <nav className="mt-10 overflow-auto h-menu">
      {menu && menu.length > 0 ? (
        menu?.map((item, idx) => {
          return Object.entries(item).map(([key, value], i) => {
            return (
              <ul key={i} className="mb-4 bg-gray-900 last:mb-0">
                <IconButton
                  className="w-full text-white text-sm bg-gray-900 hover:bg-gray-800 h-16 text-start font-medium py-4 px-6 rounded transition ease-in-out"
                  icon="arrow"
                >
                  {key.toUpperCase()}
                </IconButton>
                {Object.entries(value).map(([x, j], g) => {
                  return (
                    <li key={j.key}>
                      <Link
                        href={j.url}
                        className="text-white border-gray-700 border-t-[0.1rem] w-full block text-sm bg-gray-900 px-6 py-4 hover:bg-gray-800"
                      >
                        {x}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )
          })
        })
      ) : (
        <Skeleton count={14} className="h-[4.0rem]"/>
      )}
    </nav>
  )
}

export { SideBarNav }
