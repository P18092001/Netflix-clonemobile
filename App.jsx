import React from 'react';
// import {ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
// import NavBar from './src/NavBar';
// import Row from './src/Row';
// import Banner from './src/Banner';
// import requests from './src/requests';
// import 'react-native-gesture-handler';
// import MovieDetails from './src/MovieDetails';
import NavComponents from './src/NavComponents';
import Login from './src/Login';
import OtherMovies from './src/OtherMovies';
import MoviePlayer from './src/MoviePlayer';
import { NavigationContainer } from '@react-navigation/native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import {enableScreens} from 'react-native-screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// enableScreens();
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Log">
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Nav" component={NavComponents} />
      <Stack.Screen name="OtherMovies" component={OtherMovies} />
      {/* <Stack.Screen name="Movie" component={MovieDetails}/> */}
      <Stack.Screen name="Movieplayer" component={MoviePlayer}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
};
  
export default App;