import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import CustomButton from "../Components/CustomButton";
import SocialSignInButtons from "../Components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useNhostClient } from "@nhost/react";

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nhost = useNhostClient();

  const onSignInPressed = async () => {
    const result = await nhost.auth.signIn({
      email,
      password,
    });
    if (result.error) {
      Alert.alert("Error", result.error.message);
    }
    console.log(result);
  };

  const onForgotPasswordPressed = () => {
    console.warn("Forgot password");
  };

  const onSignUpPress = () => {
    navigation.navigate("Sign up");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={{
            uri: "https://free-png.ru/wp-content/uploads/2022/02/free-png.ru-702.png",
          }}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Eamil"
          style={styles.input}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />

        <CustomButton text="Sign In" onPress={onSignInPressed} />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
  input: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
    height: 50,
  },
});

export default SignInScreen;
