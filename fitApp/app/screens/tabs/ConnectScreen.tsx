import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

function ConnectScreen() {
  const handleConnect = () => {
    // Logic for connect action
    console.log('Connect button pressed');
  };

  return (
    <View style={styles.container}>
      <Button title="Connect" onPress={handleConnect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConnectScreen;
