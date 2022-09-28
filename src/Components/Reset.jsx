import axios from 'axios';
import React from 'react'
import { useSearchParams } from 'react-router-dom';
import url from '../url';
import { Formik, Field, ErrorMessage, Form } from 'formik';

const Reset = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const email = searchParams.get('email');
    const code = searchParams.get('q');

    async function verify() {
        try {
            setLoading(true);
            const data = await axios.get(`${url.url}/auth/verify?email=${searchParams.get('email')}&code=${searchParams.get('q')}`);
            setError(false);
            setLoading(false);
        }
        catch (e) {
            setError(e.response.data.message);
            setLoading(false);
        }
    }
    React.useEffect(() => {
        verify();
    }, [])
    return (
        <div className="container-fluid text-center">
            {loading && <div>Please wait...</div>}
            {error && <div className="text-danger">{error}</div>}
            {!error && <ResetPasswordForm email={email} code={code} />}
        </div>
    )
}

function ResetPasswordForm({ email, code, }) {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [rSuccess, setRSuccess] = React.useState(false);
    const obj = {
        email: email,
        code: code,
        pass: '',
        cpass: ''
    }
    async function resetPassword(values) {
        try {
            setLoading(true);
            await axios.post(`${url.url}/auth/reset`, values);
            setLoading(false);
            setRSuccess(true);
            setError(false);
        }
        catch (e) {
            setError(e.response.data.message);
            setRSuccess(false);
            setLoading(false);
        }
    }
    return (
        <Formik
            initialValues={obj}
            validate={(values) => {
                const errors = {};
                if (!values.pass.trim()) errors.pass = "This field is required";
                else if (values.pass.trim().length < 5) errors.pass = "Password must be at least 5 characters";
                if (values.cpass !== values.pass) errors.cpass = "Password and confirmation password must be same";
                // console.log(values.pass.trim().length);
                return errors;
            }}
            onSubmit={(values) => {
                delete values.cpass;
                console.log(values);
                resetPassword(values);
            }}
        >
            {() =>
                <Form noValidate>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <Field type="password" className="form-control" name="pass" />
                        <ErrorMessage
                            component="span"
                            className="text-danger"
                            name="pass"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password:</label>
                        <Field type="password" className="form-control" name="cpass" />
                        <ErrorMessage
                            component="span"
                            className="text-danger"
                            name="cpass"
                        />
                    </div>
                    {error && <div className="text-danger m-2">{error}</div>}
                    {rSuccess && <div className="text-success m-2">Password reset success</div>}
                    <button type="submit" className="btn btn-primary" disabled={loading ? true : false}>{loading ? "please wait" : "submit"}</button>
                </Form>
            }
        </Formik>
    )
}

export default Reset
