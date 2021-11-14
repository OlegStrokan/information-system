import React from 'react';
import { Card } from '@mui/material';
import styles from './Login.module.css';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

interface LoginInterface {
  createUser: (...args: any) => void;
}

export const Login:React.FC<LoginInterface> = ({ createUser }) => {
  const [register, setRegister] = React.useState<boolean>(true);

  const onModeChange = () => {
    setRegister(!register);
  };

  const onLoadingChange = (state: boolean) => {
    setRegister(state);
  };

  const onErrorsChange = (error: any) => {
    setRegister(error);
  };

  return (
    <Card className={styles.root}>
      {!register ? <SignUp onModeChange={onModeChange} createUser={createUser} /> : <SignIn onModeChange={onModeChange} />}
    </Card>
  );
}
