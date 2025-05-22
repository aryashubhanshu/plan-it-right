import { useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import RecipeOptionList from "./../../components/RecipeOptionList";
import Button from "./../../components/shared/Button";
import { generateRecipeOptionsWithAI } from "./../../services/AiModel";
import Colors from "./../../shared/Colors";
import Prompts from "./../../shared/Prompts";

export default function GenerateAIRecipe() {
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [recipeOptions, setRecipeOptions] = useState<any>();

  const generateRecipeOptions = async () => {
    setLoading(true);
    Keyboard.dismiss();

    if (input === "") {
      Alert.alert("Please enter ingredients or recipe name");
      setLoading(false);
      return;
    }

    try {
      const prompt = input + Prompts.GENERATE_RECIPE_OPTION_FORMAT;
      const result = await generateRecipeOptionsWithAI(prompt);
      const aiResponse = result.choices[0].message;
      const extractJSON = aiResponse
        .content!.replace("```json", "")
        .replace("```", "");
      const JSONContent = JSON.parse(extractJSON);

      setRecipeOptions(JSONContent);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ paddingTop: 72, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        AI Recipe Generator
      </Text>
      <Text style={{ marginTop: 4, color: Colors.GRAY, fontSize: 16 }}>
        Generate personalized recipes using AI
      </Text>

      <TextInput
        placeholder="Enter your ingredients or recipe name"
        style={styles.textArea}
        multiline={true}
        onChangeText={(text) => setInput(text)}
      />

      <View style={{ marginTop: 16 }}>
        <Button
          title="Generate Receipe"
          onPress={generateRecipeOptions}
          loading={loading}
        />
      </View>

      {recipeOptions?.length > 0 && (
        <RecipeOptionList options={recipeOptions} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textArea: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 16,
    marginTop: 16,
    height: 140,
    textAlignVertical: "top",
  },
});
