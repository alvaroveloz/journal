import { startCreatingUserWithEmailPassword } from '../../store/auth';

import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import { useForm } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';

import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

const formData = {
  displayName: '',
  email: '',
  password: '',
};

const formValidations = {
  displayName: [(value) => value.length >= 1, 'Name is mandatory.'],
  email: [(value) => value.includes('@'), 'Email must includes a @'],
  password: [
    (value) => value.length >= 6,
    'Password must have at least 6 characters.',
  ],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();

   const { status, errorMessage } = useSelector(state => state.auth);

   const isCheckingAuthentication = useMemo(
     () => status === 'checking',
     [status]
   ); 

   console.log(isCheckingAuthentication);

  const {
    emailValid,
    passwordValid,
    displayNameValid,
    isFormValid,
    email,
    password,
    displayName,
    onInputChange,
    formState,
  } = useForm(formData, formValidations);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    if (!isFormValid) return;

    console.log('Dentro de Submit', formState)

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title='Crear cuenta'>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Nombre completo'
              type='text'
              placeholder='Nombre completo'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && isFormSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && isFormSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && isFormSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid 
              item xs={12}
              display={ !!errorMessage ? '': 'none' }
              >
              <Alert severity='error'> {errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button 
                disabled={isCheckingAuthentication}
                variant='contained' 
                fullWidth 
                type='submit'>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
