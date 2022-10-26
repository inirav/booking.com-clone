import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Field } from 'formik'
import { Container } from './styles'

type Props = {
  isError: boolean
}

const TextEditor = ({ isError, ...props }: Props) => {
  return (
    <Container>
      <Field {...props} na>
        {({ field }: any) => (
          <ReactQuill value={field.value} onChange={field.onChange(field.name)} />
        )}
      </Field>
    </Container>
  )
}

export default TextEditor
