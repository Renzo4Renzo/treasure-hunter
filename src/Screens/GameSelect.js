import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

function GameSelect({ props, navigation }) {
  return (
    <View>
      <Text>Select a game to play</Text>
      <Button title="Creator" onPress={() => navigation.navigate("Details")} />
      <Button
        title="Hunter"
        onPress={() => navigation.navigate("GameSelect")}
      />
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

export default GameSelect;
