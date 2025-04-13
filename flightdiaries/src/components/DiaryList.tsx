import React from 'react';
import { DiaryEntry } from '../types';

interface DiaryListProps {
  diaries: DiaryEntry[];
}

const DiaryList: React.FC<DiaryListProps> = ({ diaries }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>weather: {diary.weather}</p>
          <p>visibility: {diary.visibility}</p>
          {diary.comment && <p>comment: {diary.comment}</p>}
        </div>
      ))}
    </div>
  );
};

export default DiaryList; 