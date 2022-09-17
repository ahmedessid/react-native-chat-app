import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../styles";
import { useSelector } from "react-redux";
import { COLORS } from "../../../constants/colors";
import { doc, onSnapshot } from "firebase/firestore";
import { useLayoutEffect } from "react";
import { firestore } from "../../../../core/firebase";
import { useState } from "react";
import moment from "moment";

const DiscussionsItem = ({ email, fullName, onClick }) => {
  const themeMode = useSelector((state) => state.theme.themeMode);
  const [peerIsOnline, setPeerIsOnline] = useState(null);
  const [lastestMessage, setLastestMessage] = useState(null);
  const [lastestMessageTime, setLastestMessageTime] = useState(null);
  const emptyLastestMessage = "Write your first Message..";

  useLayoutEffect(() => {
    const unsubscribeIsOnline = onSnapshot(
      doc(firestore, "chatUsers", email),
      (snapshot) => {
        setPeerIsOnline(snapshot.data().isOnline);
      }
    );
    const unsubscribeLastestMsg = onSnapshot(
      doc(firestore, "chatRooms", "ahmed.essid@gmail.com-" + email),
      (snapshot) => {
        if (snapshot.data() != null) {
          const lastestMessage = snapshot.data().lastestMessage;
          setLastestMessage(
            lastestMessage != null ? lastestMessage : emptyLastestMessage
          );
          setLastestMessageTime(snapshot.data().lastestMessageTime);
        } else {
          setLastestMessage(emptyLastestMessage);
        }
      }
    );
    return () => {
      unsubscribeIsOnline;
      unsubscribeLastestMsg;
    };
  }, []);

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
            {peerIsOnline && <View style={styles.onlineItem}></View>}
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
                {lastestMessageTime && moment(lastestMessageTime).fromNow()}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={[
                styles.msg,
                {
                  fontWeight:
                    lastestMessage != emptyLastestMessage ? "bold" : "normal",
                  color: themeMode == "dark" ? COLORS.white85 : COLORS.black85,
                },
              ]}
            >
              {lastestMessage}
            </Text>
          </View>
        </View>
        <View style={styles.lineItem}></View>
      </View>
    </TouchableOpacity>
  );
};

export default DiscussionsItem;
