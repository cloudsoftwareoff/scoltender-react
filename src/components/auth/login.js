// src/components/Auth/Login.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from "../../services/firebase";
import { Button, TextField, CircularProgress } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("تنسيق البريد الإلكتروني غير صالح").required("مطلوب"),
    password: Yup.string()
      .min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل")
      .required("مطلوب"),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(true);
      const userCredential= await signInWithEmailAndPassword(auth, values.email, values.password);
    const user = userCredential.user;
      navigate("/");
    } catch (error) {
      setErrors({ api: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-form">
      <h1>تسجيل الدخول</h1>
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
                label="البريد الإلكتروني"
                fullWidth
                variant="outlined"
                helperText={<ErrorMessage name="email" />}
              />
            </div>
            <div className="form-field">
              <Field
                name="password"
                as={TextField}
                label="كلمة المرور"
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
                {isSubmitting ? <CircularProgress size={24} /> : "تسجيل الدخول"}
              </Button>
            </div>
            <div className="form-field">
              <Link to="/signup">إنشاء حساب جديد</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
