import { AntDesign } from "@expo/vector-icons";
import { useNhostClient } from "@nhost/react";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";

const Pin = (props) => {
  const navigation = useNavigation();
  const [ratio, setRation] = useState(1);
  const { id, title, image } = props.pin;
  const [imageUri, setImageUri] = useState("");
  const nhost = useNhostClient();
  const onLike = () => {};
  const goToPinPage = () => {
    navigation.navigate("Pin", { id });
  };

  const fetchImage = async () => {
    const result = await nhost.storage.getPresignedUrl({
      fileId: image,
    });
    if (result.presignedUrl?.url) {
      setImageUri(result.presignedUrl.url);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  useEffect(() => {
    if (imageUri) {
      Image.getSize(imageUri, (width, height) => {
        setRation(width / height);
      });
    }
  }, [imageUri]);
  return (
    <Pressable style={styles.pin} onPress={goToPinPage}>
      <View>
        <Image
          source={{
            uri: imageUri,
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
