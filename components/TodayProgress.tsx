import moment from "moment";
import { useContext } from "react";
import { Text, View } from "react-native";
import { UserContext } from "./../context/UserContext";
import Colors from "./../shared/Colors";

export default function TodayProgress() {
  const { user } = useContext(UserContext);

  return (
    <View
      style={{
        marginTop: 16,
        padding: 16,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 12,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: Colors.WHITE }}>
          Today&apos;s Goal
        </Text>
        <Text style={{ fontSize: 16, color: Colors.WHITE }}>
          {moment().format("MMM DD, YYYY")}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: Colors.WHITE,
          textAlign: "center",
          marginTop: 12,
        }}
      >
        1500/{user?.calories} kCal
      </Text>
      <Text
        style={{
          textAlign: "center",
          marginTop: 2,
          fontSize: 16,
          color: Colors.WHITE,
        }}
      >
        You&apos;re doing great!
      </Text>
      <View
        style={{
          height: 12,
          marginTop: 12,
          backgroundColor: Colors.GRAY,
          borderRadius: 99,
          opacity: 0.7,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            backgroundColor: Colors.WHITE,
            width: "70%",
            height: 12,
            borderRadius: 99,
          }}
        ></View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 8,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: Colors.WHITE }}>Calories Consume</Text>
        <Text style={{ color: Colors.WHITE }}>Keep it up! 🔥</Text>
      </View>
    </View>
  );
}
