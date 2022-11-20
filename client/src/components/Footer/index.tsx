import footerLinks from '../../constants/footerLinks'
import { Container, CopyrightText, Links, List, ListItem } from './styles'

type Props = {}

const Footer = (props: Props) => {
  return (
    <Container>
      <Links>
        {footerLinks.map((links, index) => (
          <List key={index}>
            {links.map((link, index) => (
              <ListItem key={index}>{link}</ListItem>
            ))}
          </List>
        ))}
      </Links>
      <CopyrightText>Copyright © 1996 - 2022 Booking.com™. All rights reserved.</CopyrightText>
    </Container>
  )
}

export default Footer
