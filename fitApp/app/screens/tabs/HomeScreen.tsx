import { StyleSheet, View, Text } from "react-native";
import StepsCounter from "../../components/StepsCounter";
import HeartRate from "../../components/HeartRate";
import WalkComponent from "../../components/WalkComponent";

function HomeScreen() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <WalkComponent/>
        </View>
        <View style={styles.box}>
          <StepsCounter/>
        </View>
        <View style={styles.box}>
          <HeartRate/>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1, // The container takes up the whole screen
    },
    box: {
        flex: 1, // Each box takes up 1/3 of the available space
        // You might want to add borders or background colors to differentiate the boxes
    },
});

export default HomeScreen;