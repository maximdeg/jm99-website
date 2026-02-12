import React, { useState } from "react";

const useForm = (formFields: {}) => {
  const [formValuesState, setFormValuesState] = useState(formFields);

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input_name = e.target.name;
    const input_value = e.target.value;

    setFormValuesState((prevFormValuesState: {}) => {
      return { ...prevFormValuesState, [input_name]: input_value };
    });
  };

  return {
    formValuesState,
    handleChangeInputValue,
  };
};

export default useForm;
