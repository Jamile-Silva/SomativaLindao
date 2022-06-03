//Arrumar a pagina de perfil e fazer com que cada user seja único
// https://firebase.google.com/docs/auth/admin/manage-users?hl=pt-br
//https://firebase.google.com/docs/auth/admin/manage-sessions?hl=pt-br
//https://firebase.google.com/docs/auth/admin/custom-claims?hl=pt-br


import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import firebaseApp from './firebaseConfig'

const db = firebaseApp.firestore();


export default function Count({ navigation}) {

  const URL = "https://firebasestorage.googleapis.com/v0/b/somativalindao.appspot.com/o/images%2F"
  const media = "?alt=media"
  const [page, setPage] = useState([])
  
  useEffect(()=>{
    db.collection("perfil").onSnapshot((query)=>{
      const list=[]
      query.forEach((doc)=>{
        list.push({...doc.data(), id: doc.id})
      })
      setPage(list)
      console.log('AAA',page)
    })
  },[])

  return(
    <View style={styles.container}>
      <Text style={styles.titleText}>Contatos</Text>
      <View style={styles.pageDelete}>
                <img src={URL + page.image[0] + media} style={{height: 80, width: 80, position: 'absolute', marginTop:-1, marginLeft:150, borderRadius:5}}/>

                <TouchableOpacity
                  style={styles.deleteItemX}
                  onPress={()=>{navigation.navigate('Uptade')}}
                >
                <FontAwesome 
                  name='pencil'
                  size={25}
                  color='#f00'
                />
                </TouchableOpacity>

                <View style={styles.textDelete}>
                  <Text>{page[0].nome}</Text>
                  <Text>{page[0].telefone}</Text>
                  <Text>{page[0].endereco}</Text>
                  <Text>{page[0].dataNascimento}</Text>
                  <Text>{page[0].bio}</Text>
                </View>

              </View>
    </View>
  )
}

const styles=StyleSheet.create({

  titleText:{
    color:'#f20a4f',
    fontSize:25, 
    fontWeight:'bold',
    fontFamily:'calibri'
  },
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
  },
  pageDelete:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:15,
  },
  deleteItemX:{
    justifyContent:'center',
    paddingLeft:15,
  },
  textDelete:{
    width:250,
    height:80,
    alignContent:'flex-start',
    backgroundColor:'#eee',
    padding:2,
    paddingHorizontal:20,
    marginTop: 50,
    borderRadius:5,
    color:'#444',
    marginLeft:5,
    fontSize:16,
  },
  titleText:{
    color:'#f20a4f',
    fontSize:25, 
    fontWeight:'bold',
    fontFamily:'calibri'
  }

})