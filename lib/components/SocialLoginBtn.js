import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import { COLORS } from "../constants/colors";

const SocialLoginBtn = ({ socialName, socialImage }) => {
  const _socialToast = socialName + " login is not available now!";

  return (
    <TouchableOpacity
      onPress={() => ToastAndroid.show(_socialToast, ToastAndroid.SHORT)}
      activeOpacity={0.8}
      style={styles.roundButton}
    >
      <Image style={styles.image} source={socialImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    width: 58,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 100,
    backgroundColor: COLORS.black2,
    borderWidth: 0.8,
    borderColor: COLORS.black6,
  },
});

export default SocialLoginBtn;
