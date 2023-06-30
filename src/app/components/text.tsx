type props = {
  name: string;
};

const Text = ({ name }: props) => {
  return <span>{name}</span>;
};

export default Text;
