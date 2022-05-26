import { Image, StyleSheet, ScrollView } from "react-native";
import MasonryList from "../components/MasonryList";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import pins from "../assets/data/pins";
import { Entypo, Feather } from "@expo/vector-icons";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <Feather name="share" size={24} color="black" style={styles.icon} />
          <Entypo
            name="dots-three-horizontal"
            size={24}
            color="black"
            style={styles.icon}
          />
        </View>
        <Image
          source={{
            uri: "https://i.pinimg.com/474x/69/d2/c5/69d2c56ca573285ee364682e2096432e.jpg",
          }}
          style={styles.image}
        />
        <Text style={styles.title}>Juarmo </Text>
        <Text style={styles.subtitle}> 123 Followers | 345 Following </Text>
      </View>
      <MasonryList pins={pins} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    //alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  subtitle: {
    color: "#181818",
    fontWeight: "600",
    margin: 10,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 200,
    marginVertical: 20,
  },
  icons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
});
