import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  SelectChangeEvent,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChangeEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './Login.module.css';
import { signUp } from '../firebase';
import { validationSchema } from '../utils/validators/signUp';

interface SignUpInterface {
  onModeChange: () => void;
  createUser: (...args: any) => void;
}

export const SignUp:React.FC<SignUpInterface> = ({ onModeChange, createUser }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [stateErrors, setError] = React.useState<any>();

  async function onSubmit(event: any) {
    debugger;
    setIsLoading(true)
    try {
      await signUp(event.email, event.password);
      createUser(event.email, event.fullName, false, event.role, event.userName)
    } catch (e) {
      setError(e)
    }
    setIsLoading(false)
  };


  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    register, control, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid container spacing={2} className={styles.inputs}>
          <Grid item xs={12}>
            <TextField
              autoComplete="email"
              required
              fullWidth
              id="email"
              label="Email"
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
              autoComplete="password"
              required
              fullWidth
              id="password"
              label="Password"
              {...register('password')}
              error={!!errors.password}
            />
            <Typography variant="subtitle2" color="error">
              {errors.password?.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              required
              fullWidth
              id="fullname"
              label="Full Name"
              {...register('fullName')}
              error={!!errors.fullName}
            />
            <Typography variant="subtitle2" color="error">
              {errors.fullName?.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="User Name"
              autoComplete="User name"
              {...register('userName')}
              error={!!errors.userName}
            />
            <Typography variant="subtitle2" color="error">
              {errors.userName?.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className={styles.acceptTerms}>
                  <FormControlLabel
                    control={(
                      <Controller
                        control={control}
                        defaultValue="false"
                        name="acceptTerms"
                      // @ts-ignore
                        inputRef={register()}
                        render={({ field: { onChange } }) => (
                          <Checkbox
                            color="primary"
                            onChange={((e) => onChange(e.target.checked))}
                            required
                          />
                        )}
                      />
                  )}
                    label=""
                  />
                  <Typography color={errors.acceptTerms ? 'error' : 'inherit'}>
                    Terms and conditions
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the standard dummy text ever since the 1500s, when
                  an unknown printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged. It was popularised in
                  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                  and more recently with desktop publishing software like Aldus
                  PageMaker including versions of Lorem Ipsum.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Typography sx={{ mt: 1 }} variant="inherit" color="textSecondary">
              {errors.acceptTerms
                ? `(${errors.acceptTerms.message})`
                : ''}
            </Typography>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2, p: 2 }}
          disabled={isLoading}
        >
          Sign Up
        </Button>
        {stateErrors && <Typography variant="h6" color="error">Server error</Typography>}
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography className={styles.link} variant="subtitle1" onClick={() => onModeChange()}>
              Already have an account? Sign in
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
