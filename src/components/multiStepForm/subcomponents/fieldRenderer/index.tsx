import { TextField, MenuItem, FormControl, InputLabel, Select, FormHelperText, InputAdornment, IconButton } from '@mui/material';
import { Controller } from 'react-hook-form';
import * as MuiIcons from '@mui/icons-material';
import { IMaskInput } from 'react-imask';
import { forwardRef, useState } from 'react';

import { FieldsContainer, FieldWrapper, SubtitleText } from './styles';
import SearchModal from '../searchModal';

import type { FieldRendererProps, MaskedInputProps } from './types';
import type { InputBaseComponentProps } from '@mui/material';
import type { FormField } from '../../types';
import type { ElementType } from 'react';

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(({ onChange, maskPattern, name, ...other }, ref) => (
  <IMaskInput
    {...other}
    mask={maskPattern}
    inputRef={ref}
    prepareChar={(str) => str.toUpperCase()}
    onAccept={(value: string) => onChange({ target: { name, value } })}
    overwrite
  />
));

const FieldRenderer = ({ fields, control, context, gridColumns }: FieldRendererProps) => {
  const [activeSearchField, setActiveSearchField] = useState<FormField | null>(null);

  if (!fields?.length) return null;

  return (
    <>
      <FieldsContainer $columns={gridColumns}>
        {fields.map((field) => {
          if (field.type === 'subtitle') {
            return (
              <SubtitleText key={field.name} variant="subtitle1">
                {field.label}
              </SubtitleText>
            );
          }

          const SelectedIcon = field.icon ? MuiIcons[field.icon as keyof typeof MuiIcons] : null;

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
                      <FormControl fullWidth required={field.required} error={!!error} disabled={field.disabled}>
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
                      disabled={field.disabled}
                      value={value || ''}
                      onChange={onChange}
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                      InputProps={{
                        ...(field.readOnly && { readOnly: true }),
                        ...(field.mask && { inputComponent: MaskedInput as ElementType<InputBaseComponentProps> }),
                        ...((SelectedIcon || field.searchConfig) && {
                          endAdornment: (
                            <InputAdornment position="end">
                              {field.searchConfig ? (
                                <IconButton edge="end" onClick={() => setActiveSearchField(field)}>
                                  {SelectedIcon ? <SelectedIcon /> : <MuiIcons.Search />}
                                </IconButton>
                              ) : (
                                SelectedIcon && <SelectedIcon color="action" />
                              )}
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

      {activeSearchField?.searchConfig && (
        <SearchModal
          config={activeSearchField.searchConfig}
          context={context}
          onClose={() => setActiveSearchField(null)}
        />
      )}
    </>
  );
};

export default FieldRenderer;