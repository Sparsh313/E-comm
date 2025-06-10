// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { registerUser } from '../utils/api';

// const RegisterScreen = ({ navigation }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async () => {
//  try {
//       const response = await axios.post(
//         "http://192.168.1.18:5000/api/auth/register",
//         {
//           email,
//           password,
//         }
//       );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Register</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Full Name"
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <TouchableOpacity style={styles.button} onPress={handleRegister}>
//         <Text style={styles.buttonText}>Register</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//         <Text style={styles.linkText}>Already have an account? Log In</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default RegisterScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 24,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 32,
//     marginBottom: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   input: {
//     height: 48,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     marginBottom: 16,
//   },
//   button: {
//     backgroundColor: '#2196F3',
//     paddingVertical: 14,
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   linkText: {
//     color: '#2196F3',
//     textAlign: 'center',
//     marginTop: 8,
//   },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("tanu");
  const [email, setEmail] = useState("tanu@gmail.com");
  const [password, setPassword] = useState("hello");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.18:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      const { _id, name: userName, email: userEmail, token } = response.data;
      // Store token
      await AsyncStorage.setItem("token", token);

      Alert.alert("Success", `Welcome, ${userName}!`);

      // Navigate to Home screen or Dashboard
      navigation.navigate("Home");
    } catch (err) {
      console.log(err?.response?.data || err.message);
      Alert.alert(
        "Registration Failed",
        err?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  linkText: {
    color: "#2196F3",
    textAlign: "center",
    marginTop: 8,
  },
});