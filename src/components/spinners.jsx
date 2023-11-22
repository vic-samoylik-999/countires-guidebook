import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const spinner = (
  <ThreeCircles
    height="100"
    width="100"
    color="#c5c5c5"
    visible={true}
    ariaLabel="three-circles-rotating"
  />
);

const littleSpinner = (
  <ThreeCircles
    height="32"
    width="302"
    color="#c5c5c5"
    visible={true}
    ariaLabel="three-circles-rotating"
  />
);

export { spinner, littleSpinner };
