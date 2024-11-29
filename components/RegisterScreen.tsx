import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [reenterPassword, setReenterPassword] = useState<string>('');
  const navigation = useNavigation();

  const handleTakePicture = () => {
    navigation.navigate('PictureScreen'); // Uncomment this line when the Facial Scan screen is implemented
  };

  const handleSignUp = () => {
    if (!name || !studentId || !email || !password || !reenterPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== reenterPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    navigation.navigate('Home'); // Uncomment this line to navigate to Home screen after successful registration
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Student ID"
        value={studentId}
        onChangeText={(text) => setStudentId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="UofT Email"
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

      />
      <TextInput
        style={styles.input}
        placeholder="Re-enter Password"
        value={reenterPassword}
        onChangeText={(text) => setReenterPassword(text)}

      />
      <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
        <Text style={styles.buttonText}>Take Picture</Text>
      </TouchableOpacity>
      <Button title="Sign Up" onPress={handleSignUp} />
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
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RegisterScreen;