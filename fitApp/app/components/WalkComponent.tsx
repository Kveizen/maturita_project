// WalkChallenge.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';

const WalkComponent: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [stepGoal, setStepGoal] = useState(0);

  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [stepsWalked, setStepsWalked] = useState(0);
  const [metersWalked, setMetersWalked] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval: any = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1); // Increment the timer every second
      }, 1000);
    } else if (!timerOn && timer !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const formatTime = (timer: number) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${parseInt(minutes) % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const handleInputChange = (text: string) => {
    const number = parseInt(text, 10); // Convert the text input to a number
    if (!isNaN(number)) { // Check if the conversion is successful (i.e., the input is a valid number)
      setStepGoal(number);
    } else {
      setStepGoal(0); // Optionally reset the state or handle invalid input as needed
    }
  };
  

  // Function to handle setting the step goal
  const handleSetGoal = () => {
    setModalVisible(false);
    setTimer(0);
    setTimerOn(true);
    setGoalModalVisible(true);
    // Additional logic to start tracking steps and time
  };

  const handleDone = () => {
    setGoalModalVisible(false);
    setTimerOn(false);
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.walkButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.walkEmoji}>🚶‍♂️</Text>
        <Text style={styles.labelText}>Go for a walk!</Text>
      </TouchableOpacity>

      {/* Modal for setting the goal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text>Set your step goal:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleInputChange}
              value={stepGoal.toString()}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleSetGoal}
            >
              <Text>Set Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Second Modal for showing goal progress */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={goalModalVisible}
        onRequestClose={() => {
          setGoalModalVisible(!goalModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text>Timer: {formatTime(timer)}</Text>
            <Text>Steps: {stepsWalked}/{stepGoal}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleDone}
            >
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Add styles for WalkChallenge, similar to the HeartRate styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      },
      walkButton: {
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
      },
      walkEmoji: {
        fontSize: 48,
        marginBottom: 10, // Spacing between emoji and text
      },
      labelText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for modal
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200,
      },
      button: {
        backgroundColor: '#2196F3', // Blue color for the button
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
      },
    });

export default WalkComponent;
