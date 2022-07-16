import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "../../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";

const MyChatItem = ({ date, sender, text }) => {
  return (
    <View style={{alignItems:"flex-end"}}>
      <LinearGradient
        colors={["#9680FF", "#8352F5"]}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={{
          marginVertical: 10,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 12,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{ fontSize: 15, fontWeight: "600", color: COLORS.white }}
          >
            {sender}
          </Text>
          <Text style={{ fontSize: 12, color: COLORS.white50 }}>{date}</Text>
        </View>
        <Text style={{ fontSize: 15, color: COLORS.white85 }}>{text}</Text>
      </LinearGradient>
    </View>
  );
};

export default MyChatItem;
