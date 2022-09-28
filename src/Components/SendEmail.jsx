import React from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import axios from 'axios';
import url from '../url'

const SendEmail = () => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [sent, setSent] = React.useState(false);
    const obj = {
        email: ''
    }
    async function send(values) {
        try {
            setLoading(true);
            await axios.post(`${url.url}/auth/sendmail`, values);
            setLoading(false);
            setError(false);
            setSent(true);
        }
        catch (e) {
            setLoading(false);
            setError(e.response.data.message);
            setSent(false);
            console.log(e);
        }
    }
    return (
        <div className="container-fluid text-center mt-3">
            <Formik
                initialValues={obj}
                validate={(values) => {
                    const errors = {};
                    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if (!values.email) errors.email = "This field is required";
                    else if (!values.email.match(mailformat)) errors.email = "Enter a valid mail";
                    return errors;
                }}
                onSubmit={(values) => {
                    console.log(values);
                    send(values);
                }}
            >
                {() =>
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                            <Field type="email" className="form-control" name="email" placeholder="Enter your email address" />
                            <ErrorMessage
                                name="email"
                                component="span"
                                className="text-danger"
                            />
                        </div>
                        {error && <div className='text-danger m-2'>{error}</div>}
                        {sent && <div className='text-success m-2'>Reset link sent to your mail..please check</div>}
                        <button type="submit" className="btn btn-primary" disabled={loading ? true : false}>{loading ? "Please wait" : "Send mail"}</button>
                    </Form>}
            </Formik>
        </div>
    )
}

export default SendEmail
