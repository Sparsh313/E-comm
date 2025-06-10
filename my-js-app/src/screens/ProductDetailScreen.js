
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   ScrollView,
// } from "react-native";
// import axios from "axios";

// const ProductDetailScreen = ({ route }) => {
//   const { id } = route.params;
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         console.log("Route Params:", route.params);
//         console.log(id);
//         const { data } = await axios.get(
//           `http://192.168.1.18:5000/api/products/${id}`
//         );
//         setProduct(data);
//       } catch (error) {
//         console.error("Failed to fetch product", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (!product) {
//     return (
//       <View style={styles.centered}>
//         <Text>Product not found</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Image source={{ uri: product.images[0] }} style={styles.image} />
//       <Text style={styles.title}>{product.title}</Text>
//       <Text style={styles.price}>₹{product.price}</Text>
//       <Text style={styles.description}>{product.description}</Text>
//       <Text style={styles.info}>Category: {product.category}</Text>
//       <Text style={styles.info}>
//         Available Sizes: {product.size.join(", ")}
//       </Text>
//       <Text style={styles.info}>Stock: {product.stock}</Text>
//     </ScrollView>
//   );
// };

// export default ProductDetailScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     alignItems: "center",
//   },
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     width: "100%",
//     height: 300,
//     resizeMode: "cover",
//     borderRadius: 12,
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   price: {
//     fontSize: 20,
//     color: "#2ecc71",
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 12,
//   },
//   info: {
//     fontSize: 14,
//     color: "#555",
//     marginBottom: 4,
//   },
// });


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";

const ProductDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Route Params:", route.params);
        console.log(id);
        const { data } = await axios.get(
          `http://192.168.1.18:5000/api/products/${id}`
        );
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.images[0] }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.info}>Category: {product.category}</Text>
      <Text style={styles.info}>
        Available Sizes: {product.size.join(", ")}
      </Text>
      <Text style={styles.info}>Stock: {product.stock}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => Alert.alert("Added to Cart", product.title)}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonBuy}
          onPress={() => Alert.alert("Buy Now", product.title)}
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: "#2ecc71",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
  },
  info: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  buttonAdd: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonBuy: {
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
