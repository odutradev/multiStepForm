import { TextField, MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';

import { maskValue } from '@utils/functions/mask';
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
          rules={{ 
            required: field.required ? 'Campo obrigatório' : false,
            pattern: field.validation ? { 
              value: new RegExp(field.validation.pattern), 
              message: field.validation.message 
            } : undefined
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              const maskedValue = maskValue(e.target.value, field.mask);
              onChange(maskedValue);
            };

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
                  {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
              );
            }

            return (
              <TextField
                type={field.type}
                label={field.label}
                required={field.required}
                value={value}
                onChange={handleChange}
                error={!!error}
                helperText={error?.message}
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