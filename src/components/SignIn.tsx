import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './Login.module.css';
import { validationSchema } from '../utils/validators/signIn';
import { logout, useAuth, login } from '../firebase';

interface SignInInterface {
  onModeChange: () => void;
}

export const SignIn: React.FC<SignInInterface> = ({ onModeChange }) => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [stateErrors, setError] = React.useState<any>();
  // @ts-ignore
  const currentUser: {email: string, password: string} = useAuth()
  const {
    register, control, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  async function onSignIn(event: any) {
    setIsLoading(true)
    try {
      await login(event.email, event.password);
    } catch (e) {
      setError(e)
    }
    setIsLoading(false)
  };

  async function onLogout() {
    try {
      await logout()
    }
    catch (e) {
      setError(e)
    }
  }
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {!currentUser &&
      <>
          <Typography component="h1" variant="h5">
              Sign in
          </Typography>
          <Box component="form" className={styles.inputs} noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2} className={styles.inputs}>
                  <Grid item xs={12}>
                      <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          autoComplete="email"
                          autoFocus
                          {...register('email')}
                          error={!!errors.email}
                      />
                      <Typography variant="subtitle2" color="error">
                        {errors.email?.message}
                      </Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          margin="normal"
                          required
                          fullWidth
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          {...register('password')}
                          error={!!errors.password}
                      />
                      <Typography variant="subtitle2" color="error">
                        {errors.password?.message}
                      </Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <FormControlLabel
                          control={<Checkbox value="remember" color="primary"/>}
                          label="Remember me"
                      />
                      <Button
                          type="submit"
                          variant="contained"
                          sx={{ m: 1, p: 1 }}
                          onClick={handleSubmit(onSignIn)}
                          disabled={ isLoading || currentUser != null}
                      >
                          Sign In
                      </Button>
                    {stateErrors && <Typography variant="h6" color="error">Server error</Typography>}
                  </Grid>
                  <Grid item xs={12}>
                      <Typography className={styles.link} variant="subtitle1" onClick={() => onModeChange()}>
                        {'Don\'t have an account? Sign Up'}
                      </Typography>
                  </Grid>
              </Grid>
          </Box>
      </>
      }
      {currentUser &&
      <>
      <Typography variant="h5">Currently logged in as: {currentUser.email}</Typography>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, p: 2 }}
              onClick={onLogout}
              disabled={isLoading}
          >
            Logout
          </Button>
      </>
      }
    </Box>
  );
};
