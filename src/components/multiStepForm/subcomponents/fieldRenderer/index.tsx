import { TextField, MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { forwardRef } from 'react';

import { FieldsContainer, SubtitleText } from './styles';

import type { FieldRendererProps, MaskedInputProps } from './types';
import type { InputBaseComponentProps } from '@mui/material';
import type { ElementType } from 'react';

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>((props, ref) => {
  const { onChange, maskPattern, name, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask={maskPattern}
      inputRef={ref}
      onAccept={(value: string) => onChange({ target: { name, value } })}
      overwrite
    />
  );
});

const FieldRenderer = ({ fields, control }: FieldRendererProps) => {
  if (!fields?.length) return null;

  return (
    <FieldsContainer>
      {fields.map((field) => {
        if (field.type === 'subtitle') {
          return (
            <SubtitleText key={field.name} variant="subtitle1">
              {field.label}
            </SubtitleText>
          );
        }

        return (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            rules={{
              required: field.required ? 'Campo obrigatório' : false,
              pattern: field.validation ? { value: new RegExp(field.validation.pattern), message: field.validation.message } : undefined
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              if (field.type === 'select') {
                return (
                  <FormControl fullWidth required={field.required} error={!!error}>
                    <InputLabel>{field.label}</InputLabel>
                    <Select value={value || ''} label={field.label} onChange={onChange}>
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
                  value={value || ''}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message}
                  fullWidth
                  InputProps={field.mask ? { inputComponent: MaskedInput as ElementType<InputBaseComponentProps> } : undefined}
                  inputProps={field.mask ? { maskPattern: field.mask } : undefined}
                />
              );
            }}
          />
        );
      })}
    </FieldsContainer>
  );
};

export default FieldRenderer;