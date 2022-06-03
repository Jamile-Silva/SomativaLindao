import React, { useState, useEffect } from 'react'
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import firebaseApp from './firebaseConfig'

export default function App({ navigation }) {
    const [email, setEmail] = useState('macarena@ayy.com')
    const [password, setPassword] = useState('12345678')
    const [errorLogin, setErrorLogin] = useState('')

    const loginFirebase = () => {
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                navigation.navigate('Home', { idUser: user.uid })
            })
            .catch((error) => {
                setErrorLogin(true)
                let errorCode = error.code
                let errorMessage = error.message
            });
    }

    useEffect(() => {
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.login}>
                <Text style={styles.title}>Login</Text>
                <TextInput style={styles.textInput1}
                    placeholder='Email'
                    type='text'
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <TextInput style={styles.textInput1}
                    placeholder='Senha'
                    secureTextEntry={true}
                    type='password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                {/*############ ERROR #######################*/}
                {errorLogin === true
                    ?
                    <View style={styles.error}>
                        <MaterialCommunityIcons
                            name='alert-circle'
                            size={20}
                            color='#f00'
                        /><Text style={styles.warning}>E-mail ou senha inválido...</Text>
                    </View>
                    :
                    <View />
                }
                {/*############ FIM ERROR ##################*/}

                {email === "" || password === ""
                    ?
                    <TouchableOpacity
                        disabled={true}
                        style={styles.buttonLogin}
                    >
                        <Text style={styles.textLoginOff}>Logar</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.buttonLogin}
                        onPress={loginFirebase}
                    >
                        <Text style={styles.textLoginOn}>Logar</Text>
                    </TouchableOpacity>
                }
                <Text style={styles.registration}>
                    Não tem uma conta ainda?
                    <TouchableOpacity
                        style={styles.linkSubscribe}
                        onPress={() => navigation.navigate('NewUser')}
                    >
                        <Text> Cadastre agora</Text>
                    </TouchableOpacity>
                </Text>
            </View>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        color: '#f00',
        fontSize: 20,
    },
    textInput1: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
        borderColor: '#ccc',
        marginBottom: 10,
        marginTop: 10,
        width: '90%',
        height: 40,
    },
    login: {
        alignItems: 'center',
        width: '80%',
        height: '70%',
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    title: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#001eff',
    },
    error: {
        flexDirection: 'row',
        width: '80%',
    },
    warning: {
        flexDirection: 'row',
        paddingLeft: 5,
    },
    buttonLogin: {
        width: 90,
        height: 45,
        backgroundColor: '#54f0a7',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    textLoginOff: {
        fontSize: 16,
        color: '#aaa',
    },
    textLoginOn: {
        fontSize: 16,
        color: '#555',
    },
    registration: {
        marginTop: 20,
        fontWeight: 'italic',
        fontSize: 12,

    },
    linkSubscribe: {
        color: '#1256c4',
    }
});
