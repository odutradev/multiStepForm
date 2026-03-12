import { TextField, MenuItem, FormControl, InputLabel, Select, FormHelperText, InputAdornment, IconButton, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as MuiIcons from '@mui/icons-material';
import { Controller } from 'react-hook-form';
import { forwardRef, useState } from 'react';
import { IMaskInput } from 'react-imask';
import dayjs from 'dayjs';

import { GroupsWrapper, GroupContainer, FieldsContainer, FieldWrapper, SubtitleText } from './styles';
import FormButton from './components/formButton';
import FormTable from './components/formTable';
import SearchModal from '../searchModal';

import type { ElementType, KeyboardEvent, MouseEvent } from 'react';
import type { FieldRendererProps, MaskedInputProps } from './types';
import type { InputBaseComponentProps } from '@mui/material';
import type { FormField } from '../../types';

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

const FieldRenderer = ({ groups, control, context }: FieldRendererProps) => {
  const [activeSearch, setActiveSearch] = useState<{ field: FormField; value?: string } | null>(null);

  if (!groups?.length) return null;

  return (
    <>
      <GroupsWrapper>
        {groups.map((group, groupIndex) => (
          <GroupContainer key={`group-${groupIndex}`} $highlight={group.highlight}>
            {group.title && <SubtitleText variant="subtitle1" $highlight={group.highlight}>{group.title}</SubtitleText>}
            <FieldsContainer $columns={group.gridColumns}>
              {group.fields.map((field) => {
                const SelectedIcon = field.icon ? MuiIcons[field.icon as keyof typeof MuiIcons] : null;

                return (
                  <FieldWrapper key={field.name} $colSpan={field.colSpan}>
                    {field.type === 'info' ? (
                      <Typography variant="body2" color="text.secondary">
                        {field.label}
                      </Typography>
                    ) : field.type === 'button' ? (
                      <FormButton field={field} context={context} />
                    ) : field.type === 'table' ? (
                      <FormTable field={field} context={context} />
                    ) : (
                      <Controller
                        name={field.name}
                        control={control}
                        rules={{
                          required: field.required ? 'Campo obrigatório' : false,
                          pattern: field.validation ? { value: new RegExp(field.validation.pattern), message: field.validation.message } : undefined
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => {
                          const handleFieldChange = (newValue: unknown) => {
                            onChange(newValue);
                            if (field.onChange) field.onChange(newValue, context);
                          };

                          if (field.type === 'select') {
                            return (
                              <FormControl fullWidth required={field.required} error={!!error} disabled={field.disabled}>
                                <InputLabel>{field.label}</InputLabel>
                                <Select value={value || ''} label={field.label} onChange={(e) => handleFieldChange(e.target.value)}>
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

                          if (field.type === 'date') {
                            return (
                              <DatePicker
                                label={field.label}
                                disabled={field.disabled}
                                readOnly={field.readOnly}
                                value={value ? dayjs(value) : null}
                                onChange={(newValue) => handleFieldChange(newValue ? newValue.format('YYYY-MM-DD') : null)}
                                slotProps={{
                                  textField: {
                                    fullWidth: true,
                                    required: field.required,
                                    error: !!error,
                                    helperText: error?.message
                                  }
                                }}
                              />
                            );
                          }

                          const searchHint = field.searchConfig ? 'Pressione Enter para pesquisar' : undefined;
                          const helperTextContent = error?.message ? (searchHint ? `${error.message} - ${searchHint}` : error.message) : searchHint;

                          return (
                            <TextField
                              type={field.type}
                              label={field.label}
                              required={field.required}
                              disabled={field.disabled}
                              value={value || ''}
                              onChange={(e) => handleFieldChange(e.target.value)}
                              error={!!error}
                              helperText={helperTextContent}
                              fullWidth
                              onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  if (field.searchConfig && !field.disabled && !field.readOnly) {
                                    const currentValue = (e.target as HTMLInputElement).value;
                                    setActiveSearch({ field, value: currentValue || undefined });
                                  }
                                }
                              }}
                              onMouseDown={(e: MouseEvent<HTMLDivElement>) => {
                                if ((field.readOnly || field.disabled) && !value) e.preventDefault();
                              }}
                              InputProps={{
                                ...(field.readOnly && { readOnly: true }),
                                ...(field.mask && { inputComponent: MaskedInput as ElementType<InputBaseComponentProps> }),
                                ...((SelectedIcon || field.searchConfig) && {
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      {field.searchConfig ? (
                                        <IconButton edge="end" disabled={field.disabled || field.readOnly} onClick={() => !field.disabled && !field.readOnly && setActiveSearch({ field, value: value ? String(value) : undefined })}>
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
                    )}
                  </FieldWrapper>
                );
              })}
            </FieldsContainer>
          </GroupContainer>
        ))}
      </GroupsWrapper>

      {activeSearch?.field.searchConfig && (
        <SearchModal
          config={activeSearch.field.searchConfig}
          initialValue={activeSearch.value}
          context={context}
          onClose={() => setActiveSearch(null)}
        />
      )}
    </>
  );
};

export default FieldRenderer;