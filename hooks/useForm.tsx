import { useState } from "react";

interface Fields {
  [key: string]: any;
}

interface FormState {
  [key: string]: string;
}

interface ResultState {
  data: FormState;
  errorField: string[];
}

interface UseFormReturn {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  result: ResultState;
  validate: () => boolean;
}

function useForm(fields: Fields): UseFormReturn {
  const [formState, setFormState] = useState<FormState>(fields);
  const [errorFields, setErrorFields] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, required } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (required) {
      if (value.trim() === "") {
        setErrorFields((prevState) => {
          if (!prevState.includes(id)) {
            return [...prevState, id];
          }
          return prevState;
        });
      } else {
        setErrorFields((prevState) =>
          prevState.filter((field) => field !== id)
        );
      }
    }
  };

  const validate = () => {
    const newErrorFields: string[] = [];

    Object.keys(fields).forEach((field) => {
      const inputElement = document.getElementById(
        field
      ) as HTMLInputElement | null;
      if (
        inputElement?.required &&
        (!formState[field] || formState[field].trim() === "")
      ) {
        newErrorFields.push(field);
      }
    });

    setErrorFields(newErrorFields);
    return newErrorFields.length === 0;
  };

  return {
    handleChange,
    result: {
      data: formState,
      errorField: errorFields,
    },
    validate,
  };
}

export default useForm;
