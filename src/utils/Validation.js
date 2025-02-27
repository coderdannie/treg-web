import * as Yup from 'yup';

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const initialRegisterValues = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
};

export const initValues = {
  email: '',
  password: '',
};

export const initPassValues = {
  password: '',
  confirmPassword: '',
};

export const contactAgentInitValues = {
  phoneNo: '',
  details: '',
  date: '',
};

export const contactUsInitValues = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};

export const initAddPropertyValues = {
  title: '',
  type: '',
  description: '',
  noOfRooms: '',
  location: '',
  price: '',
  amenities: '',
  others: '',
};
export const validatePword = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be more than 8 characters')
    .matches(
      passwordRegex,
      'Must Be More Than 8 Digits And Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

export const validateSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .required('Password required')
    .matches(
      passwordRegex,
      'Must Be More Than 8 Digits And Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
});

export const validateRegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be more than 8 characters')
    .matches(
      /^(?=.*[a-z])/,
      'Password must contain at least one lowercase letter'
    )
    .matches(
      /^(?=.*[A-Z])/,
      'Password must contain at least one uppercase letter'
    )
    .matches(/^(?=.*[0-9])/, 'Password must contain at least one number')
    .test(
      'contains-special-character',
      'Password must contain a special character',
      (value) => {
        return /[!@#\$%\^&]/.test(value);
      }
    ),
  confirmPassword: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});
export const validateContactSchema = Yup.object().shape({
  phoneNo: Yup.string().required('Phone number is required'),
  details: Yup.string().required('Details is required'),
  date: Yup.string().required('Details is required'),
});

export const validateContactUsSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email().required('Email is required'),
  description: Yup.string().required('Description is required'),
});

export const validateAddPropertySchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email().required('Email is required'),
  description: Yup.string().required('Description is required'),
});

export const validateAddProp = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email().required('Email is required'),
  description: Yup.string().required('Description is required'),
});
