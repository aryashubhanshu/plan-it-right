import { ActivityIndicator, Pressable, Text } from "react-native";
import Colors from "../../shared/Colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

export default function Button({ title, onPress, loading }: ButtonProps) {
  return (
    <Pressable
      style={{
        padding: 16,
        backgroundColor: Colors.PRIMARY,
        width: "100%",
        borderRadius: 12,
      }}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={Colors.WHITE} size={24} />
      ) : (
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            textAlign: "center",
            color: Colors.WHITE,
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
