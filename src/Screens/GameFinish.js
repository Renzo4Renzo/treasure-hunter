import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Treasure from "../Animations/Treasure";

function GameFinish(props) {
  const navigation = useNavigation();

  // Animation stuff
  const playTreasureAnimation = () => {
    treasureAnimation.play();
  };

  useEffect(() => {
    // Play the animation when the component mounts
    playTreasureAnimation();
  }, []);

  // Function to handle navigation back to "Home"
  const handleNavigateHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.congratsText}>
        Congratulations! You found the treasure!
      </Text>
      <Treasure />
      {/* Button to navigate back to "Home" */}
      <TouchableOpacity onPress={handleNavigateHome}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Go Back Home</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // background color
  },
  congratsText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333", // text color
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#AEFBBF",
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});

export default GameFinish;
