import { v4 as uuidv4 } from "uuid";
import React, { useState, ChangeEvent, Fragment } from "react";

type props = {
  name?: string;
  position?: string;
  id?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
};

const Checkbox = ({
  name,
  position,
  id,
  defaultChecked = false,
  onChange,
}: props) => {
  const [checked, setChecked] = useState(defaultChecked);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  const uniqueId = id ? id : uuidv4();
  const customCheckboxStyled = `before:content-[''] before:mr-2 before:w-4 before:h-4 before:inline-block before:bg-gray-700 before:rounded-sm flex items-center
  after:content-[''] after:mr-2 after:absolute after:left-0 after:top-0 after:z-10 after:w-4 after:h-4`;
  return (
    <Fragment>
      <label
        className={`ui-checkbox text-gray-500 relative text-sm ${
          checked ? "checked" : ""
        }`}
        htmlFor={uniqueId}
      >
        {position !== "right" && (
          <span className={customCheckboxStyled}>{name}</span>
        )}
        <input
          type="checkbox"
          id={uniqueId}
          className="appearance-none hidden"
          onChange={handleChange}
          checked={checked}
          aria-checked={checked}
        />
        {position === "right" && (
          <span className={customCheckboxStyled}>{name}</span>
        )}

        <svg
          className="absolute w-4 h-4 left-0 top-[2px] hidden"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </label>
    </Fragment>
  );
};

export default Checkbox;
