import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import TextInput from '../components/TextInput';
import ButtonToNextScene from '../components/ButtonToNextScene';
import { verifyAccess } from '../actions/api';

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  textInput: {
    width: 130,
    fontSize: 20,
    marginTop: 10,
  },
  text: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

class AccessCode extends React.Component {
  code = '';
  render() {
    const { props } = this;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Please enter the app access code provided in the instructions:
        </Text>
        <TextInput
          autoCapitalize="none"
          autoFocus
          style={styles.textInput}
          onChangeText={(text) => {
            this.code = text;
          }}
        />
        <ButtonToNextScene
          nextScene={props.nextScene}
          previousScene={props.previousScene}
          onPress={() =>
            verifyAccess(this.code.trim()).catch((err) => {
              console.log('e', typeof err, err);
              if (((err || {}).response || {}).status === 401) {
                Alert.alert(`Access code '${this.code}' is wrong!`);
              } else {
                Alert.alert('Authentication failed', 'Make sure you have Internet connection.');
              }
              return true;
            })
          }
        />
      </View>
    );
  }
}

export default AccessCode;
