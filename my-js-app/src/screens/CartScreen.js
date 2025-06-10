import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";
const TOKEN = "your_jwt_token_here";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      setCartItems(res.data.items || []);
    } catch (err) {
      Alert.alert("Error", "Could not load cart");
    } finally {
      setLoading(false);
    }
  };

  // Update quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      await axios.put(
        `${API_BASE_URL}/cart`,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );
      fetchCart();
    } catch (err) {
      Alert.alert("Error", "Failed to update quantity");
    }
  };

  // Remove item
  const removeItem = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/cart/${productId}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      fetchCart();
    } catch (err) {
      Alert.alert("Error", "Failed to remove item");
    }
  };

  const getTotal = () =>
    cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.product.image }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.name}>{item.product.name}</Text>
        <Text style={styles.price}>₹{item.product.price}</Text>

        <View style={styles.qtyContainer}>
          <TouchableOpacity
            onPress={() =>
              updateQuantity(item.product._id, Math.max(1, item.quantity - 1))
            }
          >
            <Text style={styles.qtyButton}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(item.product._id, item.quantity + 1)}
          >
            <Text style={styles.qtyButton}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => removeItem(item.product._id)}>
          <Text style={styles.remove}>Remove ❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🛒 My Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.product._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={<Text style={{ padding: 16 }}>Cart is empty</Text>}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: ₹{getTotal()}</Text>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => Alert.alert("Proceeding to checkout")}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  price: {
    color: "#777",
    marginVertical: 4,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    fontSize: 22,
    paddingHorizontal: 12,
    color: "#333",
  },
  qtyText: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  remove: {
    color: "red",
    marginTop: 6,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    fontSize: 18,
    fontWeight: "600",
  },
  checkoutBtn: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
});
