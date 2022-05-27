import {
  View,
  Text,
  SafeAreaView,
  Button,
  Image,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useNhostClient } from "@nhost/react";
import { useNavigation } from "@react-navigation/native";

const CREATE_PIN_MUTATION = `
mutation MyMutation($image:String!,$title:String) {
  insert_Pins(objects: {image: $image, title: $title}) {
    returning {
      created_at
      id
      image
      title
      user_id
    }
  }
}


`;

const CreatePinScreen = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const nhost = useNhostClient();
  const navigation = useNavigation();
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
  const onSubmit = async () => {
    const result = await nhost.graphql.request(CREATE_PIN_MUTATION, {
      title,
      image:
        "https://i.pinimg.com/736x/48/3e/2e/483e2ed2d8b5b175c82dddc6c328a258.jpg",
    });
    console.log(result);
    if (result.error) {
      Alert.alert("Error creating the post", result.error.message);
    } else {
      navigation.goBack();
    }
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
