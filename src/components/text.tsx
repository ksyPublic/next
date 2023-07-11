type props = {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  className?: string
  name?: React.ReactNode
}

const Text = ({ as: Component = 'span', name, ...props }: props) => (
  <Component {...props} dangerouslySetInnerHTML={{ __html: name as string }} />
)

export default Text
