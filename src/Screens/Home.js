import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useSelector } from "react-redux";

function Home({ props, navigation }) {
  const gameData = JSON.stringify(useSelector((state) => state.gameData));
  return (
    <View>
      <Text>Welcome to the treasure hunting app!</Text>
      <Text>Are you a creator or treasure hunter?</Text>
      <Button title="Creator" onPress={() => navigation.navigate("MapScreen")} />
      <Button title="Hunter" onPress={() => navigation.navigate("GameSelect")} />
      <Text> {`Game Data: ${gameData}`} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  smallText: {
    color: "black",
  },
});

export default Home;
