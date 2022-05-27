import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import Pin from "./Pin";

interface IMasonryList {
  pins: {
    id: string;
    image: string;
    title: string;
  }[];
}

const MasonryList = ({ pins }: IMasonryList) => {
  const width = useWindowDimensions().width;
  const numOfColums = Math.ceil(width / 250);

  return (
    <ScrollView>
      <View style={styles.container}>
        {Array.from(Array(numOfColums)).map((col, colIndex) => (
          <View style={styles.column} key={`column_${colIndex}`}>
            {pins
              .filter((_, index) => index % numOfColums == colIndex)
              .map((pin) => (
                <Pin pin={pin} key={pin.id} />
              ))}
          </View>
        ))}
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
