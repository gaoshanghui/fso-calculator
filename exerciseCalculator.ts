interface exercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exercisesHours: number[],
  targetHour: number
): exercisesResult => {
  const weekAmountExerciseHours = exercisesHours.reduce((result, hour) => {
    return result + hour;
  }, 0);
  const numberOfDays = exercisesHours.length;
  const trainingDays = exercisesHours.filter((hour) => hour > 0).length;
  const averageHour = weekAmountExerciseHours / numberOfDays;
  const success = averageHour >= targetHour;
  const description = success ? 'Good job!' : 'not too bad but could be better';
  const rating = averageHour > 1 ? 2 : 1;

  return {
    periodLength: numberOfDays,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: description,
    target: targetHour,
    average: averageHour,
  };
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

// In the command line, the first argument it the target value.
// The rest of the values will be converted into an array, as the week exercises hours.
const targetHour = Number(process.argv[2]);
const exercisesHoursString = process.argv.slice(3, process.argv.length);
const exercisesHours = exercisesHoursString.map((item) => Number(item));

try {
  const argumentTests = exercisesHours.filter((hour) => isNaN(hour));
  if (argumentTests.length === 0) {
    console.log('exercisesHours:', exercisesHours);
    console.log(calculateExercises(exercisesHours, targetHour));
  } else {
    throw new Error('arguments should be a number');
  }
} catch (error) {
  console.log(error.message);
}
