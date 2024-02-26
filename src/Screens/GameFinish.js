import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useLocation } from "../Context/LocationContext";
import { useNavigation } from "@react-navigation/native";
import Treasure from "../Animations/Treasure";

function GameFinish(props) {
  //animation stuff
  const playTreasureAnimation = () => {
    treasureAnimation.play();
  };
  const stopTreasureAnimation = () => {
    treasureAnimation.reset();
  };

  useEffect(() => {
    // Play the animation when the component mounts
    playTreasureAnimation();
    // Optionally, you can stop the animation when the component unmounts
    return () => {
      stopTreasureAnimation();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.congratsText}>
        Congratulations! You found the treasure!
      </Text>
      <Treasure />
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
});

export default GameFinish;
