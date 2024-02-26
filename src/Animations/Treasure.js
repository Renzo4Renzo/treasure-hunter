import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";

function Treasure(props) {
  const playTreasureAnimation = () => {
    treasureAnimation.play();
  };

  const stopTreasureAnimation = () => {
    treasureAnimation.reset();
  };

  return (
    <LottieView
      ref={(animation) => {
        treasureAnimation = animation;
      }}
      source={require("../../assets/treasure.json")}
      style={styles.animation}
    />
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
  },
});

export default Treasure;
