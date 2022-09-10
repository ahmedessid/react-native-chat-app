import { View } from "react-native";
import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import DiscussionsHeader from "./components/DiscussionsHeader";
import styles from "./styles";
import DiscussionsItem from "./components/DiscussionsItem";

const DiscussionsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <DiscussionsHeader navigation={navigation}/>
          <View style={styles.separation}></View>
          <View style={styles.discussionsBody}>
            <Text style={styles.lastMessagesTitle}>Last messages</Text>
            <DiscussionsItem
              fullName="Ahmed Ben Ali"
              msg="We was wondering, are you normal ?"
              isOnline={true}
              isRead={true}
              onClick={() => navigation.navigate("Chat")}
            />
            <DiscussionsItem
              fullName="Chamchoum"
              msg="How are you today? are you okay man?"
              isOnline={false}
              isRead={false}
            />
            <DiscussionsItem
              fullName="Walid Ben Ammar"
              msg="Awesome, how big is your team?"
              isOnline={false}
              isRead={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiscussionsScreen;
