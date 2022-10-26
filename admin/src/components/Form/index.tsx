import { Formik } from 'formik'

const Form: typeof Formik = (props) => {
  return <Formik {...props}>{props.children}</Formik>
}
export default Form
