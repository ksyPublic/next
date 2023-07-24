export type InputSize = {
  size?:'sm' | 'md' |'lg'
}

export type InputProps = {
  placeholder?: string
  className?: string
  type?: string
  id?: string
  variant?: string,
  size?:InputSize,
  maxLength?:number
}