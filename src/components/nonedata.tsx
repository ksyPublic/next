import cx from 'clsx'
import { Icon } from '@/components'
type NoneDataProps = {
  children?: React.ReactNode
  text?: string
  className?: string
}
const NoneData = ({ children, text, className }: NoneDataProps) => {
  const classes = cx(
    'ui-none-data h-60 flex items-center w-full justify-center flex-col',
    `${className ? className : ''}`
  )
  return (
    <div className={classes}>
      <Icon icon="none" />
      {text && (
        <p
          className="text-center text-gray-400 text-md text-medium mt-4"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
      {children}
    </div>
  )
}

export default NoneData
