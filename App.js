import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import { GOOGLE_API_KEY } from "@env";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";

export default function App() {
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
    setOrigin(currentLocation);
  }

  React.useEffect(() => {
    getLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
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
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_API_KEY}
          strokeColor="#b196ff"
          strokeWidth={6}
        />
        {/* <Polyline coordinates={[origin, destination]} strokeColor="#ffc0e9" strokeWidth={6} /> */}
      </MapView>
    </View>
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
    height: "100%",
  },
});
