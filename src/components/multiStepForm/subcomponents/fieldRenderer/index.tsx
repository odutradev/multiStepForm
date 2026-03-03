import { TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Controller } from 'react-hook-form';

import { FieldsContainer } from './styles';

import type { FieldRendererProps } from './types';

const FieldRenderer = ({ fields, control }: FieldRendererProps) => {
  if (!fields?.length) return null;

  return (
    <FieldsContainer>
      {fields.map((field) => (
        <Controller
          key={field.name}
          name={field.name}
          control={control}
          rules={{ required: field.required }}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            if (field.type === 'select') {
              return (
                <FormControl fullWidth required={field.required} error={!!error}>
                  <InputLabel>{field.label}</InputLabel>
                  <Select value={value} label={field.label} onChange={onChange}>
                    {field.options?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }

            return (
              <TextField
                type={field.type}
                label={field.label}
                required={field.required}
                value={value}
                onChange={onChange}
                error={!!error}
                fullWidth
              />
            );
          }}
        />
      ))}
    </FieldsContainer>
  );
};

export default FieldRenderer;