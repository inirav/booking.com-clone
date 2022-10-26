import {
  TableBody,
  Container,
  TableHead,
  TableRow,
  StyledTable,
  TableHeader,
  TableData,
} from './styles'

import { useTable } from 'react-table'

type Props = {
  columns: { Header: string; accessor: string }[]
  data: { [key: string]: any }[] | undefined
  onRowClick?: (id: string) => void
}

const Table = ({ columns, data = [], onRowClick }: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <Container>
      <StyledTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader {...column.getHeaderProps()}>{column.render('Header')}</TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)

            return (
              <TableRow
                {...row.getRowProps()}
                onClick={() => onRowClick && onRowClick(row.original.id)}
              >
                {row.cells.map((cell) => {
                  return <TableData {...cell.getCellProps()}>{cell.render('Cell')}</TableData>
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </StyledTable>
    </Container>
  )
}

export default Table
