import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from '@mui/material';
import { useState, useCallback } from 'react';

import { TableContainerWrapper, FiltersContainer, ModalContainer } from './styles';

import type { SearchModalProps } from './types';
import type { ChangeEvent } from 'react';

const SearchModal = ({ config, context, onClose }: SearchModalProps) => {
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [results, setResults] = useState<Record<string, unknown>[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await config.onSearch(filters);
      setResults(data);
    } finally {
      setIsLoading(false);
    }
  }, [config, filters]);

  const handleSelect = useCallback((item: Record<string, unknown>) => {
    config.onSelect(item, context);
    onClose();
  }, [config, context, onClose]);

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
                fullWidth
                size="small"
                onChange={handleFilterChange}
              />
            ))}
            <Button variant="contained" onClick={handleSearch} disabled={isLoading}>
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