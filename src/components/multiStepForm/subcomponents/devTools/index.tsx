import { Typography, Button } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';

import { DevToolsContainer, HeaderContainer, ButtonsContainer } from './styles';

import type { DevToolsProps } from './types';

const DevTools = ({ isOpen, steps, context }: DevToolsProps) => {
  if (!isOpen) return null;

  const stepsWithTests = steps.filter((step) => !!step.testData);

  if (!stepsWithTests.length) return null;

  const handleAutoFill = (data: Record<string, unknown>) => context.setMultipleValues(data, true);

  return (
    <DevToolsContainer>
      <HeaderContainer>
        <AutoAwesome color="warning" fontSize="small" />
        <Typography variant="subtitle2" color="warning.main">
          DevTools: Auto-Preenchimento de Teste
        </Typography>
      </HeaderContainer>
      <ButtonsContainer>
        {stepsWithTests.map((step) => (
          <Button
            key={`devtools-fill-${step.id}`}
            variant="outlined"
            color="warning"
            size="small"
            onClick={() => handleAutoFill(step.testData!)}
          >
            Preencher: {step.title}
          </Button>
        ))}
      </ButtonsContainer>
    </DevToolsContainer>
  );
};

export default DevTools;