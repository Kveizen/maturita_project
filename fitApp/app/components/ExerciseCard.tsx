import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ExerciseModal from './ExerciseModal'; // Assuming you have an ExerciseModal component

interface Exercise {
  id: string;
  name: string;
  totalReps: number;
  description: string;
}

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const [totalReps, setTotalReps] = useState(exercise.totalReps);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePlayPress = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.name}>{exercise.name}</Text>
        <TextInput
          style={styles.repsInput}
          keyboardType="numeric"
          value={totalReps.toString()}
          onChangeText={(text) => setTotalReps(Number(text))}
        />
        <Text style={styles.description}>{exercise.description}</Text>
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={handlePlayPress}>
    <Icon name="play" size={24} color="#007bff" />
  </TouchableOpacity>

  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}>
    <ExerciseModal
      exerciseName={exercise.name}
      totalReps={totalReps}
      onClose={() => setModalVisible(false)}
    />
  </Modal>
</View>
);
};

const styles = StyleSheet.create({
card: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
backgroundColor: 'white',
borderRadius: 8,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 2,
elevation: 3,
marginBottom: 16,
padding: 10,
},
content: {
flex: 1,
},
name: {
fontSize: 18,
fontWeight: 'bold',
},
repsInput: {
fontSize: 14,
color: 'grey',
marginTop: 4,
marginBottom: 4,
borderColor: 'grey',
borderWidth: 1,
borderRadius: 5,
padding: 8,
},
description: {
fontSize: 14,
color: 'grey',
marginTop: 4,
},
iconContainer: {
padding: 10,
},
});

export default ExerciseCard;