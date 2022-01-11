type DailyExercises = number[];
type Goal = number;

interface InputData {
  exercises: DailyExercises;
  goal: Goal;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (exercises: DailyExercises, goal: Goal): Result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((item) => item !== 0).length;
  const average = exercises.reduce((prev, current) => prev + current, 0) / periodLength;
  const success = average > goal;
  const target = goal;

  // If average exercise - goal is greater than 0.5: rating 2, greater than 1: rating 3.
  let rating = 1;
  if (average - goal >= 0.5) rating = 2;
  if (average - goal >= 1) rating = 3;

  let ratingDescription = '';
  switch (rating) {
    case 1:
      ratingDescription = "Don't give up!";
      break;
    case 2:
      ratingDescription = 'Not too bad but could be better';
      break;
    case 3:
      ratingDescription = 'Fatastic! Keep going!';
      break;
    default:
      console.log('Error');
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

export const parseInputArguments = (args: string[]): InputData => {
  // The args[0] and args[1] are context value provided by node
  // So the real data starts from args[2]
  // Goal: args[2], Exercises: args.slice(3)

  const areNumbers = args.slice(2).filter((arg) => isNaN(Number(arg)));
  if (areNumbers.length > 0) throw new Error('Provided values are not numbers.');

  const arrayOfNumbers = args.map((item) => Number(item));
  const goal = arrayOfNumbers[2];
  const exercises = arrayOfNumbers.slice(3);

  return {
    goal,
    exercises,
  };
};

// try {
//   const data = parseInputArguments(process.argv);
//   const exerciseResult = calculateExercises(data.exercises, data.goal);
//   console.log(exerciseResult);
// } catch (error) {
//   let errorMessage = 'Something bad happened.';
//   if (error instanceof Error) {
//     errorMessage = `${errorMessage} ${error.message}`;
//   }
//   console.log(errorMessage);
// }
