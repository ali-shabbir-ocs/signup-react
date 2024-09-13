
import './signup.scss';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { setMonth, setYear, getDate } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the DatePicker CSS

const SignUp = () => {
    return (
        <div className='container'>
            <div className='heading'>
                <h2>Create an account</h2>
            </div>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    confirmPassword: '',
                    birthDate: '',
                    email: '',
                    gender: '',
                    country: '',
                    state: '',
                    city: '',
                    monthYear: new Date(),
                    day: getDate(new Date())
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = "Required"
                    }
                    if (!values.password) {
                        errors.password = "Required"
                    }
                    if (!values.confirmPassword) {
                        errors.confirmPassword = "Required"
                    }
                    else if (values.password !== values.confirmPassword) {
                        errors.confirmPassword = "Password and Confirm Password must be same"
                    }
                    if (!values.monthYear) {
                        errors.monthYear = "Required"
                    }
                    if (!values.day) {
                        errors.day = "Required"
                    }
                    if (!values.email) {
                        errors.email = "Required"
                    }
                    else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = "Invalid email address";
                    }
                    if (!values.gender) {
                        errors.gender = "Required"
                    }
                    if (!values.country) {
                        errors.country = "Required"
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    // Combine month/year and day to create a full birth date
                    const birthDate = new Date(values.monthYear);
                    birthDate.setDate(values.day);
                    values.birthDate = birthDate;
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));

                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className='labelfield'>
                            <label>Username*</label>
                            <Field name='username' type='text'></Field>
                            <ErrorMessage name='username'></ErrorMessage>
                        </div>

                        <div className='labelfield'>
                            <label>Password*</label>
                            <Field name='password' type='password'></Field>
                            <ErrorMessage name='password'></ErrorMessage>
                        </div>

                        <div className='labelfield'>
                            <label>Confirm Password*</label>
                            <Field name='confirmPassword' type='password'></Field>
                            <ErrorMessage name='confirmPassword'></ErrorMessage>
                        </div>

                        <div className='labelfield'>
                            <label>Birth Date*</label>
                            <DatePicker
                                selected={values.monthYear}
                                onChange={(date) => setFieldValue("monthYear", date)}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                className="datepicker"
                            />
                            <ErrorMessage name='monthYear' />
                            <DatePicker
                                selected={new Date(setYear(setMonth(new Date(), values.monthYear.getMonth()), values.monthYear.getFullYear()))}
                                onChange={(date) => setFieldValue("day", getDate(date))}
                                dateFormat="dd"
                                showMonthDropdown={false}
                                showYearDropdown={false}
                                className="datepicker"
                            />
                            <ErrorMessage name='day' />
                        </div>
                        <div className='labelfield'>
                            <label>Email*</label>
                            <Field name='email' type='email'></Field>
                            <ErrorMessage name='email'></ErrorMessage>
                        </div>
                        <div className='labelfield'>
                            <label>Gender*</label>
                            <Field name="gender" as="select">
                                <option value=" ">    </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Field>
                            <ErrorMessage name='gender'></ErrorMessage>
                        </div>

                        <div className='labelfield'>
                            <label>Country*</label>
                            <Field name='country' type='text'></Field>
                            <ErrorMessage name='country'></ErrorMessage>
                        </div>
                        <div className='labelfield'>
                            <label>State/Province</label>
                            <Field name='state' type='text'></Field>
                        </div>
                        <div className='labelfield'>
                            <label>City</label>
                            <Field name='city' type='text'></Field>
                        </div>

                        <div className='submit'>
                            <button type='submit' >Sign up</button>
                        </div>
                    </Form>)}
            </Formik>

        </div>
    )
}
export default SignUp;