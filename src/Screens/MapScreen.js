import * as React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";

// import { GOOGLE_API_KEY } from "@env";
import MapView, { Marker, Polyline } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";

function MapScreen(props) {
  const [origin, setOrigin] = React.useState({
    latitude: -12.0912942,
    longitude: -76.997304,
  });

  const [destination, setDestination] = React.useState({
    latitude: -12.111525,
    longitude: -77.030054,
  });

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Location permission was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync();
    const currentLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    let newDestination = {
      latitude: location.coords.latitude + 0.5,
      longitude: location.coords.longitude + 0.5,
    };
    setDestination(newDestination);
    setOrigin(currentLocation);
  }

  React.useEffect(() => {
    getLocationPermission();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <Marker draggable coordinate={origin} onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)} />
        <Marker
          draggable
          coordinate={destination}
          onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
        />
        {/* <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_API_KEY}
          strokeColor="#b196ff"
          strokeWidth={6}
        /> */}
        <Polyline coordinates={[origin, destination]} strokeColor="#ffc0e9" strokeWidth={6} />
      </MapView>
      <View style={styles.buttonsContainer}>
        <View style={styles.newLocationButton}></View>
        <View style={styles.finishButton}></View>
        <View style={styles.backButton}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "90%",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  newLocationButton: {
    flex: 1,
    backgroundColor: "red",
  },
  finishButton: {
    flex: 1,
    backgroundColor: "gold",
  },
  backButton: {
    flex: 1,
    backgroundColor: "blue",
  },
});

export default MapScreen;
