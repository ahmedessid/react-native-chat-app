import {
  View,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import React from "react";
import styles from "./styles";
import ChatPeerInfos from "./components/ChatPeerInfos";
import Dash from "react-native-dash";
import { COLORS } from "../../constants/colors";
import MyChatItem from "./components/MyChatItem";
import PeerChatItem from "./components/PeerChatItem";

const ChatScreen = ({ navigation }) => {
  const _BackIcon = "../../../assets/icons/left_arrow.png";
  const _SendImageIcon = "../../../assets/icons/image_icon.png";
  const _SendIcon = "../../../assets/icons/send_icon.png";

  const ChatList = [
    {
      id: 1,
      createdAt: "1j",
      image: "",
      text: "Hi. Ahmed.",
      sender: "Chamchoum",
    },
    {
      id: 2,
      createdAt: "16:06",
      image: "",
      text: "Chamchoum. Good to meet you!",
      sender: "Ahmed Essid",
    },
    {
      id: 3,
      createdAt: "12:48",
      image: "",
      text: "Did you just arrive here?",
      sender: "Chamchoum",
    },
    {
      id: 4,
      createdAt: "12:44",
      image: "",
      text: "Yeah, We arrived last week.",
      sender: "Ahmed Essid",
    },
    {
      id: 5,
      createdAt: "12:42",
      image: "",
      text: "How do you like it? 😋",
      sender: "Chamchoum",
    },
    {
      id: 6,
      createdAt: "11:06",
      image: "",
      text: "It’s exciting! It’s much busier than the last city we lived in.",
      sender: "Ahmed Essid",
    },
  ];

  const renderItem = ({ item }) =>
    item.sender == "Ahmed Essid" ? (
      <MyChatItem sender={item.sender} text={item.text} date={item.createdAt} />
    ) : (
      <PeerChatItem
        sender={item.sender}
        text={item.text}
        date={item.createdAt}
        peerUrl={
          "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
        }
      />
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 55,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backBtn}>
              <Image style={styles.image} source={require(_BackIcon)} />
            </View>
          </TouchableOpacity>
          <ChatPeerInfos
            fullName="Ahmed Ben Ali"
            isOnline={true}
            url={
              "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            }
          />
        </View>
        <Dash
          dashColor={COLORS.black6}
          dashGap={8}
          dashLength={8}
          style={styles.dashLine}
        />
        <View style={{ flex: 1, width: "100%" }}>
          <FlatList
            data={ChatList.reverse()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={styles.flatChatList}
            inverted
            keyExtractor={(item) => item.id}
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
              onChangeText={() => null}
              placeholder="Your message..."
              width="100%"
            />
          </View>
          <TouchableOpacity onPress={() => Alert.alert("heey")}>
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
