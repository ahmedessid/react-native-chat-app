import { View } from "react-native";
import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import DiscussionsHeader from "./components/DiscussionsHeader";
import styles from "./styles";
import DiscussionsItem from "./components/DiscussionsItem";

const DiscussionsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <DiscussionsHeader />
          <View style={styles.separation}></View>
          <View style={styles.discussionsBody}>
            <Text style={styles.lastMessagesTitle}>Last messages</Text>
            <DiscussionsItem
              fullName="Ahmed Ben Ali"
              msg="We was wondering, are you normal ?"
              isOnline={true}
              isRead={true}
              url={
                "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
              }
              onClick={()=>navigation.navigate("Chat")}
            />
            <DiscussionsItem
              fullName="Yosra Mathlouthi"
              msg="How are you today? are you okay man?"
              isOnline={false}
              isRead={false}
              url={
                "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
              }
            />
            <DiscussionsItem
              fullName="Walid Ben Ammar"
              msg="Awesome, how big is your team?"
              isOnline={false}
              isRead={false}
              url={
                "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiscussionsScreen;
