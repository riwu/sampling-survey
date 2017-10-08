import React from 'react';
import ButtonToNextScene from './ButtonToNextScene';
import MiddleText from './MiddleText';

const MiddleTextWithNav = ({ nextScene, previousScene, text, noPrevious }) => (
  <MiddleText text={text}>
    <ButtonToNextScene nextScene={nextScene} previousScene={noPrevious ? undefined : previousScene} />
  </MiddleText>
);

export default MiddleTextWithNav;
