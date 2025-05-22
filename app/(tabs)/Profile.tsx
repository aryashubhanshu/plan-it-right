import {
  AnalyticsUpFreeIcons,
  CookBookFreeIcons,
  Logout01FreeIcons,
  ServingFoodFreeIcons,
  UserCircleFreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { FlatList, Platform, Pressable, Text, View } from "react-native";
import { UserContext } from "./../../context/UserContext";
import { auth } from "./../../services/FirebaseConfig";
import Colors from "./../../shared/Colors";

const MenuOptions = [
  {
    title: "Explore Recipes",
    icon: CookBookFreeIcons,
    path: "/(tabs)/Meals",
  },
  {
    title: "My Progress",
    icon: AnalyticsUpFreeIcons,
    path: "/(tabs)/Progress",
  },
  {
    title: "AI Recipes",
    icon: ServingFoodFreeIcons,
    path: "/generate-ai-recipe",
  },
  {
    title: "Logout",
    icon: Logout01FreeIcons,
    path: "logout",
  },
];

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const onMenuOptionClick = (menu: { title: string; path: string }) => {
    if (menu.path === "logout") {
      signOut(auth).then(() => {
        setUser(null);
        router.replace("/");
      });
      return;
    }
    router.push(menu.path as Parameters<typeof router.push>[0]);
  };

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <View
          style={{ paddingTop: Platform.OS === "ios" ? 72 : 0, padding: 20 }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Your Profile</Text>

          <View
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <HugeiconsIcon
              icon={UserCircleFreeIcons}
              size={80}
              color={Colors.PRIMARY}
              strokeWidth={1.5}
            />
            <Text style={{ fontSize: 20, fontWeight: "semibold" }}>
              {user?.name}
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "medium", color: Colors.GRAY }}
            >
              {user?.email}
            </Text>
          </View>

          <FlatList
            data={MenuOptions}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => onMenuOptionClick(item)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 8,
                  marginTop: 16,
                  borderRadius: 12,
                  backgroundColor: Colors.WHITE,
                  padding: 12,
                  elevation: 1,
                  borderWidth: 0.5,
                  borderColor: Colors.GRAY,
                }}
              >
                <HugeiconsIcon
                  icon={item.icon}
                  size={36}
                  color={Colors.PRIMARY}
                />
                <Text style={{ fontSize: 20, fontWeight: 300 }}>
                  {item.title}
                </Text>
              </Pressable>
            )}
          />
        </View>
      }
    />
  );
}
