import * as React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import { addGameData } from "../redux/gameDataReducer";

function MapScreen({ navigation }) {
  const dispatch = useDispatch();

  const [initialRegion, setInitialRegion] = React.useState(null);
  const [gameName, setGameName] = React.useState("");
  const [markers, setMarkers] = React.useState([]);
  const [promptVisible, setPromptVisible] = React.useState(false);
  const [promptTitle, setPromptTitle] = React.useState("");
  const [promptClue, setPromptClue] = React.useState("");
  const [promptCoordinate, setPromptCoordinate] = React.useState(null);

  React.useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        });
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    };

    getCurrentLocation();
  }, []);

  const polylineCoordinates = React.useMemo(() => {
    return markers.map((marker) => marker.coordinate);
  }, [markers]);

  const showPrompt = () => {
    setPromptVisible(true);
  };

  const hidePrompt = () => {
    setPromptVisible(false);
  };

  const handlePromptSubmit = () => {
    if (promptTitle.trim() === "" || promptClue.trim() === "") {
      Alert.alert("Error", "Title and clue cannot be empty");
      return;
    }

    const newMarker = {
      id: markers.length + 1,
      coordinate: promptCoordinate,
      title: promptTitle,
      clue: promptClue,
    };
    setPromptTitle("");
    setPromptClue("");

    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    hidePrompt();
  };

  const addMarker = (e) => {
    setPromptCoordinate(e.nativeEvent.coordinate);
    showPrompt();
  };

  const updateMarker = (markerId, newCoordinate) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === markerId
          ? { ...marker, coordinate: newCoordinate }
          : marker
      )
    );
  };

  const handleMarkerDragEnd = (e, markerId) => {
    const newCoordinate = e.nativeEvent.coordinate;
    updateMarker(markerId, newCoordinate);
  };

  const setSaveRouteStyle = ({ pressed }) => [
    styles.buttonsContainer,
    {
      backgroundColor: pressed || markers.length < 2 ? "gray" : "#3498db",
    },
  ];

  const saveRoute = () => {
    if (markers.length < 2 || gameName.trim() === "") {
      Alert.alert("Error", "Game name and at least 2 markers are required");
      return;
    }
    const gameData = {
      name: gameName.trim().toUpperCase(),
      route: markers.map((marker, index) => ({
        ...marker,
        isLastClue: index === markers.length - 1,
      })),
    };
    dispatch(addGameData(gameData));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.gameNameInput}
        placeholder="Enter your game name here"
        value={gameName}
        onChangeText={(text) => setGameName(text)}
      />
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onPress={addMarker}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            draggable
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.clue}
            onDragEnd={(e) => handleMarkerDragEnd(e, marker.id)}
          />
        ))}
        {polylineCoordinates.length > 1 && (
          <Polyline
            coordinates={polylineCoordinates}
            strokeColor="#ffc0e9"
            strokeWidth={6}
          />
        )}
      </MapView>
      <Pressable
        onPress={saveRoute}
        style={setSaveRouteStyle}
        disabled={markers.length < 2}
      >
        <View>
          <Text>SAVE ROUTE</Text>
        </View>
      </Pressable>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text>Go to Home</Text>
      </TouchableOpacity>

      <Modal isVisible={promptVisible}>
        <View style={styles.promptContainer}>
          <Text style={styles.promptTitle}>Add checkpoint</Text>
          <Text style={styles.promptText}>
            Enter title and clue for the new checkpoint:
          </Text>
          <TextInput
            style={styles.promptInput}
            placeholder="Title"
            onChangeText={(text) => setPromptTitle(text)}
          />
          <TextInput
            style={styles.promptInput}
            placeholder="Clue"
            onChangeText={(text) => setPromptClue(text)}
          />
          <Pressable style={styles.promptButton} onPress={handlePromptSubmit}>
            <Text>Submit</Text>
          </Pressable>
          <Pressable style={styles.promptButton} onPress={hidePrompt}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    justifyContent: "center",
  },
  gameNameInput: {
    width: "90%",
    height: 50,
    borderColor: "#3498db",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
    width: "90%",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
  buttonsContainer: {
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db",
    borderRadius: 10,
    marginVertical: 10,
  },
  homeButton: {
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AEFBBF",
    borderRadius: 10,
    marginVertical: 10,
  },
  promptContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  promptTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  promptText: {
    marginBottom: 10,
  },
  promptInput: {
    height: 40,
    borderColor: "#3498db",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  promptButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  customButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
});

export default MapScreen;
