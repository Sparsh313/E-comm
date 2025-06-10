import React from "react";
import { View, Text, Button } from "react-native";

export default function OrderScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Order Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
