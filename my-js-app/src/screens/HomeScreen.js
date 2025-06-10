import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://192.168.1.18:5000/api/products");
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      Alert.alert("Success", "Logged out successfully");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", "Failed to logout");
    }
  };

  // Handle menu item press
  const handleMenuItemPress = (item) => {
    setIsMenuVisible(false);

    switch (item) {
      case "myorders":
        navigation.navigate("MyOrders");
        break;
      case "wishlist":
        navigation.navigate("Wishlist");
        break;
      case "logout":
        Alert.alert("Logout", "Are you sure you want to logout?", [
          { text: "Cancel", style: "cancel" },
          { text: "Logout", onPress: handleLogout },
        ]);
        break;
      default:
        break;
    }
  };

  // Render individual product item
  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate("ProductDetail", { id: item._id })}
    >
      <Image
        source={{
          uri:
            item.images && item.images.length > 0
              ? item.images[0]
              : "https://via.placeholder.com/150",
        }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
        {item.size && item.size.length > 0 && (
          <Text style={styles.productSizes}>Sizes: {item.size.join(", ")}</Text>
        )}
        <Text style={styles.productStock}>Stock: {item.stock}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.hamburgerButton}
          onPress={() => setIsMenuVisible(true)}
        >
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>ShopHub</Text>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("Cart")}
        >
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      {/* Side Menu Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsMenuVisible(false)}
        >
          <View style={styles.sideMenu}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
              <TouchableOpacity onPress={() => setIsMenuVisible(false)}>
                <Text style={styles.closeButton}>×</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuItemPress("myorders")}
            >
              <Text style={styles.menuItemIcon}>📋</Text>
              <Text style={styles.menuItemText}>My Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuItemPress("wishlist")}
            >
              <Text style={styles.menuItemIcon}>❤️</Text>
              <Text style={styles.menuItemText}>Wishlist</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuItemPress("logout")}
            >
              <Text style={styles.menuItemIcon}>🚪</Text>
              <Text style={styles.menuItemText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSearchQuery("")}
        >
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSearchQuery("Clothing")}
        >
          <Text style={styles.filterButtonText}>Clothing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSearchQuery("Electronics")}
        >
          <Text style={styles.filterButtonText}>Electronics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSearchQuery("Books")}
        >
          <Text style={styles.filterButtonText}>Books</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
        refreshing={loading}
        onRefresh={fetchProducts}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  hamburgerButton: {
    padding: 5,
  },
  hamburgerLine: {
    width: 25,
    height: 3,
    backgroundColor: "#333",
    marginVertical: 2,
    borderRadius: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  cartButton: {
    padding: 5,
  },
  cartIcon: {
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  sideMenu: {
    width: 280,
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    fontSize: 30,
    color: "#666",
    fontWeight: "bold",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
  },
  filterContainer: {
    paddingVertical: 10,
    paddingLeft: 20,
    backgroundColor: "#fff",
  },
  filterButton: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonText: {
    color: "#2196F3",
    fontSize: 14,
    fontWeight: "500",
  },
  productsList: {
    padding: 10,
  },
  productCard: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: "#777",
    marginBottom: 4,
    fontStyle: "italic",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: 4,
  },
  productSizes: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },
  productStock: {
    fontSize: 11,
    color: "#666",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});
