import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button, Switch } from 'react-native';
import { getFirestore, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { commonStyles } from '../../styles/commonStyles';


const db = getFirestore();
const auth = FIREBASE_AUTH

const StepsCounter: React.FC = () => {
  // State to manage step count and goals
  const [currentSteps, setCurrentSteps] = useState<number>(0); // Mock current steps
  const [totalSteps, setTotalSteps] = useState<number>(0); // Goal from Firestore
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newStepGoal, setNewStepGoal] = useState<string>('0');
  const [resetCurrentSteps, setResetCurrentSteps] = useState<boolean>(false);

  useEffect(() => {
    // Ensure the user is fetched each time in case of changes
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    if (userId) {
      const stepsDocRef = doc(db, "users", userId, "stepsData", "singleDoc");
      
      // Fetch and listen for updates to steps goal
      const unsubscribe = onSnapshot(stepsDocRef, (doc) => {
        const data = doc.data();
        if (data && data.totalSteps && data.currentSteps) {
          setTotalSteps(data.totalSteps);
          setCurrentSteps(data.currentSteps);
          setNewStepGoal(data.totalSteps.toString());
        }
      });

      // Clean up listener on unmount
      return () => unsubscribe();
    }
  }, [auth.currentUser]); // Re-run if currentUser changes

  const updateStepGoal = async () => {
    const newGoal = parseInt(newStepGoal, 10);
    if (!isNaN(newGoal) && newGoal > 0 && auth.currentUser) {
      const user = auth.currentUser;
      const userId = user.uid;

      const stepsDocRef = doc(db, "users", userId, "stepsData", "singleDoc");
      const updatedData: any = { totalSteps: newGoal };

      // If the reset switch is active, set currentSteps to 0 in Firestore
      if (resetCurrentSteps) {
        updatedData.currentSteps = 0;
      }

      await updateDoc(stepsDocRef, updatedData);
      setTotalSteps(newGoal);
      // Optionally reset the local currentSteps if the switch is active
      if (resetCurrentSteps) setCurrentSteps(0);
    }
    // Reset the switch and close the modal
    setResetCurrentSteps(false);
    setModalVisible(false);
  };

  return (
    <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
            <Text style={styles.emojiText}>👟</Text>
            <Text style={styles.text}>{currentSteps} / {totalSteps}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Set Goal</Text>
            </TouchableOpacity>
        </View>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
        >
        <View style={commonStyles.modalContainer}>
            <View style={commonStyles.modalView}>
            <TextInput
                style={styles.text}
                value={newStepGoal}
                onChangeText={setNewStepGoal}
                keyboardType="numeric"
            />
            <View style={styles.switchContainer}>
                <Text>Reset Current Steps:</Text>
                <Switch
                    value={resetCurrentSteps}
                    onValueChange={setResetCurrentSteps}
                />
            </View>
            <TouchableOpacity style={commonStyles.closeButton} onPress={updateStepGoal}>
                <Text style={commonStyles.closeButtonText}>Update Goal</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>

    </View>
  );
};

// Add your styles here
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      contentContainer: {
        height: '33%', // 1/3 of the screen
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%' // Takes full width to center content horizontally
      },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center', // Ensure text is centered
      },
      emojiText: {
        fontSize: 48, // Make emoji larger
        textAlign: 'center', // Center emoji above the text
        marginBottom: 10, // Space between emoji and text
      },
      button: {
        backgroundColor: '#A9A9A9',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginBottom: 20,
      },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
},
});

export default StepsCounter;