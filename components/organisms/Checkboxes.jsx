import { useState } from "react";
import { useController  } from "react-hook-form"
import { v4 } from "uuid";

const Checkboxes = ({ options, control, name }) => {
  const { field } = useController({
    control,
    name
  });
  const [value, setValue] = useState(field.value || []);

  return (
    <>
      {options.map((option, index) => (
        <label htmlFor={option} className="mr-2" key={v4()}>
					<input
						onChange={(e) => {
							const valueCopy = [...value];

							// update checkbox value
							valueCopy[index] = e.target.checked ? e.target.value : null;

							// send data to react hook form
							field.onChange(valueCopy);

							// update local state
							setValue(valueCopy);
						}}
						key={option}
						checked={value.includes(option)}
						type="checkbox"
						value={option}
        	/>
					{' '}
					{option}
				</label>
      ))}
    </>
  );
};

export default Checkboxes