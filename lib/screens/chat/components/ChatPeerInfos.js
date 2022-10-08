import React from "react";
import { View, Text, Image } from "react-native";

import styles from "../styles";
import { COLORS } from "../../../constants/colors";

const ChatPeerInfos = ({ fullName, isOnline, themeMode }) => {
  const _peerAvatarPicture =
    "https://avatars.dicebear.com/api/personas/" + fullName + ".png";

  return (
    <View style={styles.peerInfos}>
      <View>
        <Image
          source={{
            uri: _peerAvatarPicture,
          }}
          style={styles.userProfileImage}
        />
        {isOnline && <View style={styles.onlineItem}></View>}
      </View>
      <View>
        <Text
          style={[
            styles.peerFullName,
            { color: themeMode == "dark" ? COLORS.white : COLORS.black },
          ]}
          numberOfLines={1}
        >
          {fullName}
        </Text>
        <Text
          style={[
            styles.isOnlineText,
            { color: themeMode == "dark" ? COLORS.white65 : COLORS.black65 },
          ]}
        >
          {isOnline ? "Online" : "Offline"}
        </Text>
      </View>
    </View>
  );
};

export default ChatPeerInfos;
