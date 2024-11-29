import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../components/LoginScreen'; 
import HomeScreen from '../../components/HomeScreen'; 
import RegisterScreen from '../../components/RegisterScreen'; 
import PictureScreen from '../../components/PictureScreen';
import appConfig from '../../app.json';
import Amplify from 'aws-amplify';
import CodeEntryScreen from '../../components/CodeScreen';
// import awsconfig from '@/amplify'; 

// Amplify.configure(awsconfig);

const Stack = createStackNavigator();
const appName = appConfig.expo.name;

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="PictureScreen" component={PictureScreen} />
        <Stack.Screen name="CodeEntry" component={CodeEntryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;