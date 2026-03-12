import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import * as MuiIcons from '@mui/icons-material';
import { useState } from 'react';

import { TableContainerWrapper, MenuIconWrapper, HeaderContainer } from './styles';

import type { MouseEvent } from 'react';
import type { FormTableProps } from './types';

const FormTable = ({ field, context }: FormTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Record<string, unknown> | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>, row: Record<string, unknown>) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleExecuteAction = (action: (row: Record<string, unknown>, ctx: typeof context) => void) => {
    if (selectedRow) action(selectedRow, context);
    handleCloseMenu();
  };

  if (!field.tableColumns || !field.tableData) return null;

  return (
    <TableContainerWrapper>
      <HeaderContainer>
        <Typography variant="subtitle2" color="text.secondary">{field.label}</Typography>
      </HeaderContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            {field.tableColumns.map((col) => (
              <TableCell key={col.key}>{col.header}</TableCell>
            ))}
            {field.tableActions && <TableCell align="right">Ações</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {field.tableData.map((row, rowIndex) => (
            <TableRow key={rowIndex} hover>
              {field.tableColumns!.map((col) => (
                <TableCell key={col.key}>{String(row[col.key] ?? '-')}</TableCell>
              ))}
              {field.tableActions && (
                <TableCell align="right">
                  <IconButton size="small" onClick={(e) => handleOpenMenu(e, row)}>
                    <MoreVert fontSize="small" />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {field.tableActions && (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          {field.tableActions.map((action, index) => {
            const ActionIcon = action.icon ? MuiIcons[action.icon as keyof typeof MuiIcons] : null;
            return (
              <MenuItem key={index} onClick={() => handleExecuteAction(action.onClick)}>
                {ActionIcon && (
                  <MenuIconWrapper>
                    <ActionIcon fontSize="small" />
                  </MenuIconWrapper>
                )}
                {action.label}
              </MenuItem>
            );
          })}
        </Menu>
      )}
    </TableContainerWrapper>
  );
};

export default FormTable;