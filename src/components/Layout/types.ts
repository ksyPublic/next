
export type MenuItem = {
  [key: string]: {
    name: string;
    url: string;
    key:string;
  }[];
}

export type Menu = MenuItem[];

export type SideBarNavProps = {
  menu?:Menu
}

export type SideBarProps = {
  data?: Menu | undefined
  defaultOpen?: boolean
  user?: {
    photoURL?: string
  } | null
}
