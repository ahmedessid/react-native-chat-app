import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../styles";

const DiscussionsItem = ({ fullName, msg, isRead, isOnline,onClick }) => {
  return (
    <TouchableOpacity activeOpacity={.35} onPress= {onClick}>
      <View style={{flexDirection: "column", paddingVertical: 6}}>
      <View style={styles.discussionsItem}>
        <View>
          <Image
            source={{
              uri: "https://avatars.dicebear.com/api/personas/" + fullName + ".png",
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
      <View style={styles.lineItem}></View>
      </View>
    </TouchableOpacity>
  );
};

export default DiscussionsItem;
