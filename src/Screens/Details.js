import React from "react";
import { StyleSheet, View, Text } from "react-native";

function Details(props) {
  return (
    <View>
      <Text>Details</Text>
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

export default Details;
