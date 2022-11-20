import {
  CheckBoxGroup,
  Container,
  Form,
  FormButton,
  FormLabel,
  Input,
  InputGroup,
  SubTitle,
  Title,
} from './styles'

type Props = {}

const NewsLetter = (props: Props) => {
  return (
    <Container>
      <Title>Save time, save money!</Title>
      <SubTitle>Sign up and we'll send the best deals to you</SubTitle>
      <Form>
        <InputGroup>
          <Input type="email" placeholder="Your email" style={{ width: '350px' }} />
          <FormButton>Subscribe</FormButton>
        </InputGroup>
        <CheckBoxGroup>
          <Input type="checkbox" />
          <FormLabel>Send me a link to get the FREE Booking.com app!</FormLabel>
        </CheckBoxGroup>
      </Form>
    </Container>
  )
}

export default NewsLetter
