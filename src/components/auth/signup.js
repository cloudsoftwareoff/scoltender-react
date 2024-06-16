// src/components/Auth/Signup.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth, firestore } from "../../services/firebase";
import { Button, TextField, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const initialValues = {
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    role: "contractor",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    name: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const usersCollectionRef = collection(firestore, 'users');
      const userDocRef = doc(usersCollectionRef, user.uid);
      await setDoc(userDocRef, {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        role: values.role,
        registeredAt: new Date(),
      });
      // Redirect to dashboard or home page
    } catch (error) {
      setErrors({ api: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-form">
      <h1>Signup</h1>
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
            <div className="form-field">
              <Field
                name="name"
                as={TextField}
                label="Name"
                fullWidth
                variant="outlined"
                helperText={<ErrorMessage name="name" />}
              />
            </div>
            <div className="form-field">
              <Field
                name="phoneNumber"
                as={TextField}
                label="Phone Number"
                fullWidth
                variant="outlined"
                helperText={<ErrorMessage name="phoneNumber" />}
              />
            </div>
            <div className="form-field">
              <Field
                name="role"
                as={TextField}
                label="Role"
                select
                fullWidth
                variant="outlined"
                selectProps={{ native: true }}
              >
                <option value="contractor">Contractor</option>
                <option value="establishment">Establishment</option>
              </Field>
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
                {isSubmitting ? <CircularProgress size={24} /> : "Signup"}
              </Button>
            </div>
            <div className="form-field">
              <Link to="/login">Already have an account? Login</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
