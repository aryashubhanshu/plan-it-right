import { Text, TextInput, View } from "react-native";

interface InputProps {
  placeholder: string;
  label?: string;
  password?: boolean;
  onChangeText?: (text: string) => void;
}

export default function Input({
  placeholder,
  label,
  password = false,
  onChangeText,
}: InputProps) {
  return (
    <View style={{ marginTop: 16, width: "100%" }}>
      {label && (
        <Text style={{ marginBottom: 8, fontWeight: "medium", fontSize: 16 }}>
          {label}
        </Text>
      )}
      <TextInput
        onChangeText={(value) => onChangeText && onChangeText(value)}
        placeholder={placeholder}
        secureTextEntry={password}
        style={{
          padding: 16,
          borderWidth: 1,
          borderRadius: 12,
          fontSize: 18,
          paddingVertical: 16,
          width: "100%",
        }}
      />
    </View>
  );
}
