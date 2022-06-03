import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import firebaseApp from './firebaseConfig'

export default function Update({navigation}) {
  const [nomeEdit, setNomeEdit] = useState('')
  const [enderecoEdit, setEnderecoEdit] = useState('')
  const [telefoneEdit, setTelefoneEdit] = useState('')
  const [dataNascimentoEdit, setDataNascimentoEdit] = useState('')


  const db = firebaseApp.firestore();

  function editar(dataNascimentoEdit, enderecoEdit, nomeEdit, telefoneEdit) {

    db.collection('agenda').limit(1).get().then(querySnapshot => {
        let resposta = querySnapshot.docs[0].id;
        db.collection('agenda').doc(resposta).update({
          "dataNascimento": dataNascimentoEdit,
          "endereco": enderecoEdit,
          "nome": nomeEdit,
          "telefone": telefoneEdit,
        }, { merge: true })
      });
      setNomeEdit('');
      setTelefoneEdit('');
      setDataNascimentoEdit('');
      setEnderecoEdit('');
  }


  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Uptade</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Nome"
        onChangeText={setNomeEdit}
        value={nomeEdit}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Endereço"
        onChangeText={setEnderecoEdit}
        value={enderecoEdit}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Telefone"
        onChangeText={setTelefoneEdit}
        value={telefoneEdit}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Data Nascimento"
        onChangeText={setDataNascimentoEdit}
        value={dataNascimentoEdit}
      />

      <View style={styles.textSucesso}>
        <Text style={{ color: '#0c0', fontSize: 20 }}>X</Text>
      </View>
      <View style={styles.botaoSalvar}>
        <Button
          title='Salvar'
          onPress={() => {
            editar(dataNascimentoEdit, enderecoEdit, nomeEdit, telefoneEdit)
          }}
        />
      </View>
    </View >
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
    width: '60%',
  },
  botaoSalvar: {
    position: 'absolute',
    marginTop: 250,
  },
  salvar: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'arial',
  },
  titleText: {
    color: '#f20a4f',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'calibri'
  },
  textSucesso: {
    flex: 1,
    color: '#555',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
    marginBottom: 10,
    marginTop: '95%',
  }
})