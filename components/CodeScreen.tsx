import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const CodeEntryScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleCodeSubmit = () => {
    if (code.trim() === '') {
      setMessage('Please enter a code.');
    } else {
      setMessage(`Code submitted: ${code}`);
      // Add your logic here for what happens when the code is submitted.
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter code here"
        value={code}
        onChangeText={setCode}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleCodeSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
});

export default CodeEntryScreen;
