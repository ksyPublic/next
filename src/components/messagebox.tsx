type props = {
  text?: string
  error?: boolean
  className?: string
  hidden?: boolean
}

const MessageBox = ({ text, error, className, hidden = false }: props) => {
  return (
    <div
      className={`ui-message-box text-gray-600 font-medium text-sm pl-4 mt-2 mb-4 ${
        className || ''
      } ${error ? 'text-red-600' : ''} ${hidden ? 'hidden' : 'block'}`}
    >
      {text}
    </div>
  )
}

export default MessageBox
