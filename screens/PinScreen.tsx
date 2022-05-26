import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import pins from "../assets/data/pins";

const PinScreen = () => {
  const pin = pins[1];
  const [ratio, setRation] = useState(1);

  //get the size of our notch top screen
  const insets = useSafeAreaInsets();

  const onBack = () => {};

  useEffect(() => {
    if (pin) {
      Image.getSize(pin.image, (width, height) => {
        setRation(width / height);
      });
    }
  }, [pin]);
  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <StatusBar style="light" />
      <View style={styles.root}>
        <Image
          source={{
            uri: pin.image,
          }}
          style={[styles.image, { aspectRatio: ratio }]}
        />
        <Pressable
          onPress={onBack}
          style={[styles.backbtn, { top: insets.top + 20 }]}
        >
          <Ionicons name={"chevron-back"} color="white" size={24} />
        </Pressable>
        <Text style={styles.title}>{pin.title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  title: {
    margin: 10,
    fontSize: 24,
    fontWeight: "600",
    fontAlign: "center",
    lineHeight: 35,
  },
  backbtn: {
    position: "absolute",
    left: 10,
  },
});

export default PinScreen;
