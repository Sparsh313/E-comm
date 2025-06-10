🛍️ React Native E-Commerce App

Demo : https://www.youtube.com/watch?v=WuBddq9QMHQ

This is a basic E-Commerce mobile application built using React Native. It includes user authentication, product listing, cart functionality, and detailed product views.

📁 Project Structure
src/ ├── screens/ │ ├── LoginScreen.js │ ├── RegisterScreen.js │ ├── HomeScreen.js │ ├── CartScreen.js │ └── ProductDetailScreen.js ├── navigation/ │ └── AppNavigator.js

🚀 Features
🔐 User Authentication
Login / Register with form validations
🏠 Home Screen
Displays all products
🛒 Cart Screen
Add and view items in cart
📦 Product Details
Full product information including image, price, category, and size
🌐 Navigation
Managed via a single navigation flow in AppNavigator.js
🛠️ Tech Stack
React Native (Expo)
Axios for API requests
React Navigation for screen management
Node.js + Express + MongoDB (Assumed backend)
🔧 Setup Instructions
Clone the repository:

git clone https://github.com/your-username/react-native-ecommerce-app.git
cd react-native-ecommerce-app
Install dependencies:
npm install
Start the app (using Expo):

npx expo start
Backend Setup:

Make sure your backend server is running.

Update the API base URL in your Axios requests (e.g., http://:5000/api).

📱 Use Expo Go on your mobile device or an emulator to preview the app.

📷 Screenshots Login Screen Home Screen Product Detail Cart

📂 Future Improvements Payment integration

Order history

Wishlist support

Cart support

Redux for state management

🤝 Contribution Feel free to fork and contribute by submitting a pull request.

📄 License This project is open source and available under the MIT License.
