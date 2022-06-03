import React, { useState, useEffect } from 'react'
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import firebaseApp from './firebaseConfig'

export default function NewUser({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errorRegister, setErrorRegister] = useState('')

    const register = () => {
        if (password != password2){
            alert('As senhas não coincidem')

        }else{firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                navigation.navigate('Home', { idUser: user.uid })
            })
            .catch((error) => {
              setErrorRegister(true)
                let errorCode = error.code
                let errorMessage = error.message
            });}
        
    }

    useEffect(() => { }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.register}>
                <Text style={styles.title}>Novo usuario</Text>
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
                <TextInput style={styles.textInput1}
                    placeholder='Confirma senha'
                    secureTextEntry={true}
                    type='password'
                    onChangeText={(text) => setPassword2(text)}
                    value={password2}
                />
                
                {/*############ ERROR #######################*/}
                {errorRegister === true
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
                        style={styles.buttonRegister}
                    >
                        <Text style={styles.textRegisterOff}>Cadastrar</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.buttonRegister}
                        onPress={register}
                    >
                        <Text style={styles.textRegisterOn}>Cadastrar</Text>
                    </TouchableOpacity>
                }
                <Text style={styles.registration}>
                    Já possuí cadastro?
                    <TouchableOpacity
                        style={styles.linkSubscribe}
                        onPress={()=>navigation.navigate('Login')}
                    >
                        <Text> Logar agora</Text>
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
    register: {
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
        color: '#0ff',
    },
    error: {
        flexDirection: 'row',
        width: '80%',
    },
    warning: {
        flexDirection: 'row',
        paddingLeft: 5,
    },
    buttonRegister: {
        width: 90,
        height: 45,
        backgroundColor: '#54f0a7',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    textRegisterOff: {
        fontSize: 16,
        color: '#aaa',
    },
    textRegisterOn: {
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
