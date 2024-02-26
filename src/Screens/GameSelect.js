import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";

function GameSelect({ navigation }) {
  const allGames = [
    {
      clue: "The treasure is hidden in the park",
      targetLatitude: 41.063997788839,
      targetLongitude: -112.05525427912801,
      isLastClue: false,
      title: "Example Game 1",
    },
    {
      clue: "The first clue is at It's a Small World",
      targetLatitude: 41.063997788839,
      targetLongitude: -112.05525427912801,
      isLastClue: false,
      title: "Example Game 2",
    },
    {
      clue: "The treasure is hidden at Seven Dwarfs Mine Train",
      targetLatitude: 41.063997788839,
      targetLongitude: -112.05525427912801,
      isLastClue: false,
      title: "Example Game 3",
    },
    {
      clue: "The first clue is at Space Mountain",
      targetLatitude: 41.063997788839,
      targetLongitude: -112.05525427912801,
      isLastClue: false,
      title: "Example Game 4",
    },
  ];

  const allGamesObjects = [
    [
      {
        name: "G 1",
        route: [
          {
            id: 1,
            coordinate: {
              longitude: -112.05528074188703,
              latitude: 41.06398618665577,
            },
            title: "G",
            clue: "First Clue",
            isLastClue: false,
          },
          {
            id: 2,
            coordinate: {
              longitude: -112.05528074188703,
              latitude: 41.06398618665577,
            },
            title: "G2",
            clue: "Next Clue",
            isLastClue: true,
          },
          {
            id: 3,
            coordinate: {
              longitude: -112.05528074188703,
              latitude: 41.06398618665577,
            },
            title: "G3",
            clue: "Very Last Clue",
            isLastClue: true,
          },
        ],
      },
      {
        name: "GAME 2",
        route: [
          {
            id: 1,
            coordinate: {
              longitude: -76.98811758309603,
              latitude: -12.10257712383978,
            },
            title: "G3",
            clue: "Jdjsj",
            isLastClue: false,
          },
          {
            id: 2,
            coordinate: {
              longitude: -76.98972053825855,
              latitude: -12.102551881374037,
            },
            title: "G4",
            clue: "Jdjsk",
            isLastClue: true,
          },
        ],
      },
      {
        name: "GAME 4",
        route: [
          {
            id: 1,
            coordinate: {
              longitude: -77.00782846659422,
              latitude: -12.093384446938817,
            },
            title: "Hdjs",
            clue: "Jdjsj",
            isLastClue: false,
          },
          {
            id: 2,
            coordinate: {
              longitude: -76.99713584035635,
              latitude: -12.092343895071942,
            },
            title: "Jdjs",
            clue: "Jsjsj",
            isLastClue: true,
          },
        ],
      },
      {
        name: "GAME 6",
        route: [
          {
            id: 1,
            coordinate: {
              longitude: -77.00735505670309,
              latitude: -12.101470059172257,
            },
            title: "Jsks",
            clue: "Djjs",
            isLastClue: false,
          },
          {
            id: 2,
            coordinate: {
              longitude: -76.98931250721216,
              latitude: -12.068256971867845,
            },
            title: "Uwjs",
            clue: "Snns",
            isLastClue: true,
          },
        ],
      },
      {
        name: "GAME 7",
        route: [
          {
            id: 1,
            coordinate: {
              longitude: -77.01106622815132,
              latitude: -12.096090387374101,
            },
            title: "Gajs",
            clue: "Ndnx",
            isLastClue: false,
          },
          {
            id: 2,
            coordinate: {
              longitude: -76.99877835810184,
              latitude: -12.094137811831553,
            },
            title: "Jdks",
            clue: "Dnjdj",
            isLastClue: true,
          },
        ],
      },
    ],
  ];

  const gamesPerPage = 3;
  const [displayedGames, setDisplayedGames] = useState(
    allGamesObjects[0].slice(0, gamesPerPage)
  );

  const loadMoreGames = () => {
    const currentPage = Math.floor(displayedGames.length / gamesPerPage);
    const nextGames = allGamesObjects[currentPage + 1];
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
      {displayedGames.length < allGamesObjects[0].length && (
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
