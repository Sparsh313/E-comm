

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("sparsh@gmail.com");
  const [password, setPassword] = useState("hello");
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.18:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      const { token, name } = response.data;
      // Store token
      await AsyncStorage.setItem("token", token);
      Alert.alert("Success", `Welcome back, ${name}!`);
      // Navigate to Home screen or Dashboard
      navigation.navigate("Home"); // Update this to your actual route
    } catch (err) {
      console.log(err?.response?.data || err.message);
      Alert.alert(
        "Login Failed",
        err?.response?.data?.message || "Something went wrong"
      );
    }
  };
  const handleRegisterRedirect = () => {
    navigation.navigate("Register"); // Assumes you have a Register route
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleRegisterRedirect}>
        <Text style={styles.signUpText}>New user? Sign up here</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  signUpText: {
    color: "#007BFF",
    textAlign: "center",
    marginTop: 15,
    textDecorationLine: "underline",
  },
});