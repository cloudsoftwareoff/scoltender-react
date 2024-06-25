import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from "../../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Button, Spinner, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("تنسيق البريد الإلكتروني غير صالح").required("مطلوب"),
    password: Yup.string()
      .min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل")
      .required("مطلوب"),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(true);
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      navigate("/");
    } catch (error) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "المستخدم غير موجود";
          break;
        case "auth/wrong-password":
          errorMessage = "كلمة المرور غير صحيحة";
          break;
        case "auth/invalid-email":
          errorMessage = "تنسيق البريد الإلكتروني غير صالح";
          break;
        default:
          errorMessage = "حدث خطأ ما. يرجى المحاولة مرة أخرى.";
      }
      setErrors({ api: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      if (!resetEmail) {
        alert("يرجى إدخال بريدك الإلكتروني أولاً.");
        return;
      }
      await sendPasswordResetEmail(auth, resetEmail);
      alert("تم إرسال بريد إعادة تعيين كلمة المرور. يرجى التحقق من بريدك الإلكتروني.");
      setResetEmail("");
      setShowResetForm(false);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("حدث خطأ أثناء إرسال بريد إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">تسجيل الدخول</h1>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting, errors }) => (
                  <Form>
                    <div className="mb-3">
                      <Field
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="البريد الإلكتروني"
                      />
                      <div className="text-danger mt-1">
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <Field
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="كلمة المرور"
                      />
                      <div className="text-danger mt-1">
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                    {errors.api && <Alert variant="danger">{errors.api}</Alert>}
                    <div className="d-grid mb-3">
                      <Button type="submit" variant="primary" disabled={isSubmitting}>
                        {isSubmitting ? <Spinner animation="border" size="sm" /> : "تسجيل الدخول"}
                      </Button>
                    </div>
                    <div className="mb-3 text-center">
                      <Link to="/signup">إنشاء حساب جديد</Link> |{" "}
                      <Link to="#" onClick={() => setShowResetForm(true)}>نسيت كلمة المرور؟</Link>
                    </div>
                    {showResetForm && (
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="البريد الإلكتروني"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                        />
                        <Button
                          variant="secondary"
                          className="mt-2"
                          onClick={handleForgotPassword}
                          disabled={isSubmitting}
                        >
                          إعادة تعيين كلمة المرور
                        </Button>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
