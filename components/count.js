import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import firebaseApp from './firebaseConfig'

const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export default function Count({ navigation, route }) {
  

  return (
    <View><Text>AAAAA</Text></View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textInput: {
    borderRadius: 5,
    backgroundColor: '#eee',
    marginTop: 10,
    padding: 10,
    height: 40,
    width: '40%',
  },
  botaoSalvar: {
    padding: 0,
    marginBottom:40
  },
  salvar: {
    fontSize: 10,
    color: '#fff',
    fontFamily: 'arial',
  },
  titleText: {
    color: '#f20a4f',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'calibri'
  },
  textSucesso: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '40%',
    marginBottom: 0,
    marginTop: 0,
  },
  foto: {
    alignItems: 'center',
    marginTop: 30,
  },
  fotoBotao: {
    marginTop: 20,
    width: '40%',
  },
  fotoFoto: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    width: 100,
    height: 100,
  }
})