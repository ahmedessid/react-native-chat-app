import {
  View,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import styles from "./styles";
import ChatPeerInfos from "./components/ChatPeerInfos";
import Dash from "react-native-dash";
import { COLORS } from "../../constants/colors";
import MyChatItem from "./components/MyChatItem";
import PeerChatItem from "./components/PeerChatItem";
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { firestore } from "../../../core/firebase";

const ChatScreen = ({ navigation }) => {
  const _BackIcon = "../../../assets/icons/left_arrow.png";
  const _SendImageIcon = "../../../assets/icons/image_icon.png";
  const _SendIcon = "../../../assets/icons/send_icon.png";
  const [chatList, setChatList] = useState([]);
  const [text, setText] = useState("");

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(
      collection(
        firestore,
        "chatRooms",
        "ahmed.essid@gmail.com-chamchoum@gmail.com",
        "chat"
      ),
      (snapshot) => {
        setChatList(
          snapshot.docs.map((docu) => ({
            createdAt: docu.data().createdAt,
            image: docu.data().image,
            sender: docu.data().sender,
            text: docu.data().text,
          }))
        );
      }
    );
    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    try {
      let now = Date();
      setText("");
      await addDoc(
        collection(
          firestore,
          "chatRooms",
          "ahmed.essid@gmail.com-chamchoum@gmail.com",
          "chat"
        ),
        {
          createdAt: now.toString(),
          image: "",
          sender: "Ahmed Essid",
          text: text,
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const renderItem = ({ item }) =>
    item.sender == "Ahmed Essid" ? (
      <MyChatItem sender={item.sender} text={item.text} date={item.createdAt} />
    ) : (
      <PeerChatItem
        sender={item.sender}
        text={item.text}
        date={item.createdAt}
      />
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 40,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backBtn}>
              <Image style={styles.image} source={require(_BackIcon)} />
            </View>
          </TouchableOpacity>
          <ChatPeerInfos fullName="Ahmed Ben Ali" isOnline={true} />
        </View>
        <Dash
          dashColor={COLORS.black6}
          dashGap={8}
          dashLength={8}
          style={styles.dashLine}
        />
        <View style={{ flex: 1, width: "100%" }}>
          <FlatList
            data={chatList.sort(
              (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
            )}
            renderItem={renderItem}
            onEndReachedThreshold={0}
            ListEmptyComponent={
              <View style={{ alignSelf: "center" }}>
                <ActivityIndicator size="large" />
              </View>
            }
            showsVerticalScrollIndicator={false}
            style={styles.flatChatList}
            inverted
            keyExtractor={(item) => item.createdAt}
          />
        </View>
        <View style={styles.sendMsgBar}>
          <TouchableOpacity onPress={() => Alert.alert("heey")}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require(_SendImageIcon)}
            ></Image>
          </TouchableOpacity>
          <View style={styles.inputText}>
            <TextInput
              value={text}
              onChangeText={(value) => setText(value)}
              placeholder="Your message..."
              width="100%"
            />
          </View>
          <TouchableOpacity onPress={sendMessage}>
            <Image
              style={{ width: 22, height: 19 }}
              source={require(_SendIcon)}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
