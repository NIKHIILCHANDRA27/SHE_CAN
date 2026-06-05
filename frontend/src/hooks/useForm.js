// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\hooks\useForm.js
import { useState } from 'react';

const useForm = ({ initialValues, validate, onSubmit }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const updatedErrors = validate({ ...values, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: updatedErrors[name] }));
    }
  };

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some(Boolean);
    if (hasErrors) return;
    setIsSubmitting(true);
    try {
      await onSubmit(values);
      setValues(initialValues);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { values, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setValues };
};

export default useForm;
