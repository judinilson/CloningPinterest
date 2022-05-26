import { Image, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <View style={styles.pin}>
        <Image
          source={{
            uri: "https://i.pinimg.com/474x/69/d2/c5/69d2c56ca573285ee364682e2096432e.jpg",
          }}
          style={styles.image}
        />
        <Text style={styles.title}>not just Hoodie</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  pin: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 25,
  },
});
