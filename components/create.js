import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import firebaseApp from './firebaseConfig'

const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export default function Create({ navigation, route }) {
  const [texto, setTexto] = useState()
  const [Nome, setNome] = useState('')
  const [endereco, setEndereco] = useState('')
  const [telefone, setTelefone] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  var param = route.params?.iddocara;

  //############## Imagens ####################
  const [image, setImage] = useState('');
  const upload = () => {
    if (image == null)
      return;
    storage.ref(`/images/${Nome.replace(/ +/g, "") + "_" + image.name}`).put(image)
      .on("state_changed", alert("success"), alert);
  }

  function intervalo(){
    setInterval(function () {
      setTexto('')
    }, 2000);
    setTexto('Cadastrado com sucesso')
  }

  function adicionar() {
    db.collection("agenda").add({
      nome: Nome,
      dataNascimento: dataNascimento,
      endereco: endereco,
      telefone: telefone,
      status: false,
      image: Nome.replace(/ +/g, "") + "_" + image.name
    })
    setNome("")
    setDataNascimento("")
    setEndereco("")
    setTelefone("")
    upload()
    intervalo()

  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Adicionar contato</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Nome"
        onChangeText={setNome}
        value={Nome}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Endereço"
        onChangeText={setEndereco}
        value={endereco}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Telefone"
        onChangeText={setTelefone}
        value={telefone}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Data Nascimento"
        onChangeText={setDataNascimento}
        value={dataNascimento}
      />

      <View style={styles.foto}>
        <View style={styles.fotoFoto}>
          <Text style={{ color: '#aaa' }}>
            FOTO
          </Text>
        </View>
        <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
      </View>

      <View style={styles.textSucesso}>
        <Text style={{ color: '#0c0', fontSize: 20 }}>{texto}</Text>
      </View>
      <View style={styles.botaoSalvar}>
        <Button
          title='Salvar'
          onPress={() => {
            adicionar()
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