
export type FormRowProps = {
  children?:React.ReactNode;
  className?:string;
}

export type FormColumnProps = {
  children?:React.ReactNode;
  className?:string;
}

export type FormProps = {
  children?:React.ReactNode;
  className?:string;
  onSubmit?:(event: React.FormEvent<HTMLFormElement>) => void
  id?:string;
}