import {
  CheckmarkSquare01FreeIcons,
  SquareFreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useMutation } from "convex/react";
import { useContext } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { RefreshDataContext } from "./../context/RefreshDataContext";
import { api } from "./../convex/_generated/api";
import Colors from "./../shared/Colors";

export default function MealPlanCard({ mealPlanInfo }: any) {
  const updateStatus = useMutation(api.MealPlan.UpdateStatus);

  const { setRefreshData } = useContext(RefreshDataContext);

  const onCheck = async (status: boolean) => {
    await updateStatus({
      id: mealPlanInfo?.mealPlan?._id,
      status: status,
      calories: mealPlanInfo?.recipe?.jsonData?.calories,
    });

    Alert.alert("Status updated successfully");
    setRefreshData(Date.now());
  };

  return (
    <View
      style={{
        padding: 12,
        paddingHorizontal: 16,
        display: "flex",
        flexDirection: "row",
        gap: 8,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: Colors.GRAY,
        marginTop: 8,
        backgroundColor: Colors.WHITE,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          flex: 1,
        }}
      >
        <View>
          <Text style={styles.mealTypeText}>
            {mealPlanInfo?.mealPlan?.mealType}
          </Text>
          <Text style={styles.recipeName}>
            {mealPlanInfo?.recipe?.recipeName}
          </Text>
          <Text style={styles.calories}>
            {mealPlanInfo?.recipe?.jsonData?.calories} kcal
          </Text>
        </View>

        {mealPlanInfo?.mealPlan?.status !== true ? (
          <Pressable onPress={() => onCheck(true)}>
            <HugeiconsIcon icon={SquareFreeIcons} />
          </Pressable>
        ) : (
          <Pressable onPress={() => onCheck(false)}>
            <HugeiconsIcon
              icon={CheckmarkSquare01FreeIcons}
              color={Colors.PRIMARY}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mealTypeText: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    color: Colors.PRIMARY,
    padding: 4,
    borderRadius: 99,
    paddingHorizontal: 8,
    width: 80,
    textAlign: "center",
  },
  recipeName: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
  },
  calories: {
    fontSize: 16,
    fontWeight: "500",
  },
});
