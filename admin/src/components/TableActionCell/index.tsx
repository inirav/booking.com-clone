import { StyledTableActionCell } from './styles'

type Props = {
  children: React.ReactNode
}

const TableActionCell = ({ children }: Props) => {
  return <StyledTableActionCell>{children}</StyledTableActionCell>
}

export default TableActionCell
