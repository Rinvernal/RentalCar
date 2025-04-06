import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from 'yup';
import s from "./FeedBackForm.module.css"

function FeedbackForm() {
  const initialValues = {
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    bookingDate: Yup.string().required('Date is required'),
    comment: Yup.string(),
  });

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    alert('Form submitted!');
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.text}>Book your car now</h2>
      <p className={s.p}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <div>
            <Field
              name="name"
              placeholder="Name"
              className={s.field}
            />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className={s.field}
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div>
            <Field
              name="bookingDate"
              type="text"
              placeholder="Booking date"
              className={s.field}
            />
          </div>

          <div>
            <Field
              name="comment"
              as="textarea"
              placeholder="Comment"
              className={s.textarea}
            />
          </div>

          <div className={s.btnWrapper}>
          <button type="submit" className={s.btn}>
            Send
          </button>
        </div>
        </Form>
      </Formik>
    </div>
  )
}

export default FeedbackForm