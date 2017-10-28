import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ButtonToNextScene from './ButtonToNextScene';

const styles = StyleSheet.create({
  header: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
});

const MiddleText = ({ text, nextScene, previousScene, noPrevious, onPress }) => {
  const previous = noPrevious ? undefined : previousScene;
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>
          {text}
        </Text>
        {(previous || nextScene) &&
          <ButtonToNextScene
            nextScene={nextScene}
            previousScene={previous}
            onPress={onPress}
          />
        }
      </View>

    </ScrollView>
  );
};

export default MiddleText;
