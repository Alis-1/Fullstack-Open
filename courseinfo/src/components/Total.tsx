import React from 'react';
import { TotalProps } from '../types';

const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.total}</p>;
};

export default Total; 