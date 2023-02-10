import { useNavigate } from 'react-router';
import {Button, TextField} from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import {UserInputInterface} from 'interfaces/UserInputInterface';

// FIREBASE
import { firebaseAuth } from '../../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
    const [inputs, setInputs] = useState<UserInputInterface>({
        email: '',
        password: ''
    });

    const {email, password} = inputs;

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.currentTarget;
        setInputs({...inputs, [name]: value});
    }

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        await signInWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
            const user = userCredential.user
            console.log(user)
        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.warn(`${errorCode} = ${errorMessage}`)
        })
    }


    return (
      <>
          <form onSubmit={onSubmit}>
              <TextField label='email' variant='outlined'
                         onChange={onChange} value={email} name={'email'} type={'email'}
                         required/>
              <TextField label='password' variant='outlined'
                         onChange={onChange} value={password} name={'password'} type={'password'}
                         required/>
              <Button variant={'contained'} type={'submit'}>
                  로그인
              </Button>
          </form>

      </>
    )
}

export default LoginPage