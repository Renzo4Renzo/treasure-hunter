import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

function Home({ props, navigation }) {
  return (
    <View>
      <Text>Welcome to the treasure hunting app!</Text>
      <Text>Are you a creator or treasure hunter?</Text>
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

export default Home;
