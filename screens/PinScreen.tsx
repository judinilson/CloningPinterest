import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import pins from "../assets/data/pins";

const PinScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //const pin = pins[1];
  const [ratio, setRation] = useState(1);

  const pinId = route.params?.id;

  const pin = pins.find((p) => p.id == pinId);

  //get the size of our notch top screen
  const insets = useSafeAreaInsets();

  if (!pin) {
    return <Text>Pin not found</Text>;
  }

  const onBack = () => {
    navigation.goBack();
  };

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
            uri: pin?.image,
          }}
          style={[styles.image, { aspectRatio: ratio }]}
        />
        <Pressable
          onPress={onBack}
          style={[styles.backbtn, { top: insets.top + 10 }]}
        >
          <Ionicons name={"chevron-back"} color="white" size={30} />
        </Pressable>
        <Text style={styles.title}>{pin?.title}</Text>
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
    textAlign: "center",
    lineHeight: 35,
  },
  backbtn: {
    position: "absolute",
    left: 10,
  },
});

export default PinScreen;
