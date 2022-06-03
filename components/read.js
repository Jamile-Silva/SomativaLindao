import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import firebaseApp from './firebaseConfig'

const db = firebaseApp.firestore();

export default function Read({navigation,route}){
  var param = route.params?.iddocara
  console.log(param)
  console.log(route.params)
  console.log('-----------')
  function deleteItem(id){
    db.collection("agenda").doc(id).delete()
  }

  const URL = "https://firebasestorage.googleapis.com/v0/b/somativalindao.appspot.com/o/images%2F"
  const media = "?alt=media"
  const [page, setPage] = useState([])
  
  useEffect(()=>{
    db.collection("agenda").where("uid", "==", param).onSnapshot((query)=>{
      const list=[]
      query.forEach((doc)=>{
        list.push({...doc.data(), id: doc.id})
      })
      
      setPage(list)
    })
  },[])

  return(
    <View style={styles.container}>
      <Text style={styles.titleText}>Contatos</Text>
      <FlatList
        data={page}
          renderItem={({item})=>{
            return(
              <View style={styles.pageDelete}>
                <TouchableOpacity
                  style={styles.deleteItemX}
                  onPress={()=>{deleteItem(item.id)}}
                >
                <FontAwesome 
                  name='trash'
                  size={25}
                  color='#f00'
                />
                </TouchableOpacity>

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
                  <Text>{item.nome}</Text>
                  <Text>{item.telefone}</Text>
                  <Text>{item.endereco}</Text>
                  <Text>{item.dataNascimento}</Text>
                  <img src={URL + item.image + media} style={{height: 80, width: 80, position: 'absolute', marginTop:-1, marginLeft:150, borderRadius:5}}/>
                </View>

              </View>
            )
          }}
      />
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