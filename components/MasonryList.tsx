import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Pin from "./Pin";

interface IMasonryList {
  pins: {
    id: string;
    image: string;
    title: string;
  }[];
}

const MasonryList = ({ pins }: IMasonryList) => {
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
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
  },
  column: {
    padding: 5,
    flex: 1,
  },
});
export default MasonryList;
