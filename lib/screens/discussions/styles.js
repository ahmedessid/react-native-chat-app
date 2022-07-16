import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 55,
    paddingTop: 100,
    paddingBottom: 50,
    backgroundColor: COLORS.black2,
    width: "100%",
  },
  myProfileImage: {
    width: 46,
    height: 46,
    borderRadius: 50,
    resizeMode: "cover",
    marginRight: 16,
  },
  discussionsText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  profileNotifications: {
    position: "absolute",
    top: -10,
    left: 30,
    height: 24,
    width: 24,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.white,
    backgroundColor: COLORS.pink,
    alignItems: "center",
    justifyContent: "center",
  },
  profileNotificationsText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.white,
  },
  separation: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.black6,
  },
  discussionsBody: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: 55,
    marginTop: 35,
  },
  lastMessagesTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.black65,
    marginBottom: 20,
  },
  discussionsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28
  },
  userProfileImage: {
    height: 60,
    width: 60,
    borderRadius: 75,
    marginRight: 16,
  },
  userFullName: {
    fontSize: 16,
    fontWeight: "600",
  },
  msgTime: {
    fontSize: 12,
    color: COLORS.black50,
  },
  msg: {
    color: COLORS.black85,
    flexShrink: 1
  },
  onlineItem: {
    position: "absolute",
    bottom:0,
    right:10,
    height:20,
    width:20,
    backgroundColor: COLORS.online,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: COLORS.white
  }
});
