import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "../styles";
import SettingsModal from "./SettingsModal";
import { useSelector } from "react-redux";
import { COLORS } from "../../../constants/colors";

const DiscussionsHeader = ({ navigation }) => {
  const themeMode = useSelector((state) => state.theme.themeMode);
  const [modalVisible, setModalVisible] = useState(false);
  const _LogoutIcon = "../../../../assets/icons/settings.png";

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: themeMode == "dark" ? COLORS.white4 : COLORS.black2,
        },
      ]}
    >
      <SettingsModal
        navigation={navigation}
        modalVisible={modalVisible}
        funcTodo={() => setModalVisible(!modalVisible)}
      />
      <View style={styles.logoutBtn}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.backBtn}>
            <Image style={styles.image} source={require(_LogoutIcon)} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.discussionContainer}>
        <View style={styles.headerImage}>
          <Image
            source={{
              uri:
                "https://avatars.dicebear.com/api/personas/" +
                "ahmed essid" +
                ".png",
            }}
            style={styles.myProfileImage}
          />
          <View style={styles.profileNotifications}>
            <Text style={styles.profileNotificationsText}>3</Text>
          </View>
        </View>
        <Text
          style={[
            styles.discussionsText,
            {
              color: themeMode == "dark" ? COLORS.white : COLORS.black65,
            },
          ]}
        >
          Discussions
        </Text>
      </View>
    </View>
  );
};

export default DiscussionsHeader;
