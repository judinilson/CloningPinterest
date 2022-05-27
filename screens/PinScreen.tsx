import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Pressable, Alert } from "react-native";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { useNhostClient } from "@nhost/react";
import pins from "../assets/data/pins";

const GET_PIN_QUERY = `
   query MyQuery($id:uuid!) {
      Pins_by_pk(id: $id) {
          image
          id
          title
          user_id
          user {
            displayName
            id
            avatarUrl
          }
        created_at
     }
    }

`;

const PinScreen = () => {
  const nhost = useNhostClient();
  const [pin, setPin] = useState<any>(null);
  const [imageUri, setImageUri] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  const [ratio, setRation] = useState(1);

  const pinId = route.params?.id;

  //get the size of our notch top screen
  const insets = useSafeAreaInsets();

  const fetchPin = async (pinId) => {
    const response = await nhost.graphql.request(GET_PIN_QUERY, { id: pinId });

    if (response.error) {
      Alert.alert("error fetching pins");
    } else {
      setPin(response.data.Pins_by_pk);
    }
  };

  const fetchImage = async () => {
    const result = await nhost.storage.getPresignedUrl({
      fileId: pin.image,
    });
    if (result.presignedUrl?.url) {
      setImageUri(result.presignedUrl.url);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [pin]);

  //fetchPins every time it changes
  useEffect(() => {
    fetchPin(pinId);
  }, [pinId]);

  useEffect(() => {
    if (imageUri) {
      Image.getSize(pin.imageUri, (width, height) => {
        setRation(width / height);
      });
    }
  }, [imageUri]);

  if (!pin) {
    return <Text>Pin not found</Text>;
  }

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <StatusBar style="light" />
      <View style={styles.root}>
        <Image
          source={{
            uri: imageUri,
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
