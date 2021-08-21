const calculateBmi = (height: number, weight: number): string => {
  // Because the height is used in cm units,
  // it is necessary to convert the units here, i.e., divide by 10000
  const bmi = weight / ((height * height) / 10000);

  if (bmi < 18.5) return `BMI: ${bmi.toFixed(2)} underweight`;
  if (bmi <= 24.9) return `BMI: ${bmi.toFixed(2)} normalweight`;
  if (bmi > 24.9) return `BMI ${bmi.toFixed(2)} overweight`;

  return 'Check your inputed argument again.';
};

// const height = Number(process.argv[2]);
// const weight = Number(process.argv[3]);

// try {
//   if (height && weight) {
//     console.log(calculateBmi(height, weight));
//   } else {
//     throw new Error('The number of arguments are not correct.');
//   }
// } catch (error) {
//   if (error instanceof Error) {
//     console.log(error.message);
//   }
// }

export default calculateBmi;
