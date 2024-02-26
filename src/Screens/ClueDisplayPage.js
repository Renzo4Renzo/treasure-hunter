import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

const ClueDisplayPage = (props) => {
  // Flatten the array of games objects
  const { name, route } = props.route.params;
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const navigation = useNavigation();

  const currentGame = route[currentGameIndex];

  const displayCurrentClue = () => {
    const currentClue = currentGame?.clue;

    if (currentClue) {
      return (
        <View>
          <Text>{currentClue}</Text>
        </View>
      );
    }

    return <Text>No more clues for this game.</Text>;
  };

  const nextClue = () => {
    // Check if there are more clues in the current game
    if (currentGame.isLastClue === false) {
      console.log("isLastClue is true. prevIndex:  " + currentGameIndex);
      setCurrentGameIndex((prevIndex) => prevIndex + 1);
      console.log("isLastClue is true. prevIndex:  " + currentGameIndex);
    } else {
      // Move to the next game if available
      navigation.navigate("GameFinish");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.clueContainer}>{displayCurrentClue()}</View>
      <Button title="Next Clue" onPress={nextClue} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  clueContainer: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default ClueDisplayPage;
