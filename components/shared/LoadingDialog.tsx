import React from "react";
import { ActivityIndicator, Modal, Text, View } from "react-native";
import Colors from "./../../shared/Colors";

interface LoadingDialogInterface {
  loading: boolean;
}

export default function LoadingDialog({ loading }: LoadingDialogInterface) {
  return (
    <Modal transparent visible={loading}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00000070",
        }}
      >
        <View
          style={{
            padding: 32,
            borderRadius: 12,
            backgroundColor: Colors.PRIMARY,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={Colors.WHITE} />
          <Text style={{ color: Colors.WHITE, fontSize: 20, marginTop: 20 }}>
            Loading...
          </Text>
        </View>
      </View>
    </Modal>
  );
}
