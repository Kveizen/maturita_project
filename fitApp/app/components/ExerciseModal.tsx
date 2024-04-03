import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ExerciseModalProps {
  exerciseName: string;
  totalReps: number;
  onClose: () => void;
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({ exerciseName, totalReps, onClose }) => {
  const [timer, setTimer] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [currentReps, setCurrentReps] = useState(0);

  useEffect(() => {
    // Start the timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.modalView}>
      <Text style={styles.exerciseName}>{exerciseName}</Text>
      <Text style={styles.timer}>Time: {timer} seconds</Text>
      <Text style={styles.reps}>Reps: {currentReps}/{totalReps}</Text>
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timer: {
    fontSize: 18,
    marginBottom: 10,
  },
  reps: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  // Add additional styles as needed
});

export default ExerciseModal;
