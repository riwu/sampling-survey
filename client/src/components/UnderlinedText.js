import React from 'react';
import { Text } from 'react-native';

const UnderlinedText = ({ children }) => (
  <Text style={{ textDecorationLine: 'underline' }}>
    {children}
  </Text>
);

export default UnderlinedText;
