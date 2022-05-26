import {
  View,
  Text,
  SafeAreaView,
  Button,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const CreatePinScreen = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });
    //console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const onSubmit = () => {
    console.warn("submit click");
  };

  return (
    // <SafeAreaView>
    <View style={styles.root}>
      <Button title="Upload your pin" onPress={pickImage} />
      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <TextInput
            placeholder="Title...."
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
        </>
      )}
      <Button title="Create pin" onPress={onSubmit} />
    </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 5,
    width: "100%",
  },
});

export default CreatePinScreen;
