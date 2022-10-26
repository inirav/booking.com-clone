import { StyledSelect } from './styles'

type Props = {
  isError: boolean
  options: { value: string; label: string }[]
}

const Select = ({ isError, options, ...props }: Props) => {
  return (
    <StyledSelect {...props} className={isError ? 'error' : ''}>
      {options.map((item, index) => (
        <option value={item.value} key={index}>
          {item.label}
        </option>
      ))}
    </StyledSelect>
  )
}

export default Select
