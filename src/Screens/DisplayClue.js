import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocation } from "../Context/LocationContext";
import { useNavigation } from "@react-navigation/native";

//functions
import calculateHaversineDistance from "../Functions/Haversine";
import Celebration from "../Animations/Celebration";

function DisplayClue(props) {
  const { name, route } = props.route.params;
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [isWithinRadius, setIsWithinRadius] = React.useState(false);
  const navigation = useNavigation();
  const radiusInMeters = 30;
  const { currentLocation } = useLocation();
  const currentGame = route[currentGameIndex];
  const [clueText, setClueText] = useState("");

  //animation stuff
  const playCelebrationAnimation = () => {
    celebrationAnimation.play();
  };
  const stopCelebrationAnimation = () => {
    celebrationAnimation.reset();
  };
  const updateClueText = (text) => {
    setClueText(text);
  };

  //function to handle next page
  const handleNextPage = () => {
    const nextIndex = currentGameIndex + 1;

    if (nextIndex >= route.length) {
      // No more routes, navigate to GameFinish
      navigation.navigate("GameFinish");
    } else {
      setCurrentGameIndex(nextIndex);

      // Set the next clue text
      setClueText(route[nextIndex].clue);

      stopCelebrationAnimation();
      setIsWithinRadius(false);
    }
  };

  useEffect(() => {
    setIsWithinRadius(false);
    setClueText("");

    if (currentGame && currentLocation) {
      const targetLatitude = currentGame.coordinate.latitude;
      const targetLongitude = currentGame.coordinate.longitude;
      const distance = calculateHaversineDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        targetLatitude,
        targetLongitude
      );

      if (distance <= radiusInMeters) {
        // player entered radius
        playCelebrationAnimation();
        setIsWithinRadius(true);
        // setClueText asynchronously after setIsWithinRadius
        setTimeout(() => {
          updateClueText("You found the clue location!");
        }, 0);
      } else {
        setIsWithinRadius(false);
        // Set the clue text for the current game
        updateClueText(currentGame.clue);
      }
    }
  }, [currentLocation, currentGameIndex, currentGame]);

  if (!currentLocation) {
    // Render a loading state while waiting for the location
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Getting your location...</Text>
        <ActivityIndicator size="large" color="#AEFBBF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.clue}>{clueText || currentGame.clue}</Text>
      <Celebration />
      {isWithinRadius ? (
        <TouchableOpacity onPress={handleNextPage}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Next Clue</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  clue: {
    fontWeight: "bold",
    color: "black",
    fontSize: 40,
    textAlign: "center",
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
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginBottom: 20,
    fontSize: 18,
    color: "#333",
  },
});

export default DisplayClue;
