import { AutoAwesome, BugReport, DeleteSweep, DataObject } from '@mui/icons-material';
import { Typography, Button, Collapse } from '@mui/material';
import { useState } from 'react';

import { DevToolsContainer, HeaderContainer, ButtonsContainer, StateViewerContainer, SectionTitle } from './styles';

import type { DevToolsProps } from './types';

const DevTools = ({ isOpen, steps, context }: DevToolsProps) => {
  const [showState, setShowState] = useState(false);

  if (!isOpen) return null;

  const stepsWithTests = steps.filter((step) => !!step.testData);

  const handleAutoFill = (data: Record<string, unknown>) => context.setMultipleValues(data, true);

  const handleFillAll = () => {
    const allData = stepsWithTests.reduce((acc, step) => ({ ...acc, ...step.testData }), {});
    context.setMultipleValues(allData, true);
  };

  const handleClearAll = () => {
    const currentData = context.getValues();
    const emptyData = Object.keys(currentData).reduce((acc, key) => ({ ...acc, [key]: '' }), {});
    context.setMultipleValues(emptyData, true);
  };

  return (
    <DevToolsContainer>
      <HeaderContainer>
        <BugReport color="error" fontSize="small" />
        <Typography variant="subtitle2" color="error.main">
          DevTools Mode
        </Typography>
      </HeaderContainer>

      <SectionTitle variant="caption">Ações Globais</SectionTitle>
      <ButtonsContainer>
        <Button variant="outlined" color="error" size="small" startIcon={<DeleteSweep />} onClick={handleClearAll}>
          Limpar Tudo
        </Button>
        {stepsWithTests.length > 1 && (
          <Button variant="contained" color="warning" size="small" startIcon={<AutoAwesome />} onClick={handleFillAll}>
            Preencher Todos os Steps
          </Button>
        )}
      </ButtonsContainer>

      {stepsWithTests.length > 0 && (
        <>
          <SectionTitle variant="caption">Preenchimento Individual</SectionTitle>
          <ButtonsContainer>
            {stepsWithTests.map((step) => (
              <Button key={`devtools-fill-${step.id}`} variant="outlined" color="warning" size="small" onClick={() => handleAutoFill(step.testData!)}>
                {step.title}
              </Button>
            ))}
          </ButtonsContainer>
        </>
      )}

      <SectionTitle variant="caption">Inspecionar</SectionTitle>
      <ButtonsContainer>
        <Button variant="outlined" color="info" size="small" startIcon={<DataObject />} onClick={() => setShowState(!showState)}>
          {showState ? 'Ocultar Estado' : 'Ver Estado Atual (JSON)'}
        </Button>
      </ButtonsContainer>

      <Collapse in={showState}>
        <StateViewerContainer>
          <pre>{JSON.stringify(context.data, null, 2)}</pre>
        </StateViewerContainer>
      </Collapse>
    </DevToolsContainer>
  );
};

export default DevTools;