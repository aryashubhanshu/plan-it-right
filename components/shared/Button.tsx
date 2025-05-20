import { Pressable, Text } from "react-native";
import Colors from "../../shared/Colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export default function Button({ title, onPress }: ButtonProps) {
  return (
    <Pressable
      style={{
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        width: "100%",
        borderRadius: 12,
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 20, textAlign: "center", color: Colors.WHITE }}>
        {title}
      </Text>
    </Pressable>
  );
}
