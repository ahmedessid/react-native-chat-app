import { View, Text, Image } from "react-native";
import React from "react";
import styles from "../styles";

const ChatPeerInfos = ({ url, fullName, isOnline }) => {
  return (
    <View style={styles.peerInfos}>
      <View>
        <Image
          source={{
            uri: url,
          }}
          style={styles.userProfileImage}
        />
        {isOnline && <View style={styles.onlineItem}></View>}
      </View>
      <View>
        <Text style={styles.peerFullName} numberOfLines={1}>
          {fullName}
        </Text>
        <Text style={styles.isOnlineText}>{isOnline ? "Online" : "Offline"}</Text>
      </View>
    </View>
  );
};

export default ChatPeerInfos;
