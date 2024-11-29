import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCounter } from '../app/(tabs)/CounterContext'; // Import the counter context

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { counter } = useCounter(); // Access the counter state

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.counter}>Successful Code Entries: {counter}</Text>
      <Button title="Go to Code Screen" onPress={() => navigation.navigate('Code')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  counter: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default HomeScreen;
