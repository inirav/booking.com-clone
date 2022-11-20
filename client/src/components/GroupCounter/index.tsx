import { Group } from '../../interfaces/search'
import { Container, Counter, CounterButton, CounterText, Item, Title } from './styles'

type Props = {
  group: Group
  setGroup: React.Dispatch<Group>
}

const GroupCounter = ({ group, setGroup }: Props) => {
  const handleChange = (propName: 'adults' | 'children' | 'rooms', isIncrement = false) => {
    setGroup({
      ...group,
      [propName]: isIncrement ? group[propName] + 1 : group[propName] - 1,
    })
  }

  return (
    <Container>
      <Item>
        <Title>Adults</Title>
        <Counter>
          <CounterButton
            type="button"
            onClick={() => handleChange('adults')}
            disabled={group.adults <= 1}
          >
            -
          </CounterButton>
          <CounterText>{group.adults}</CounterText>
          <CounterButton type="button" onClick={() => handleChange('adults', true)}>
            +
          </CounterButton>
        </Counter>
      </Item>
      <Item>
        <Title>Children</Title>
        <Counter>
          <CounterButton
            type="button"
            onClick={() => handleChange('children')}
            disabled={group.children <= 0}
          >
            -
          </CounterButton>
          <CounterText>{group.children}</CounterText>
          <CounterButton type="button" onClick={() => handleChange('children', true)}>
            +
          </CounterButton>
        </Counter>
      </Item>
      <Item>
        <Title>Rooms</Title>
        <Counter>
          <CounterButton
            type="button"
            onClick={() => handleChange('rooms')}
            disabled={group.rooms <= 1}
          >
            -
          </CounterButton>
          <CounterText>{group.rooms}</CounterText>
          <CounterButton type="button" onClick={() => handleChange('rooms', true)}>
            +
          </CounterButton>
        </Counter>
      </Item>
    </Container>
  )
}

export default GroupCounter
