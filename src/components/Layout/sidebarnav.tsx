import { SideBarNavProps } from './types'

const SideBarNav = ({ menu }: SideBarNavProps) => {
  return (
    <nav>
      {menu &&
        menu.map((item: any, idx: number) => {
          return (
            <ul key={idx}>
              <li>{item}</li>
            </ul>
          )
        })}
    </nav>
  )
}

export { SideBarNav }
