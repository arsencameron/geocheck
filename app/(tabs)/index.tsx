import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@/components/LoginScreen'; // Adjust the path as necessary
import HomeScreen from '@/components/HomeScreen'; // Adjust the path as necessary
import RegisterScreen from '@/components/RegisterScreen'; // Adjust the path as necessary
import appConfig from '@/app.json';
import Amplify from 'aws-amplify';
import awsconfig from '@/amplify/.config/aws-exports'; // Adjust the path as necessary

Amplify.configure(awsconfig);

const Stack = createStackNavigator();
const appName = appConfig.expo.name;

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;