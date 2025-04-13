export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 24.9) {
    return 'Normal range';
  } else if (bmi < 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

if (require.main === module) {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);

  if (!height || !weight) {
    console.log('malformatted parameters');
  } else {
    console.log(calculateBmi(height, weight));
  }
}
