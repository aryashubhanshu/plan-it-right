import {
  Dumbbell01FreeIcons,
  FemaleSymbolFreeIcons,
  MaleSymbolFreeIcons,
  PlusSignSquareFreeIcons,
  WeightScaleFreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "./../../components/shared/Button";
import Input from "./../../components/shared/Input";
import { UserContext } from "./../../context/UserContext";
import { api } from "./../../convex/_generated/api";
import { calculateCaloriesWithAI } from "./../../services/AiModel";
import Colors from "./../../shared/Colors";
import Prompts from "./../../shared/Prompts";

export default function Preference() {
  const [weight, setWeight] = useState<string>();
  const [height, setHeight] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [goal, setGoal] = useState<string>();

  const { user, setUser } = useContext(UserContext);
  const UpdateUserPref = useMutation(api.Users.UpdateUserPref);

  const router = useRouter();

  const onContinue = async () => {
    if (!weight || !height || !gender || !goal) {
      Alert.alert(
        "Please fill all the fields",
        "Enter all details to continue"
      );
      return;
    }

    // User Preferences
    const data = {
      uid: user?._id,
      weight,
      height,
      gender,
      goal,
    };

    // Calculate calories using AI
    const prompt = JSON.stringify(data) + " " + Prompts.CALORIES_PROMPT;
    const AIResult = await calculateCaloriesWithAI(prompt);
    const AIResponse = AIResult.choices[0].message.content;
    const JSONContent = JSON.parse(
      AIResponse?.replace("```json", "").replace("```", "")!
    );

    const result = await UpdateUserPref({ ...data, ...JSONContent });

    setUser((prev: any) => ({ ...prev, data, ...JSONContent }));

    router.replace("/(tabs)/Home");
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: Colors.WHITE,
        height: Dimensions.get("screen").height,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 28,
          fontWeight: "bold",
          marginTop: 56,
        }}
      >
        Tell us about yourself
      </Text>
      <Text style={{ fontSize: 16, textAlign: "center", color: Colors.GRAY }}>
        This helps us create your personalized meal plan
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 12,
          marginTop: 16,
        }}
      >
        <View style={{ flex: 1 }}>
          <Input
            label="Weight (kg)"
            placeholder={"e.g. 70"}
            onChangeText={setWeight}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            label="Height (cm)"
            placeholder={"e.g. 70"}
            onChangeText={setHeight}
          />
        </View>
      </View>

      <View style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "medium" }}>Gender</Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
            marginTop: 8,
          }}
        >
          <Pressable
            onPress={() => setGender("Male")}
            style={{
              borderWidth: 1.5,
              padding: 16,
              borderRadius: 12,
              borderColor: gender === "Male" ? Colors.PRIMARY : Colors.GRAY,
              flex: 1,
              alignItems: "center",
            }}
          >
            <HugeiconsIcon
              icon={MaleSymbolFreeIcons}
              size={40}
              color={Colors.BLUE}
            />
          </Pressable>
          <Pressable
            onPress={() => setGender("Female")}
            style={{
              borderWidth: 1.5,
              padding: 16,
              borderRadius: 12,
              borderColor: gender === "Female" ? Colors.PRIMARY : Colors.GRAY,
              flex: 1,
              alignItems: "center",
            }}
          >
            <HugeiconsIcon
              icon={FemaleSymbolFreeIcons}
              size={40}
              color={Colors.PINK}
            />
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "medium" }}>
          What&apos;s your goal?
        </Text>
        <Pressable
          style={[
            styles.goalContainer,
            {
              borderColor:
                goal === "Weight loss" ? Colors.PRIMARY : Colors.GRAY,
            },
          ]}
          onPress={() => setGoal("Weight loss")}
        >
          <HugeiconsIcon icon={WeightScaleFreeIcons} />
          <View>
            <Text style={styles.goalText}>Weight loss</Text>
            <Text style={styles.goalSubText}>Reduce body fat & get leaner</Text>
          </View>
        </Pressable>
        <Pressable
          style={[
            styles.goalContainer,
            {
              borderColor:
                goal === "Muscle gain" ? Colors.PRIMARY : Colors.GRAY,
            },
          ]}
          onPress={() => setGoal("Muscle gain")}
        >
          <HugeiconsIcon icon={Dumbbell01FreeIcons} />
          <View>
            <Text style={styles.goalText}>Muscle gain</Text>
            <Text style={styles.goalSubText}>Build muscle & get stronger</Text>
          </View>
        </Pressable>
        <Pressable
          style={[
            styles.goalContainer,
            {
              borderColor:
                goal === "Weight gain" ? Colors.PRIMARY : Colors.GRAY,
            },
          ]}
          onPress={() => setGoal("Weight gain")}
        >
          <HugeiconsIcon icon={PlusSignSquareFreeIcons} />
          <View>
            <Text style={styles.goalText}>Weight gain</Text>
            <Text style={styles.goalSubText}>Increase healthy body mass</Text>
          </View>
        </Pressable>
      </View>
      <View style={{ marginTop: 16 }}>
        <Button title={"Continue"} onPress={onContinue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  goalContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 16,
    borderColor: Colors.GRAY,
    borderRadius: 16,
    marginTop: 12,
    borderWidth: 1.5,
  },
  goalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  goalSubText: {
    color: Colors.GRAY,
  },
});
