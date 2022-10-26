import { ErrorMessage, Label, StyledField } from './styles'
import { useField } from 'formik'
import Input from '../Input'
import Select from '../Select'
import Textarea from '../Textarea'
import TextEditor from '../TextEditor'
import ImageUploadWidget from '../ImageUploadWidget'

type Props = {
  name: string
  label: string
  type?: string
  options?: { value: string; label: string }[]
}

const generateField = (FieldComponent: (props: any) => JSX.Element) => {
  const Field = ({ name, label, ...props }: Props) => {
    const [inputProps, metaProps] = useField({ name, type: props.type })

    return (
      <StyledField isCheckBox={props.type === 'checkbox'}>
        <Label htmlFor={name}>{label}</Label>
        <FieldComponent {...inputProps} isError={metaProps.touched && metaProps.error} {...props} />
        {metaProps.touched && metaProps.error && <ErrorMessage>{metaProps.error}</ErrorMessage>}
      </StyledField>
    )
  }

  return Field
}

const Field = {
  Input: generateField(Input),
  Select: generateField(Select),
  Textarea: generateField(Textarea),
  TextEditor: generateField(TextEditor),
  ImageUploadWidget: generateField(ImageUploadWidget),
}

export default Field
