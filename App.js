import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

//Redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import gameDataReducer from "./src/redux/gameDataReducer";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import MapScreen from "./src/Screens/MapScreen";
import Home from "./src/Screens/Home";
import Details from "./src/Screens/Details";
import GameSelect from "./src/Screens/GameSelect";

const store = configureStore({
  reducer: {
    gameData: gameDataReducer,
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ title: "Home Page" }} />
      <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: "Creating a Route" }} />
      <Stack.Screen name="Details" component={Details} options={{ title: "Details Screen" }} />
      <Stack.Screen name="GameSelect" component={GameSelect} options={{ title: "Game Selection" }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
