import React from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NuevoPost from '../screens/NuevoPost';
import Comentario from '../screens/Comentario';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function HomeStackScreen() {
   return (
     <Stack.Navigator>
       <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
       <Stack.Screen name="Comentarios" component={Comentario} />
     </Stack.Navigator>
   );
 }

const HomeMenu = () => {
    return (
          <Tab.Navigator>
             <Tab.Screen name="Home Page" component={ HomeStackScreen } options={ { headerShown: false,  tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" /> }} />
             <Tab.Screen name='NuevoPost' component={NuevoPost} options={ { headerShown: false,  tabBarIcon: () => <Ionicons name="add-circle" size={24} color="black" /> }} />
             <Tab.Screen name="Profile" component={ Profile } options={ { headerShown: false,  tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> }} />
          </Tab.Navigator>
     )
     
}

export default HomeMenu;