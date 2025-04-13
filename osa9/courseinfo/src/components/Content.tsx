import React from 'react';
import { ContentProps } from '../types';
import Part from './Part';

const Content: React.FC<ContentProps> = (props) => {
  return (
    <div>
      {props.parts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content; 