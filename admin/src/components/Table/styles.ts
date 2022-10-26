import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  border: 1px solid #DFE0EB;
  border-radius: 8px;
  padding: 30px;
`

export const StyledTable = styled.table`
  font-size: 14px;
  width: 100%;
  border-collapse: collapse;   

  td, th {
    padding: 10px;
  }
`

export const TableHead = styled.thead`
  color: #9FA2B4;
  font-weight: 700;
  border-bottom: 2px solid #DFE0EB;
`

export const TableBody = styled.thead`
`

export const TableRow = styled.tr`  
  &:not(:last-child) {
    border-bottom: 1px solid #DFE0EB;
  }
`

export const TableHeader = styled.th`
  text-align: left;
`

export const TableData = styled.td`
  text-align: left;
`