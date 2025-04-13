import React, { useState } from 'react';
import { NewDiaryEntry } from '../types';

interface DiaryFormProps {
  onSubmit: (entry: NewDiaryEntry) => void;
  error: string | null;
}

const DiaryForm: React.FC<DiaryFormProps> = ({ onSubmit, error }) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      weather,
      visibility,
      comment: comment || undefined
    });
    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Weather:</label>
          <input
            type="text"
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>
        <div>
          <label>Visibility:</label>
          <input
            type="text"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div>
          <label>Comment:</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default DiaryForm; 