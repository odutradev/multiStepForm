import { Dialog, DialogTitle, DialogActions, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Typography, TablePagination } from '@mui/material';
import { useState, useCallback, forwardRef, useEffect } from 'react';
import { Search } from '@mui/icons-material';
import { IMaskInput } from 'react-imask';

import { TableContainerWrapper, FiltersContainer, ContentContainer, ModalContainer, StyledTableRow, SearchButton, CenterContent, EmptyIcon } from './styles';

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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSearch = useCallback(async (searchFilters?: Record<string, unknown>) => {
    setIsLoading(true);
    setPage(0);
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

  const handlePageChange = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }, []);

  useEffect(() => {
    if (initialValue && config.initialFilterName) handleSearch({ [config.initialFilterName]: initialValue });
  }, [initialValue, config.initialFilterName, handleSearch]);

  const displayedResults = config.pagination ? results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : results;

  return (
    <Dialog open maxWidth="lg" fullWidth onClose={onClose}>
      <ModalContainer>
        <DialogTitle>{config.title}</DialogTitle>
        <ContentContainer dividers>
          <FiltersContainer>
            {config.fields.map((field) => (
              <TextField
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                value={(filters[field.name] as string) || ''}
                fullWidth
                disabled={isLoading}
                onChange={handleFilterChange}
                InputProps={{
                  ...(field.mask && { inputComponent: MaskedInput as ElementType<InputBaseComponentProps> })
                }}
                inputProps={field.mask ? { maskPattern: field.mask } : undefined}
              />
            ))}
            <SearchButton variant="contained" disabled={isLoading} startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Search />} onClick={() => handleSearch()}>
              Buscar
            </SearchButton>
          </FiltersContainer>

          <TableContainerWrapper>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {config.columns.map((col) => (
                    <TableCell key={col.key}>{col.header}</TableCell>
                  ))}
                  <TableCell align="right">Ação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <StyledTableRow>
                    <TableCell colSpan={config.columns.length + 1}>
                      <CenterContent>
                        <CircularProgress size={40} />
                        <Typography variant="body1">Buscando resultados...</Typography>
                      </CenterContent>
                    </TableCell>
                  </StyledTableRow>
                ) : displayedResults.length > 0 ? (
                  displayedResults.map((row, index) => (
                    <StyledTableRow key={index} hover>
                      {config.columns.map((col) => (
                        <TableCell key={col.key}>{String(row[col.key] ?? '-')}</TableCell>
                      ))}
                      <TableCell align="right">
                        <Button size="small" variant="outlined" onClick={() => handleSelect(row)}>
                          Selecionar
                        </Button>
                      </TableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <TableCell colSpan={config.columns.length + 1}>
                      <CenterContent>
                        <EmptyIcon />
                        <Typography variant="body1">Nenhum resultado encontrado.</Typography>
                      </CenterContent>
                    </TableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainerWrapper>
          
          {config.pagination && results.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={results.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              labelRowsPerPage="Linhas por página:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
          )}
        </ContentContainer>
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