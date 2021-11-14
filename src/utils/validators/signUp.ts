import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid')
    .max(40, 'Email must not exceed 40 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  fullName: Yup.string()
    .required('Full name is required')
    .min(6, 'Full name must be at least 6 characters')
    .max(20, 'Full name must not exceed 20 characters'),
  userName: Yup.string()
    .required('User name is required')
    .min(6, 'User name must be at least 6 characters')
    .max(20, 'User name must not exceed 20 characters'),
  acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
});
