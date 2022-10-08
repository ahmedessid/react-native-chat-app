import React, { useLayoutEffect, useEffect, useState, useMemo } from "react";
import { View, TextInput, SafeAreaView, Image, FlatList } from "react-native";
import {
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { useSelector } from "react-redux";
import Dash from "react-native-dash";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { ref, uploadBytes } from "firebase/storage";
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import styles from "./styles";
import { firestore, storage } from "../../../core/firebase";
import { COLORS } from "../../constants/colors";
import { File } from "../../constants/strings";

import ChatPeerInfos from "./components/ChatPeerInfos";
import MyChatItem from "./components/MyChatItem";
import PeerChatItem from "./components/PeerChatItem";

import { selectUser } from "../../redux/slices/userSlice";

const ChatScreen = ({ navigation, route }) => {
  const themeMode = useSelector((state) => state.theme.themeMode);
  const user = useSelector(selectUser);
  const { peerEmail } = route.params;

  const _BackIcon = "../../../assets/icons/left_arrow.png";
  const _SendImageIcon = "../../../assets/icons/image_icon.png";
  const _SendIcon = "../../../assets/icons/send_icon.png";
  
  const [chatList, setChatList] = useState([]);
  const [text, setText] = useState("");
  const [peerFullName, setPeerFullName] = useState();
  const [peerIsOnline, setPeerIsOnline] = useState();
  const [image, setImage] = useState("");
  const [document, setDocument] = useState(user.email + "-" + peerEmail);

  const getFileInfo = async (fileURI) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI);
    return fileInfo;
  };

  const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
    const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB;
    return isOk;
  };

  useEffect(() => {
    image && sendMessage();
  }, [image]);

  const getDocument = async () => {
    const docRef = doc(firestore, "chatRooms", peerEmail + "-" + user.email);
    const docSnap = await getDoc(docRef);

    setDocument(
      docSnap.exists()
        ? peerEmail + "-" + user.email
        : user.email + "-" + peerEmail
    );
    console.log("document:" + document);
  };

  const getDocumentMemo = useMemo(() => getDocument(), []);

  useLayoutEffect(() => {
    let unsubIsOnline, unsubChatList;
    let mounted = true;

    unsubIsOnline = onSnapshot(
      doc(firestore, "chatUsers", peerEmail),
      (snapshot) => {
        if (mounted) {
          setPeerFullName(snapshot.data().fullName);
          setPeerIsOnline(snapshot.data().isOnline);
        }
      }
    );

    unsubChatList = onSnapshot(
      collection(firestore, "chatRooms", document, "chat"),
      (snapshot) => {
        if (mounted) {
          setChatList(
            snapshot.docs.map((docu) => ({
              createdAt: docu.data().createdAt,
              image: docu.data().image,
              sender: docu.data().sender,
              text: docu.data().text,
            }))
          );
        }
      }
    );

    getDocumentMemo;
    unsubIsOnline;
    unsubChatList;

    return () => {
      mounted = false;
    };
  }, [document]);

  const sendMessage = async () => {
    try {
      let now = Date();
      setText("");

      await addDoc(collection(firestore, "chatRooms", document, "chat"), {
        createdAt: now.toString(),
        image: image,
        sender: user.fullName,
        text: text,
      });
      await setDoc(
        doc(firestore, "chatRooms", document),
        {
          lastestMessage: image != "" ? image : text,
          lastestMessageTime: now.toString(),
        },
        { merge: true }
      );
      setImage("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      const { type } = result;

      const fileInfo = await getFileInfo(result.uri);

      if (!fileInfo?.size) {
        ToastAndroid.show(File.unknownSize, ToastAndroid.SHORT);
        return;
      }

      if (type === "image") {
        const isLt1MB = isLessThanTheMB(fileInfo.size, 1);
        if (!isLt1MB) {
          ToastAndroid.show(File.bigSize, ToastAndroid.SHORT);
          return;
        }
      }

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", result.uri, true);
        xhr.send(null);
      });
      const storageRef = ref(storage, `images/${result.uri.split("/").pop()}`);
      const imageUploaded = `/images/${result.uri.split("/").pop()}`.toString();
      await uploadBytes(storageRef, blob)
        .then(() => {
          console.log("Uploaded a blob or file!");
          setImage(imageUploaded);
          console.log("ahayaa3:" + image);
        })
        .catch((e) => console.log("errrrrrrror"));
    }
  };

  const renderItem = ({ item }) =>
    item.sender == user.fullName ? (
      <MyChatItem
        sender={item.sender}
        text={item.text}
        image={item.image}
        date={item.createdAt}
      />
    ) : (
      <PeerChatItem
        sender={item.sender}
        text={item.text}
        image={item.image}
        date={item.createdAt}
      />
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          { backgroundColor: themeMode == "dark" ? "black" : "white" },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 40,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={[
                styles.backBtn,
                {
                  backgroundColor:
                    themeMode == "dark" ? COLORS.white85 : COLORS.black3,
                },
              ]}
            >
              <Image style={styles.image} source={require(_BackIcon)} />
            </View>
          </TouchableOpacity>
          <ChatPeerInfos
            fullName={peerFullName}
            isOnline={peerIsOnline}
            themeMode={themeMode}
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
          <TouchableOpacity onPress={pickImage}>
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
