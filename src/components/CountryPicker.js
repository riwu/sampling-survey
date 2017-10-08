import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import ButtonToNextScene from './ButtonToNextSceneContainer';
import Button from './Button';

const styles = StyleSheet.create({
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  text: {
    color: 'white',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'lightblue',
    width: 130,
  },
  buttonContainer: {
    alignItems: 'center',
  },
});

class CountryPickerComponent extends React.Component {
  componentWillMount() {
    this.props.onChange({ cca2: 'SG' });
  }
  render() {
    return (
      <View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} text="Pick my country" onPress={() => this.ref.openModal()} />
        </View>
        <View style={styles.countryPicker}>
          <Text style={styles.text}>Currently selected:</Text>
          <CountryPicker
            ref={(ref) => { this.ref = ref; }}
            closeable
            filterable
            filterPlaceholder="Search"
            {...this.props}
          />
          <Text style={styles.text}>{this.props.cca2}</Text>
        </View>
        <ButtonToNextScene {...this.props} />
      </View>
    );
  }
}

export default CountryPickerComponent;
