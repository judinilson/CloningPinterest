import { ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import Pin from "../components/Pin";
import { Text, View } from "../components/Themed";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Pin
          pin={{
            title: "NotJust Hoodie",
            image:
              "https://i.pinimg.com/474x/69/d2/c5/69d2c56ca573285ee364682e2096432e.jpg",
          }}
        />
        <Pin
          pin={{
            title: "NotJust Hoodie",
            image:
              "https://i.pinimg.com/474x/30/74/82/307482fa3fb9318c4141e5b01666f798.jpg",
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
