import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

import firebase from '../../services/firebaseConnection';

import styles from './styles';

export default function Login({ changeStatus }) {
    const [type, setType] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const changeEmail = text => setEmail(text);
    const changePassword = text => setPassword(text);

    function handleLogin() {
        if (type === 'Login') {
            const user = firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    changeStatus(user.user.uid);
                })
                .catch((e) => {
                    console.log(e);
                    alert('Ops, algo deu errado!')
                    return;
                })
        } else {
            const user = firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    changeStatus(user.user.uid);
                })
                .catch((e) => {
                    console.log(e);
                    alert('Ops, algo deu errado!')
                    return;
                })
        }
    };

    const changeButton = () => setType(type => type === 'Login' ? 'Cadastrar' : 'Login');

    const showButton = type === 'Login' ? 'Acessar' : 'Cadastrar';
    const showRegister = type === 'Login' ? 'Criar uma conta' : 'Já tenho uma conta';
    const showColor = type === 'Login' ? '#3ea6f2' : '#141414';
    const showPassword = type === 'Login' ? true : false;

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder='Insira seu e-mail'
                value={email}
                onChangeText={changeEmail}
                style={styles.input}
            />

            <TextInput
                placeholder='******'
                value={password}
                onChangeText={changePassword}
                style={styles.input}
                secureTextEntry={showPassword}
            />

            <TouchableOpacity
                style={[styles.handleLogin, { backgroundColor: showColor }]}
                onPress={handleLogin}
            >
                <Text style={styles.handleLoginText}>{showButton}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={changeButton}>
                <Text style={{ textAlign: 'center' }}>{showRegister}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}