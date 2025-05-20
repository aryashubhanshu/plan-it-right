import { Dimensions, Image, Text, View } from "react-native";
import Button from "../components/shared/Button";
import Colors from "../shared/Colors";

export default function Index() {
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
        <Button title={"Get Started"} onPress={() => console.log("Click")} />
      </View>
    </View>
  );
}
