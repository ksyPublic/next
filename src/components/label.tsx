import cx from 'clsx'

type LabelProps = {
  name?: string
  children?: React.ReactNode
  className?: string
  htmlFor?: string
}

const Label = ({ name, children, className, htmlFor }: LabelProps) => {
  const classes = cx(
    'ui-label shrink-0 cursor-pointer',
    `${className ? className : ''}`
  )
  return (
    <label htmlFor={htmlFor} className={classes}>
      {name || children}
    </label>
  )
}

export default Label
