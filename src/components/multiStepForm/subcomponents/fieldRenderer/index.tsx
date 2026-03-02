import { TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

import { FieldsContainer } from './styles';

import type { FieldRendererProps } from './types';

const FieldRenderer = ({ fields, formData, onChange }: FieldRendererProps) => {
  if (!fields?.length) return null;

  return (
    <FieldsContainer>
      {fields.map((field) => {
        const value = (formData[field.name] as string) || '';

        if (field.type === 'select') {
          return (
            <FormControl key={field.name} fullWidth required={field.required}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                value={value}
                label={field.label}
                onChange={(e) => onChange(field.name, e.target.value)}
              >
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
            key={field.name}
            type={field.type}
            label={field.label}
            required={field.required}
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            fullWidth
          />
        );
      })}
    </FieldsContainer>
  );
};

export default FieldRenderer;