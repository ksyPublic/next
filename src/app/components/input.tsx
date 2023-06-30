type props = {
  placeholder?: string;
  className?: string;
  onChange: () => void;
};

const Input = ({ placeholder, className, onChange }: props) => {
  return (
    <div className="ui-input">
      <input
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full h-12 border-[1px] text-sm px-4 rounded-md border-solid border-gray-700 ${
          className ? className : ""
        }`}
      />
    </div>
  );
};

export default Input;
