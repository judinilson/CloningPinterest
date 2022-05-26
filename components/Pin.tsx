import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";

const Pin = (props) => {
  const navigation = useNavigation();
  const [ratio, setRation] = useState(1);
  const { id, title, image } = props.pin;
  const onLike = () => {};
  const goToPinPage = () => {
    navigation.navigate("Pin", { id });
  };

  useEffect(() => {
    if (image) {
      Image.getSize(image, (width, height) => {
        setRation(width / height);
      });
    }
  }, [image]);
  return (
    <Pressable style={styles.pin} onPress={goToPinPage}>
      <View>
        <Image
          source={{
            uri: image,
          }}
          style={[styles.image, { aspectRatio: ratio }]}
        />
        <Pressable onPress={onLike} style={styles.heartbtn}>
          <AntDesign name="hearto" color="black" size={24} />
        </Pressable>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    margin: 10,
    color: "#181818",
  },
  pin: {
    width: "100%",
  },
  image: {
    width: "100%",

    borderRadius: 15,
  },
  heartbtn: {
    backgroundColor: "#D3CFD4",
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
  },
});

export default Pin;
