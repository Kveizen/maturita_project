import { Button, View } from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";


function ProfileScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Sign Out" onPress={() => FIREBASE_AUTH.signOut()}/>
      </View>
    );
  }
export default ProfileScreen;