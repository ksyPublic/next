type props = {
  name?: String;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({
  name,
  type = "button",
  size = "md",
  variant = "primary",
  onClick,
}: props) => {
  const getComputedButtonStyled = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

      case "secondary":
        return "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded";
    }
  };

  return (
    <div className="ui">
      <button
        type={type}
        className={`button ${size} ${getComputedButtonStyled()}`}
        onClick={onClick}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
