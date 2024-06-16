// src/components/Auth/Login.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from "../../services/firebase";
import { Button, TextField, CircularProgress } from "@material-ui/core";
import { Link , useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(true);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (error) {
      setErrors({ api: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-form">
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="form-field">
              <Field
                name="email"
                as={TextField}
                label="Email"
                fullWidth
                variant="outlined"
                helperText={<ErrorMessage name="email" />}
              />
            </div>
            <div className="form-field">
              <Field
                name="password"
                as={TextField}
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                helperText={<ErrorMessage name="password" />}
              />
            </div>
            {errors.api && <div className="error">{errors.api}</div>}
            <div className="form-field">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
              >
                {isSubmitting ? <CircularProgress size={24} /> : "Login"}
              </Button>
            </div>
            <div className="form-field">
              <Link to="/signup">Create an account</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
