import { View, Text, Image } from "react-native";
import React from "react";
import { COLORS } from "../../../constants/colors";
import styles from "../styles";
import moment from "moment";
import { useSelector } from "react-redux";

const PeerChatItem = ({ date, sender, text }) => {
  const themeMode = useSelector((state) => state.theme.themeMode);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          paddingVertical: 10,
          borderRadius: 12,
          backgroundColor: themeMode == "dark" ? "black" : "white",
        }}
      >
        <Image
          source={{
            uri: "https://avatars.dicebear.com/api/personas/" + sender + ".png",
          }}
          style={styles.peerChatImage}
        />
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: themeMode == "dark" ? COLORS.white : COLORS.black,
                marginRight: 6,
              }}
            >
              {sender}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: themeMode == "dark" ? COLORS.white50 : COLORS.black50,
              }}
            >
              {moment(date).fromNow()}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 15,
              color: themeMode == "dark" ? COLORS.white85 : COLORS.black85,
            }}
          >
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PeerChatItem;
