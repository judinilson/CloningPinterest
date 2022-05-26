import { FlatList, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import Pin from "../components/Pin";
import pins from "../assets/data/pins";
import { Text, View } from "../components/Themed";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* 1st column */}
        <View style={styles.column}>
          {pins
            .filter((_, index) => index % 2 == 0)
            .map((pin) => (
              <Pin pin={pin} key={pin.id} />
            ))}
        </View>
        {/* 2nd column */}
        <View style={styles.column}>
          {pins
            .filter((_, index) => index % 2 == 1)
            .map((pin) => (
              <Pin pin={pin} key={pin.id} />
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  column: {
    padding: 5,
    flex: 1,
  },
});
