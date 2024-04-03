// HeartRate.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { commonStyles } from '../../styles/commonStyles';

const HeartRate: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Clickable heart-shaped text */}
      <TouchableOpacity
        style={styles.heartButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.heartText}>❤️</Text>
        <Text style={styles.labelText}>Heart Rate</Text>
      </TouchableOpacity>

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
            <Text style={styles.heartRateText}>Heart Rate:</Text>
            <Text style={styles.bpmText}>100 BPM</Text>
            <TouchableOpacity
                style={commonStyles.closeButton}
                onPress={() => setModalVisible(false)}
            >
                <Text style={commonStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>

    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      heartButton: {
        alignItems: 'center', // Center the emoji and label
      },
      heartText: {
        fontSize: 48, // Adjust size as needed for the heart emoji
        color: 'red',
      },
      labelText: {
        fontSize: 18, // Adjust size as needed for the label
        color: 'black',
        fontWeight: 'bold',
      },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Semi-transparent background
  },
  modalView: {
    minWidth: '80%',
    maxWidth: '80%',
    minHeight: '25%',
    maxHeight: '25%',
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
  heartRateText: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 20,
    alignItems: "center"
  },
  bpmText: {
    fontSize: 30, // Larger font size for emphasis
    color: 'red', // Color for attention, adjust as needed
    fontWeight: 'bold', // Bold to make it stand out
    marginBottom: 20, // Space before the close button
  },
});

export default HeartRate;
