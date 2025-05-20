import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import Button from "./../../components/shared/Button";
import Input from "./../../components/shared/Input";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSignIn = () => {
    console.log("Sign in called");

    if (!email || !password) {
      Alert.alert("Please fill all the fields");
      return;
    }
  };

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Image
        source={require("./../../assets/images/logo.png")}
        style={{
          width: 200,
          height: 200,
          marginTop: 60,
        }}
      />
      <Text style={{ fontSize: 32, fontWeight: "bold" }}>Welcome Back</Text>
      <View style={{ marginTop: 20, width: "100%" }}>
        <Input placeholder="Email" onChangeText={setEmail} />
        <Input placeholder="Password" password onChangeText={setPassword} />
        <View
          style={{
            marginTop: 16,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button title="Sign In" onPress={() => onSignIn()} />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 16,
              gap: 4,
            }}
          >
            <Text style={{ fontSize: 16 }}>Don&apos;t have an account?</Text>
            <Link href={"/auth/SignUp"}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Create
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
