import moment from "moment";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import Colors from "./../shared/Colors";

export default function DateSelectionCard({
  selectedDate,
  setSelectedDate,
}: any) {
  const [dateList, setDateList] = useState<string[]>([]);

  const generateDates = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      const nextDate = moment().add(i, "days").format("DD/MM/YYYY");
      result.push(nextDate);
    }

    setDateList(result);
  };

  useEffect(() => {
    generateDates();
  }, []);

  return (
    <View>
      <Text style={{ marginTop: 16, fontSize: 16, fontWeight: "bold" }}>
        Select Date
      </Text>
      <FlatList
        data={dateList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              padding: 8,
              paddingTop: 12,
              borderWidth: 0.5,
              borderRadius: 12,
              margin: 4,
              gap: 4,
              marginTop: 8,
              borderColor: selectedDate === item ? Colors.PRIMARY : Colors.GRAY,
              backgroundColor:
                selectedDate === item ? Colors.SECONDARY : Colors.WHITE,
            }}
            onPress={() => setSelectedDate(item)}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {moment(item, "DD/MM/YYYY").format("ddd")}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {moment(item, "DD/MM/YYYY").format("DD")}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {moment(item, "DD/MM/YYYY").format("MMM")}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
