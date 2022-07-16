import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../styles";

const DiscussionsItem = ({ fullName, url, msg, isRead, isOnline,onClick }) => {
  return (
    <TouchableOpacity activeOpacity={.35} onPress= {onClick}>
      <View style={styles.discussionsItem}>
        <View>
          <Image
            source={{
              uri: url,
            }}
            style={styles.userProfileImage}
          />
          {isOnline && <View style={styles.onlineItem}></View>}
        </View>
        <View style={{ width: "80%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.userFullName} numberOfLines={1}>
              {fullName}
            </Text>
            <Text style={styles.msgTime}>10:18</Text>
          </View>
          <Text
            numberOfLines={1}
            style={[styles.msg, isRead && { fontWeight: "bold" }]}
          >
            You: {msg}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DiscussionsItem;
