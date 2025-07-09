import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material'
import { WidgetWrapper } from './WidgetWrapper'

interface TableWidgetProps {
  title: string
  headers: string[]
  rows: any[]
  color: string
  icon: React.ReactNode
}

export const TableWidget: React.FC<TableWidgetProps> = ({
  title,
  headers,
  rows,
  color,
  icon
}) => {
  return (
    <WidgetWrapper title={title} icon={icon} color={color}>
      <TableContainer sx={{ maxHeight: 280, mt: 0.5 }}>
        <Table size="small" sx={{ '& .MuiTableCell-root': { py: 0.5 } }}>
          <TableHead>
            <TableRow>
              {headers.map((header: string, index: number) => (
                <TableCell key={index} sx={{ fontWeight: 600, fontSize: '0.75rem', py: 0.75 }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                  {row.route || row.vehicle || row.product || Object.values(row)[0]}
                </TableCell>
                <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                  {row.status ? (
                    <Chip 
                      label={row.status} 
                      size="small" 
                      color={row.statusColor || 'default'}
                      variant="outlined"
                      sx={{ fontSize: '0.65rem', height: 18 }}
                    />
                  ) : (
                    row.deliveries?.toLocaleString() || row.sales?.toLocaleString() || Object.values(row)[1]
                  )}
                </TableCell>
                <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                  {row.avgTime || row.location || row.growth || Object.values(row)[2]}
                </TableCell>
                {headers.length > 3 && (
                  <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                    {row.mileage || Object.values(row)[3]}
                  </TableCell>
                )}
                {headers.length > 4 && (
                  <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                    {row.service || Object.values(row)[4]}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </WidgetWrapper>
  )
} 