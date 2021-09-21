import React, { useState } from 'react';
import NumberCounter from './components/NumberCounter';
import styles from './styles.module.css';

const BarbellPlateCalculator = () => {
  const [targetWeight, setTargetWeight] = useState('135.0');
  const [barWeight, setBarWeight] = useState('45.0');

  // @ts-expect-error
  const { plates, warning } = getPlates(parseFloat(targetWeight), parseFloat(barWeight));

  return (
    <div className={styles.app}>
      <h1>Barbell Racking Calculator</h1>

      <div className={styles.inputContainer}>
        <NumberCounter label="Target Weight" value={targetWeight} setValue={setTargetWeight} />
        <NumberCounter label="Bar Weight" value={barWeight} setValue={setBarWeight} />
      </div>
      {warning}
      {Object.keys(plates).map((weight) => {
        const numberOfPlates = plates[weight];

        if (numberOfPlates === 0) {
          return null;
        }

        return (
          <div key={weight}>
            {weight}: {plates[weight]}
          </div>
        );
      })}
    </div>
  );
};

export default BarbellPlateCalculator;

const AVAILABLE_PLATES: { [key: string]: number } = {
  '2.5': 2.5,
  '5.0': 5.0,
  '10.0': 10.0,
  '25.0': 25.0,
  '35.0': 35.0,
  '45.0': 45.0,
};

type GetPlatesWarningType = 'TargetWeightLessThanBar' | 'ExactTargetWeightNotPossible';

function getPlates(
  targetWeight: number,
  barbellWeight: number
): {
  // @ts-expect-error
  plates: { [key: string]: number; warning?: GetPlatesWarningType };
} {
  let warning: GetPlatesWarningType | undefined = undefined;
  let neededPlates: { [key: string]: number } = Object.keys(AVAILABLE_PLATES).reduce(
    (acc, curr) => {
      return { ...acc, [curr.toString()]: 0 };
    },
    {}
  );

  if (targetWeight <= barbellWeight) {
    console.log('lifting the empty bar is enough for that weight');
    warning = 'TargetWeightLessThanBar';
  }

  let weightPerSide = (targetWeight - barbellWeight) / 2;

  if (weightPerSide % AVAILABLE_PLATES['2.5'] !== 0) {
    console.log("The requested weight can't be exactly loaded with the standard weight plates");
    warning = 'ExactTargetWeightNotPossible';
  }

  while (weightPerSide >= AVAILABLE_PLATES['2.5']) {
    if (weightPerSide >= AVAILABLE_PLATES['45.0']) {
      neededPlates['45.0'] += 1;
      weightPerSide -= AVAILABLE_PLATES['45.0'];
    } else if (weightPerSide >= AVAILABLE_PLATES['35.0']) {
      neededPlates['35.0'] += 1;
      weightPerSide -= AVAILABLE_PLATES['35.0'];
    } else if (weightPerSide >= AVAILABLE_PLATES['25.0']) {
      neededPlates['25.0'] += 1;
      weightPerSide -= AVAILABLE_PLATES['25.0'];
    } else if (weightPerSide >= AVAILABLE_PLATES['10.0']) {
      neededPlates['10.0'] += 1;
      weightPerSide -= AVAILABLE_PLATES['10.0'];
    } else if (weightPerSide >= AVAILABLE_PLATES['5.0']) {
      neededPlates['5.0'] += 1;
      weightPerSide -= AVAILABLE_PLATES['5.0'];
    } else if (weightPerSide >= AVAILABLE_PLATES['2.5']) {
      neededPlates['2.5'] += 1;
      weightPerSide -= AVAILABLE_PLATES['2.5'];
    }
  }

  // @ts-expect-error
  return { plates: neededPlates, warning };
}