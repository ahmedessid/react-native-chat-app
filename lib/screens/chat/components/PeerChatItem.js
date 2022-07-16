import { View, Text, Image } from "react-native";
import React from "react";
import { COLORS } from "../../../constants/colors";
import styles from "../styles";

const PeerChatItem = ({ date, sender, text, peerUrl }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          paddingVertical: 10,
          borderRadius: 12,
          backgroundColor: COLORS.white,
        }}
      >
        <Image
          source={{
            uri: peerUrl,
          }}
          style={styles.peerChatImage}
        />
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between"}}
          >
            <Text
              style={{ fontSize: 15, fontWeight: "600", color: COLORS.black }}
            >
              {sender}
            </Text>
            <Text style={{ fontSize: 12, color: COLORS.black50 }}>{date}</Text>
          </View>
          <Text style={{ fontSize: 15, color: COLORS.black85 }}>{text}</Text>
        </View>
      </View>
    </View>
  );
};

export default PeerChatItem;
