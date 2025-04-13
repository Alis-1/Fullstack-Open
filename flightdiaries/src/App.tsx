import React, { useState, useEffect } from 'react';
import { DiaryEntry, NewDiaryEntry } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries()
      .then(data => setDiaries(data))
      .catch(error => {
        console.error('Error fetching diaries:', error);
        setError('Failed to fetch diaries');
      });
  }, []);

  const handleSubmit = async (entry: NewDiaryEntry) => {
    try {
      const newDiary = await createDiary(entry);
      setDiaries(diaries.concat(newDiary));
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h1>Flight diaries</h1>
      <DiaryForm onSubmit={handleSubmit} error={error} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App; 