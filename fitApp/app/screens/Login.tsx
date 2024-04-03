// Import necessary libraries
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';  // Adjust the path as necessary


// Login Component
const Login = () => {
  // State variables for email, password, and loading
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  // Handler for login
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // Handle navigation or state updates here
      console.log(response);
      Alert.alert("Login Success!");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

    // Handler for registration
    const handleRegister = async () => {
        setLoading(true);
        try {
          const response = await createUserWithEmailAndPassword(auth, email, password);
          // Handle navigation or state updates here
          console.log(response);
          Alert.alert("Register Success! Check your emails");
        } catch (error: any) {
          console.error(error);
          Alert.alert("Register Failed", error.message);
        } finally {
          setLoading(false);
        }
      };

  return (
    <View style={styles.container}>
      <TextInput value={email} style={styles.input} placeholder="Email" onChangeText={setEmail} autoCapitalize='none'/>
      <TextInput value={password} style={styles.input} placeholder="Password" onChangeText={setPassword} autoCapitalize='none' secureTextEntry />
      {loading ? <ActivityIndicator size="large" color="#0000ff" />
        : <> 
        <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
        </View>
        <View style={styles.buttonContainer}>
        <Button title="Create account" onPress={handleRegister} />
        </View>
        </>}
    </View>
  );
};

export default Login;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  buttonContainer: {
    margin: 5,
    padding: 5,
  }
});
