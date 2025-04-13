function calculateBmi(height: number, weight: number): string {
    const bmi = weight / ((height / 100) ** 2);
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal range';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }
  
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  
  if (!height || !weight) {
    console.log('Please provide valid height and weight');
  } else {
    console.log(calculateBmi(height, weight));
  }
  