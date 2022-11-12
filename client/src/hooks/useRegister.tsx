import axios, { AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import RegistrationPayload from '../api/payloads/RegistrationPayload';
import config from '../config';
import LocalStorageManager from '../utils/LocalStorageManager';

const useRegister = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const registerUser = {
    firstname,
    lastname,
    email,
    password,
    passwordConfirm,
  };

  const RegistrationSchema = Yup.object().shape({
    firstname: Yup.string().required('First name is required!'),
    lastname: Yup.string().required('Last name is required!'),
    email: Yup.string().required('Email is required!'),
    password: Yup.string().required('Password is required!'),
    passwordConfirm: Yup.string()
      .required('Confirm password is required!')
      .oneOf([Yup.ref('password'), null], 'Passwords must match!'),
  });

  const verifyForm = async (): Promise<boolean> => {
    try {
      await RegistrationSchema.validate(registerUser, { abortEarly: false });
      setErrors({});

      return Promise.resolve(true);
    } catch (error: any) {
      const newErrors: { [key: string]: string } = {};

      for (const err of error.inner) {
        newErrors[err.path] = err.message;
      }

      setErrors(newErrors);
      return Promise.resolve(false);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    const payload: RegistrationPayload = {
      firstname,
      lastname,
      email,
      password,
      passwordConfirm,
    };

    const isFormVerified = await verifyForm();

    if (isFormVerified) {
      await axios
        .post(`${config.registrationUrl}`, payload)
        .then((response: AxiosResponse) => {
          const { user, token } = response.data;

          LocalStorageManager.setUser(user);
          LocalStorageManager.setToken(token);
          navigate('/');
        })
        .catch((error: any) => {
          if (error.response.data.errors[0] === 'email_already_exists') {
            const key = enqueueSnackbar('Email already exists!', {
              variant: 'error',
              onClick: () => {
                closeSnackbar(key);
              },
            });
          }
        });
    }
  };

  return {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    isPassword,
    setIsPassword,
    isPasswordConfirm,
    setIsPasswordConfirm,
    handleSubmit,
    errors,
  };
};

export default useRegister;
