import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";
import { getDownloadURL, ref } from "firebase/storage";

import { storage } from "../../../../core/firebase";
import { COLORS } from "../../../constants/colors";
import styles from "../styles";

const PeerChatItem = ({ date, sender, text, image }) => {
  const themeMode = useSelector((state) => state.theme.themeMode);
  const [urlImage, seturlImage] = useState();
  const _peerAvatarPicture =
    "https://avatars.dicebear.com/api/personas/" + sender + ".png";

  useEffect(() => {
    if (image != "") {
      var imageRef = ref(storage, image);
      getDownloadURL(imageRef)
        .then((url) => {
          seturlImage(url);
        })
        .catch((e) => console.log("getting downloadURL of image error => ", e));
    }
  }, []);

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
            uri: _peerAvatarPicture,
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
              {moment(new Date(date)).fromNow()}
            </Text>
          </View>
          {image == "" ? (
            <Text
              style={{
                fontSize: 15,
                color: themeMode == "dark" ? COLORS.white85 : COLORS.black85,
              }}
            >
              {text}
            </Text>
          ) : (
            <Image
              style={styles.itemMessageImage}
              source={{
                uri: urlImage,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default PeerChatItem;
