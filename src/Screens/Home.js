import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Treasure Hunting App!</Text>
      <Text style={styles.subtitle}>Are you a creator or treasure hunter?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MapScreen")}
      >
        <Text style={styles.buttonText}>Creator</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#AEFBBF" }]}
        onPress={() => navigation.navigate("GameSelect")}
      >
        <Text style={styles.buttonText}>Treasure Hunter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
    color: "#555",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Home;
