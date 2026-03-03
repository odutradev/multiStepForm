import { TextField, MenuItem, FormControl, InputLabel, Select, FormHelperText, InputAdornment, Icon } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { forwardRef } from 'react';

import { FieldsContainer, FieldWrapper, SubtitleText } from './styles';

import type { InputBaseComponentProps } from '@mui/material';
import type { FieldRendererProps, MaskedInputProps } from './types';
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

const FieldRenderer = ({ fields, control, gridColumns }: FieldRendererProps) => {
  if (!fields?.length) return null;

  return (
    <FieldsContainer $columns={gridColumns}>
      {fields.map((field) => {
        if (field.type === 'subtitle') {
          return (
            <SubtitleText key={field.name} variant="subtitle1">
              {field.label}
            </SubtitleText>
          );
        }

        return (
          <FieldWrapper key={field.name} $colSpan={field.colSpan}>
            <Controller
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
                    InputProps={{
                      ...(field.readOnly && { readOnly: true }),
                      ...(field.mask && { inputComponent: MaskedInput as ElementType<InputBaseComponentProps> }),
                      ...(field.icon && {
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon color="action" style={{ cursor: 'pointer' }}>{field.icon}</Icon>
                          </InputAdornment>
                        )
                      })
                    }}
                    inputProps={field.mask ? { maskPattern: field.mask } : undefined}
                  />
                );
              }}
            />
          </FieldWrapper>
        );
      })}
    </FieldsContainer>
  );
};

export default FieldRenderer;