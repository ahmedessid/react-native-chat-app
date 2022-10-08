import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { getDownloadURL, ref } from "firebase/storage";

import { storage } from "../../../../core/firebase";
import { COLORS } from "../../../constants/colors";

import styles from "../styles";

const MyChatItem = ({ date, sender, text, image }) => {
  const [urlImage, seturlImage] = useState();

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
    <View style={{ alignItems: "flex-end" }}>
      <LinearGradient
        colors={[COLORS.chatItemLeftColor, COLORS.chatItemRightColor]}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={{
          marginVertical: 10,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 12,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              color: COLORS.white,
              marginRight: 6,
            }}
          >
            {sender}
          </Text>
          <Text style={{ fontSize: 12, color: COLORS.white50 }}>
            {moment(new Date(date)).fromNow()}
          </Text>
        </View>
        {image == "" ? (
          <Text style={{ fontSize: 15, color: COLORS.white85 }}>{text}</Text>
        ) : (
          <Image
            style={styles.itemMessageImage}
            source={{
              uri: urlImage,
            }}
          />
        )}
      </LinearGradient>
    </View>
  );
};

export default MyChatItem;
