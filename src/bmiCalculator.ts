interface BodyData {
  height: number;
  weight: number;
}

export const calculateBmi = (body: BodyData): string => {
  // height: centimeter, weight: kilogram
  const bmi = body.weight / (body.height ** 2 / 10000);

  if (bmi < 18.5) return `BMI: ${bmi.toFixed(2)} (underweight)`;
  if (bmi <= 24.9) return `BMI: ${bmi.toFixed(2)} (normal weight)`;
  if (bmi > 24.9) return `BMI ${bmi.toFixed(2)} (overweight)`;

  return 'Something bad happened.';
};

export const parseArguments = (args: string[]): BodyData => {
  if (args.length < 4) throw new Error('Not enough arguments.');
  if (args.length > 4) throw new Error('Too many arguments.');

  // args[2]: height, args[3]: weight
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values are not numbers.');
  }
};

// Exercises 9.1 - 9.3

// try {
//   const bodyData = parseArguments(process.argv);
//   const bmi = calculateBmi(bodyData);
//   console.log(bmi);
// } catch (error) {
//   let errorMessage = 'Something bad happened.';
//   if (error instanceof Error) {
//     errorMessage = `${errorMessage} ${error.message}`;
//   }
//   console.log(errorMessage);
// }
