interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }
  
  export const calculateExercises = (dailyHours: number[], target: number): Result => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(day => day > 0).length;
    const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
    let rating = 1;
    let ratingDescription = 'bad';
  
    if (average >= target) {
      rating = 3;
      ratingDescription = 'good';
    } else if (average >= target * 0.75) {
      rating = 2;
      ratingDescription = 'not too bad but could be better';
    }
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
  };
  
  if (require.main === module) {
    const target = Number(process.argv[2]);
    const dailyHours = process.argv.slice(3).map(Number);
  
    if (!target || dailyHours.some(isNaN)) {
      console.log('Please provide valid target and daily hours');
    } else {
      console.log(calculateExercises(dailyHours, target));
    }
  }
  