import { TextInput } from "react-native";

interface InputProps {
  placeholder: string;
  password?: boolean;
  onChangeText?: (text: string) => void;
}

export default function Input({
  placeholder,
  password = false,
  onChangeText,
}: InputProps) {
  return (
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
        marginTop: 16,
      }}
    />
  );
}
