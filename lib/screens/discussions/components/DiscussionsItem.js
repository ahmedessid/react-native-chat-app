import React, { useState, useLayoutEffect, useMemo } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import moment from "moment";

import styles from "../styles";

import { COLORS } from "../../../constants/colors";
import { firestore } from "../../../../core/firebase";
import { selectUser } from "../../../redux/slices/userSlice";

const DiscussionsItem = ({ email, fullName, onClick }) => {
  const themeMode = useSelector((state) => state.theme.themeMode);
  const user = useSelector(selectUser);

  const [peerIsOnline, setPeerIsOnline] = useState(null);
  const [lastestMessage, setLastestMessage] = useState(null);
  const [lastestMessageTime, setLastestMessageTime] = useState(null);
  const [document, setDocument] = useState(user.email + "-" + email);
  const _emptyLastestMessage = "Write your first Message..";
  const _userAvatarPicture =
    "https://avatars.dicebear.com/api/personas/" + fullName + ".png";

  const getDocument = async () => {
    const docRef = doc(firestore, "chatRooms", email + "-" + user.email);
    const docSnap = await getDoc(docRef);

    setDocument(
      docSnap.exists() ? email + "-" + user.email : user.email + "-" + email
    );
    console.log("document:" + document);
  };

  const getDocumentMemo = useMemo(() => getDocument(), []);

  useLayoutEffect(() => {
    let unsubIsOnline, unsubLastestMsg;
    let mounted = true;

    unsubIsOnline = onSnapshot(
      doc(firestore, "chatUsers", email),
      (snapshot) => {
        setPeerIsOnline(snapshot.data().isOnline);
      }
    );

    unsubLastestMsg = onSnapshot(
      doc(firestore, "chatRooms", document),
      (snapshot) => {
        if (mounted) {
          if (snapshot.data() != null) {
            const lastestMessage = snapshot.data().lastestMessage;
            setLastestMessage(
              lastestMessage != null ? lastestMessage : _emptyLastestMessage
            );
            setLastestMessageTime(snapshot.data().lastestMessageTime);
          } else {
            setLastestMessage(_emptyLastestMessage);
          }
        }
      }
    );

    getDocumentMemo;
    unsubIsOnline;
    unsubLastestMsg;

    return () => {
      mounted = false;
    };
  }, [document]);

  return (
    <TouchableOpacity activeOpacity={0.35} onPress={onClick}>
      <View style={{ flexDirection: "column", paddingVertical: 6 }}>
        <View style={styles.discussionsItem}>
          <View>
            <Image
              source={{
                uri: _userAvatarPicture,
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
                {lastestMessageTime &&
                  moment(new Date(lastestMessageTime)).fromNow()}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={[
                styles.msg,
                {
                  fontWeight:
                    lastestMessage != _emptyLastestMessage ? "bold" : "normal",
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
