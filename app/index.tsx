import { useConvex } from "convex/react";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Button from "../components/shared/Button";
import Colors from "../shared/Colors";
import { UserContext } from "./../context/UserContext";
import { api } from "./../convex/_generated/api";
import { auth } from "./../services/FirebaseConfig";

export default function Index() {
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const convex = useConvex();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userInfo) => {
      if (!userInfo || !userInfo.email) return;

      console.log(userInfo?.email);
      const userData = await convex.query(api.Users.GetUser, {
        email: userInfo?.email,
      });
      setUser(userData);
      router.replace("/(tabs)/Home");
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        source={require("../assets/images/landing.jpg")}
        style={{ width: "100%", height: Dimensions.get("screen").height }}
      />
      <View
        style={{
          position: "absolute",
          height: Dimensions.get("screen").height,
          backgroundColor: "#0707075e",
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={{
            width: 200,
            height: 200,
            marginTop: 80,
          }}
        />
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: Colors.WHITE,
            marginTop: -32,
          }}
        >
          Plan It Right
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginHorizontal: 20,
            fontSize: 20,
            color: Colors.WHITE,
            marginTop: 16,
            opacity: 0.8,
          }}
        >
          Craft delicious, healthy meal plans tailored just for you. Achieve
          your goal with ease.
        </Text>
      </View>
      <View
        style={{ position: "absolute", bottom: 24, width: "100%", padding: 20 }}
      >
        <Button
          title={"Get Started"}
          onPress={() => router.push("/auth/SignIn")}
        />
      </View>
    </View>
  );
}
