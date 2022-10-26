import { useRef } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { Container, StyledModal, Title } from './styles'

type Props = {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
}

const Modal = ({ children, isOpen, setIsOpen, title }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => setIsOpen(false))

  return (
    <>
      {isOpen && (
        <Container>
          <StyledModal ref={ref}>
            <Title>{title}</Title>
            {children}
          </StyledModal>
        </Container>
      )}
    </>
  )
}

export default Modal
