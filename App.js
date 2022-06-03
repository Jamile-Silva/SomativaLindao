import React, { useState } from 'react'
import {StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo, Feather } from '@expo/vector-icons'

import Login from './components/login';
import Criar from './components/create';
import Ler from './components/read';
import Atualizar from './components/update';
import NewUser from './components/newUser';
import Home from './components/home';
import Conta from './components/count';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Tabs({ route }) {
  var param = route.params?.idUser
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopColor: 'tranparent',
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#555'
      }}
    >
       {/* <Tab.Screen name='Home' component={Home} initialParams={{ 'iddocara': param }} 
        options={{headerShown: false, tabBarShowLabel: false,   tabBarIconStyle: { display: 'none' }, }}
      /> */}

      <Tab.Screen name='Create' component={Criar} initialParams={{ 'iddocara': param }}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="news" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen name='Contatos' component={Ler} initialParams={{ 'iddocara': param }}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="users" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen name='Count' component={Conta} initialParams={{ 'iddocara': param }}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Count'
          component={Conta}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='NewUser'
          component={NewUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='TabBar'
          component={Tabs} //Tabs = Chama toda a TabBar
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Create'
          component={Criar} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Home'
          component={Home} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Read'
          component={Ler} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles=StyleSheet.create({
  menuHome:{
    display: 'none'
  }
})

