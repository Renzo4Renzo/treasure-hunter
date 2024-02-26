import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSelector } from "react-redux";

function GameSelect({ navigation }) {
  const allGames = useSelector((state) => state.gameData.games);

  const gamesPerPage = 3;
  const [displayedGames, setDisplayedGames] = useState(
    allGames.slice(0, gamesPerPage)
  );

  const loadMoreGames = () => {
    const currentPage = Math.floor(displayedGames.length / gamesPerPage);
    const nextGames = allGames[currentPage + 1];
    if (nextGames) {
      setDisplayedGames((prevGames) => [...prevGames, ...nextGames]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select a game to play</Text>
      {displayedGames.map((game, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate("DisplayClue", game)}
        >
          <Text style={styles.buttonText}>{game.name}</Text>
        </TouchableOpacity>
      ))}
      {displayedGames.length < allGames[0].length && (
        <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreGames}>
          <Text style={styles.loadMoreButtonText}>Load More</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#AEFBBF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },
  loadMoreButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  loadMoreButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default GameSelect;
