import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from './styles';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const changeEmail = text => setEmail(text);
    const changeSenha = text => setSenha(text);

    function handleLogin(){

    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Insira seu e-mail'
                value={email}
                onChangeText={changeEmail}
                style={styles.input}
            />

            <TextInput
                placeholder='******'
                value={senha}
                onChangeText={changeSenha}
                style={styles.input}
            />

            <TouchableOpacity
                style={styles.handleLogin}
                onPress={handleLogin}

            >
                <Text style={styles.handleLoginTexto}>Acessar</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={{ textAlign: 'center' }}>Criar uma conta</Text>
            </TouchableOpacity>
        </View>
    );
}