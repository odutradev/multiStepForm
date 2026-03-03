import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from '@mui/material';
import { useState, useCallback, forwardRef, useEffect } from 'react';
import { IMaskInput } from 'react-imask';

import { TableContainerWrapper, FiltersContainer, ModalContainer } from './styles';

import type { SearchModalProps, MaskedInputProps } from './types';
import type { InputBaseComponentProps } from '@mui/material';
import type { ChangeEvent, ElementType } from 'react';

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

const SearchModal = ({ config, context, onClose, initialValue }: SearchModalProps) => {
  const [filters, setFilters] = useState<Record<string, unknown>>(() => {
    if (initialValue && config.initialFilterName) return { [config.initialFilterName]: initialValue };
    return {};
  });
  const [results, setResults] = useState<Record<string, unknown>[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSearch = useCallback(async (searchFilters?: Record<string, unknown>) => {
    setIsLoading(true);
    try {
      const data = await config.onSearch(searchFilters || filters);
      setResults(data);
    } finally {
      setIsLoading(false);
    }
  }, [config, filters]);

  const handleSelect = useCallback((item: Record<string, unknown>) => {
    config.onSelect(item, context);
    onClose();
  }, [config, context, onClose]);

  useEffect(() => {
    if (initialValue && config.initialFilterName) handleSearch({ [config.initialFilterName]: initialValue });
  }, []);

  return (
    <Dialog open maxWidth="md" fullWidth onClose={onClose}>
      <ModalContainer>
        <DialogTitle>{config.title}</DialogTitle>
        <DialogContent dividers>
          <FiltersContainer>
            {config.fields.map((field) => (
              <TextField
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                value={filters[field.name] as string || ''}
                fullWidth
                size="small"
                onChange={handleFilterChange}
                InputProps={{
                  ...(field.mask && { inputComponent: MaskedInput as ElementType<InputBaseComponentProps> })
                }}
                inputProps={field.mask ? { maskPattern: field.mask } : undefined}
              />
            ))}
            <Button variant="contained" onClick={() => handleSearch()} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : 'Buscar'}
            </Button>
          </FiltersContainer>

          <TableContainerWrapper>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  {config.columns.map((col) => (
                    <TableCell key={col.key}>{col.header}</TableCell>
                  ))}
                  <TableCell align="right">Ação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row, index) => (
                  <TableRow key={index} hover>
                    {config.columns.map((col) => (
                      <TableCell key={col.key}>{String(row[col.key] ?? '-')}</TableCell>
                    ))}
                    <TableCell align="right">
                      <Button size="small" variant="outlined" onClick={() => handleSelect(row)}>
                        Selecionar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {!results.length && !isLoading && (
                  <TableRow>
                    <TableCell colSpan={config.columns.length + 1} align="center">
                      Nenhum resultado encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainerWrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Fechar
          </Button>
        </DialogActions>
      </ModalContainer>
    </Dialog>
  );
};

export default SearchModal;