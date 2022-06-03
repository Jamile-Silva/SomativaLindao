//Arrumar a pagina de perfil e fazer com que cada user seja único
// https://firebase.google.com/docs/auth/admin/manage-users?hl=pt-br
//https://firebase.google.com/docs/auth/admin/manage-sessions?hl=pt-br
//https://firebase.google.com/docs/auth/admin/custom-claims?hl=pt-br


import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import firebaseApp from './firebaseConfig'

const db = firebaseApp.firestore();


export default function Count({ navigation, route }) {
  var param = route.params?.iddocara
  // console.log(param)
  // console.log(route.params)
  // console.log('-----------')
  const URL = "https://firebasestorage.googleapis.com/v0/b/somativalindao.appspot.com/o/images%2F"
  const media = "?alt=media"
  const [page, setPage] = useState([])

  useEffect(() => {
    db.collection("users").onSnapshot((query) => {
      query.forEach((doc) => {
        setPage({ ...doc.data(), id: doc.id })
        return;
      })
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Contatos</Text>
      <View style={styles.pageDelete}>

        {
          page.image != "" ?
            <Image source={{ uri: `${URL + page.image + media}` }} style={{ height: 80, width: 80, position: 'absolute', marginTop: -1, marginLeft: 150, borderRadius: 5 }} />
            :
            <></>
        }

        <TouchableOpacity
          style={styles.deleteItemX}
          onPress={() => { navigation.navigate('EditProfile', { idUser: route.params?.idUser}) }}
        >
          <FontAwesome
            name='pencil'
            size={25}
            color='#f00'
          />
        </TouchableOpacity>

        <View style={styles.textDelete}>
          <Text>{page.nome}</Text>
          <Text>{page.telefone}</Text>
          <Text>{page.endereco}</Text>
          <Text>{page.dataNascimento}</Text>
          <Text>{page.bio}</Text>
        </View>

        <TouchableOpacity
          style={styles.deleteItemX}
          onPress={() => {localStorage.clear(),  navigation.navigate('Login')}}
        >
          <FontAwesome
            name='logout'
            size={25}
            color='#f00'
          />
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  titleText: {
    color: '#f20a4f',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'calibri'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageDelete: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  deleteItemX: {
    justifyContent: 'center',
    paddingLeft: 15,
  },
  textDelete: {
    width: 250,
    height: 80,
    alignContent: 'flex-start',
    backgroundColor: '#eee',
    padding: 2,
    paddingHorizontal: 20,
    marginTop: 50,
    borderRadius: 5,
    color: '#444',
    marginLeft: 5,
    fontSize: 16,
  },
  titleText: {
    color: '#f20a4f',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'calibri'
  }

})