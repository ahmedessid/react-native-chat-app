import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../styles";
import { useSelector } from "react-redux";
import { COLORS } from "../../../constants/colors";

const DiscussionsItem = ({ fullName, msg, isRead, isOnline, onClick }) => {
  const themeMode = useSelector((state) => state.theme.themeMode);
  return (
    <TouchableOpacity activeOpacity={0.35} onPress={onClick}>
      <View style={{ flexDirection: "column", paddingVertical: 6 }}>
        <View style={styles.discussionsItem}>
          <View>
            <Image
              source={{
                uri:
                  "https://avatars.dicebear.com/api/personas/" +
                  fullName +
                  ".png",
              }}
              style={styles.userProfileImage}
            />
            {isOnline && <View style={styles.onlineItem}></View>}
          </View>
          <View style={{ width: "80%", paddingLeft: 14 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  styles.userFullName,
                  { color: themeMode == "dark" ? "white" : "black" },
                ]}
                numberOfLines={1}
              >
                {fullName}
              </Text>
              <Text
                style={[
                  styles.msgTime,
                  {
                    color:
                      themeMode == "dark" ? COLORS.white50 : COLORS.black50,
                  },
                ]}
              >
                10:18
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={[
                styles.msg,
                isRead && { fontWeight: "bold" },
                {
                  color: themeMode == "dark" ? COLORS.white85 : COLORS.black85,
                },
              ]}
            >
              You: {msg}
            </Text>
          </View>
        </View>
        <View style={styles.lineItem}></View>
      </View>
    </TouchableOpacity>
  );
};

export default DiscussionsItem;
