import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";

function Celebration(props) {
  const playCelebrationAnimation = () => {
    celebrationAnimation.play();
  };

  const stopCelebrationAnimation = () => {
    celebrationAnimation.reset();
  };

  return (
    <LottieView
      ref={(animation) => {
        celebrationAnimation = animation;
      }}
      source={require("../../assets/fireworks.json")}
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

export default Celebration;
