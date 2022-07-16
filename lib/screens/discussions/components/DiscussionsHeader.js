import { View, Text, Image } from "react-native";
import React from "react";
import styles from "../styles";

const DiscussionsHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerImage}>
        <Image
          source={{
            uri: "https://www.anlixtutoring.co.bw/public/files/users/full/b52e290c_free-profile-photo-whatsapp-4.png",
          }}
          style={styles.myProfileImage}
        />
        <View style={styles.profileNotifications}>
          <Text style={styles.profileNotificationsText}>3</Text>
        </View>
      </View>
      <Text style={styles.discussionsText}>Discussions</Text>
    </View>
  );
};

export default DiscussionsHeader;
