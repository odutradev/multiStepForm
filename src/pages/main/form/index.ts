import { step3 } from './steps/step3';
import { step2 } from './steps/step2';
import { step1 } from './steps/step1';

import type { FormConfig } from '@components/multiStepForm/types';

export const mockFormConfig: FormConfig = {
  steps: [step1, step2, step3]
};