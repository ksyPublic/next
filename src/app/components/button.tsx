type props = {
  name?: String;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | String;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: String;
};

const Button = ({
  name,
  type = "button",
  size = "md",
  variant = "primary",
  onClick,
  className,
}: props) => {
  const getComputedButtonStyled = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

      case "secondary":
        return "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded";

      case "Google":
        return "bg-white hover:bg-gray-100 border-black border-[1px] border-solid text-gray-400 font-medium py-3 px-4 rounded";

      case "Github":
        return "bg-black hover:bg-gray-800 border-1 border-solid border-current text-white font-medium py-3 px-4 rounded";

      case "Facebook":
        return "bg-blue-800 hover:bg-blue-700 border-1 border-solid border-current text-white font-medium py-3 px-4 rounded";
    }
  };

  return (
    <div className="ui-button">
      <button
        type={type}
        className={`button ${size} ${getComputedButtonStyled()}  ${
          className ? className : ""
        }`}
        onClick={onClick}
        data-value={variant}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
