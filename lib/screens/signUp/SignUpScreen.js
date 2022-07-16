import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { COLORS } from "../../constants/colors";

const SignUpScreen = ({ navigation }) => {
  const _googleImage = "../../../assets/images/google_icon.png";
  const _fbImage = "../../../assets/images/fb_icon.png";
  const _userIcon = "../../../assets/images/user.png";
  const _emailIcon = "../../../assets/images/email.png";
  const _passwordIcon = "../../../assets/images/password.png";
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.BottomContainer}>
            <Text style={styles.title}>Create account,{"\n"}to Continue</Text>
            <View style={styles.inputText}>
              <Image width="24" height="24" source={require(_userIcon)} />
              <TextInput
                style={{ marginLeft: 14 }}
                onChangeText={() => Alert.alert("")}
                placeholder="Full Name"
                keyboardType="default"
                width="100%"
              />
            </View>
            <View style={styles.inputText}>
              <Image width="24" height="24" source={require(_emailIcon)} />
              <TextInput
                style={{ marginLeft: 14 }}
                onChangeText={() => Alert.alert("")}
                placeholder="Email address"
                keyboardType="email-address"
                width="100%"
              />
            </View>
            <View style={styles.inputText}>
              <Image width="24" height="24" source={require(_passwordIcon)} />
              <TextInput
                style={{ marginLeft: 14 }}
                onChangeText={() => Alert.alert("")}
                placeholder="Password"
                keyboardType="default"
                width="100%"
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => Alert.alert("")}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.circleBtns}>
              <TouchableOpacity
                onPress={() => Alert.alert("a")}
                activeOpacity={0.8}
                style={styles.roundButton}
              >
                <Image style={styles.image} source={require(_googleImage)} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Alert.alert("b")}
                activeOpacity={0.8}
                style={styles.roundButton}
              >
                <Image style={styles.image} source={require(_fbImage)} />
              </TouchableOpacity>
            </View>
            <Pressable onPress={() => navigation.navigate("SignIn")}>
              <Text style={styles.dontHaveAccountText}>
                Already have an account?{" "}
                <Text style={styles.registerText}>Sign In</Text>
              </Text>
            </Pressable>
          </View>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 55,
    marginVertical: 140,
  },
  image: {
    height: 165,
    resizeMode: "contain",
  },
  BottomContainer: {
    marginTop: 20,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputText: {
    flexDirection: "row",
    borderRadius: 10,
    height: 59,
    backgroundColor: COLORS.black3,
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.black,
    marginTop: 25,
    paddingVertical: 18,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  circleBtns: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
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
  dontHaveAccountText: {
    marginTop: 28,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    fontSize: 16,
    color: COLORS.black65,
  },
  registerText: {
    fontWeight: "bold",
    color: COLORS.black,
  },
});

export default SignUpScreen;
