import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    // Mock login logic
    if (email === 'example' && password === 'example') {
      Alert.alert('Success', 'Login successful!');
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Invalid credentials.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleCode = () => {
    navigation.navigate('CodeEntry');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')} // Adjust the path as necessary
        style={styles.logo}
      />
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
      <TouchableOpacity style={styles.registerContainer} onPress={handleRegister}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerContainer} onPress={handleCode}>
        <Text style={styles.registerText}>Enter Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  loginContainer: {
    width: '80%',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
  },
  registerContainer: {
    marginTop: 16,
  },
  registerText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default LoginScreen;