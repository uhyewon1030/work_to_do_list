import React, {ChangeEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import moment from 'moment';
import {Button, TextField} from '@mui/material';

// FIREBASE
import {firebaseAuth, fireStoreJob} from 'firebase-config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {collection, addDoc} from 'firebase/firestore';


interface UserInterface {
    uid: string,
    email: string,
    displayName: string,
    date_created: string
}

interface UserInputInterface {
    email: string,
    displayName?: string,
    password: string
}

const JoinPage = () => {
    const firestore_path = 'users';
    const navigate = useNavigate();
    const [inputs, setInputs] = useState<UserInputInterface>({
        email: '',
        displayName: '',
        password: ''
    });

    const {email, displayName, password} = inputs;

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.currentTarget;
        setInputs({...inputs, [name]: value});
    }
    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log(user)
                // 계정 생성을 하고 나면 firestore에 데이터를 저장합니다.
                console.log('파이어스토어 저장 시작')
                await addDoc(collection(fireStoreJob, firestore_path), {
                    uid: user.uid,
                    ...inputs,
                    date_created: moment().utc().format()
                })
                console.log('파이어스토어 저장 완료')
                // 모든 과정이 끝나면 login 페이지로 이동합니다.
                navigate('/');

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.warn(`${errorCode} - ${errorMessage}`)
            })
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextField label='email' variant='outlined'
                           onChange={onChange} value={email} name={'email'} type={'email'}
                           required/>
                <TextField label='displayName' variant='outlined'
                           onChange={onChange} value={displayName} name={'displayName'} type={'text'}
                           required/>
                <TextField label='password' variant='outlined'
                           onChange={onChange} value={password} name={'password'} type={'password'}
                           required/>
                <Button variant={'contained'} type={'submit'}
                        disabled={email.length !== 0 && displayName?.length !== 0 && password.length !== 0 ? false : true}>
                    Sign Up
                </Button>
            </form>
        </>
    )
}

export default JoinPage