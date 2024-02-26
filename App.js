import * as React from "react";
import { StyleSheet } from "react-native";

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
import DisplayClue from "./src/Screens/DisplayClue";
import GameFinish from "./src/Screens/GameFinish";
import ClueDisplayPage from "./src/Screens/ClueDisplayPage";
import { LocationProvider } from "./src/Context/LocationContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LocationProvider>
      <Provider store={store}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </Provider>
    </LocationProvider>
  );
}

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Welcome", headerShown: false }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ title: "Creating a Route", headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ title: "Details Screen" }}
      />
      <Stack.Screen
        name="GameSelect"
        component={GameSelect}
        options={{ title: "Game Selection", headerShown: false }}
      />
      <Stack.Screen
        name="DisplayClue"
        component={DisplayClue}
        options={{ title: "Display Clue", headerShown: false }}
      />
      <Stack.Screen
        name="GameFinish"
        component={GameFinish}
        options={{ title: "Game Finish", headerShown: false }}
      />
      <Stack.Screen
        name="ClueDisplayPage"
        component={ClueDisplayPage}
        options={{ title: "Display Clue", headerShown: false }}
      />
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
