// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\utils\validators.js
export const validateContactForm = (values) => {
  const errors = {};
  if (!values.name || values.name.trim().length < 2 || values.name.trim().length > 100) {
    errors.name = 'Full name must be between 2 and 100 characters.';
  }
  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.phone || !/^[+\d][\d\s-]{9,14}$/.test(values.phone)) {
    errors.phone = 'Enter a valid phone number with 10 to 15 digits.';
  }
  if (!values.subject || values.subject.trim().length < 5 || values.subject.trim().length > 150) {
    errors.subject = 'Subject must be between 5 and 150 characters.';
  }
  if (!values.message || values.message.trim().length < 20 || values.message.trim().length > 1000) {
    errors.message = 'Message must be between 20 and 1000 characters.';
  }
  return errors;
};
