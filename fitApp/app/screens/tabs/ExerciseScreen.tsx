import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { onSnapshot, collection, getFirestore } from 'firebase/firestore';
import ExerciseCard from '../../components/ExerciseCard'; // Make sure ExerciseCard is adapted for React Native

const db = getFirestore();

interface Exercise {
    id: any;
    name: string;
    totalReps: number;
    description: string;
}

const ExerciseScreen = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    // Reference to the exercises collection
    const exercisesRef = collection(db, 'default_exercises');

    // Fetch and listen for updates to exercises
    const unsubscribe = onSnapshot(exercisesRef, (snapshot) => {
        const exercisesData = snapshot.docs.map(doc => {
          const data = doc.data() as Exercise;
          return {
            ...data,
            docId: doc.id,
          };
        });
        setExercises(exercisesData);
      });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
        <ScrollView style={styles.container}>
        {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={() => {/* Handle button press */}}>
            <Text>Create own plan</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#A9A9A9',
    padding: 10,
    marginTop: 10,
  },
});

export default ExerciseScreen;
