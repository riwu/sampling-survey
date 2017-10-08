import React from 'react';
import ButtonToNextScene from './ButtonToNextScene';
import MiddleText from './MiddleText';

const MiddleTextWithNav = ({ nextScene, previousScene, text }) => (
  <MiddleText text={text}>
    <ButtonToNextScene nextScene={nextScene} previousScene={previousScene} />
  </MiddleText>
);

export default MiddleTextWithNav;
