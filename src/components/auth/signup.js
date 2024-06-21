import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth, firestore, storage } from "../../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    role: "contractor",
    cinCard: null,
    companyLicense: null,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("تنسيق البريد الإلكتروني غير صالح").required("مطلوب"),
    password: Yup.string()
      .min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل")
      .required("مطلوب"),
    name: Yup.string().required("مطلوب"),
    phoneNumber: Yup.string().required("مطلوب"),
    cinCard: Yup.mixed().required("مطلوب")
      .test("fileSize", "حجم الملف كبير جداً", value => value && value.size <= 1024 * 1024) // الحد الأقصى 1MB
      .test("fileType", "نوع الملف غير مدعوم", value => value && ["image/jpeg", "image/png", "application/pdf"].includes(value.type)),
    companyLicense: Yup.mixed().required("مطلوب")
      .test("fileSize", "حجم الملف كبير جداً", value => value && value.size <= 1024 * 1024) // الحد الأقصى 1MB
      .test("fileType", "نوع الملف غير مدعوم", value => value && ["image/jpeg", "image/png", "application/pdf"].includes(value.type)),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const cinCardRef = ref(storage, `documents/cin/${user.uid}`);
      await uploadBytes(cinCardRef, values.cinCard);
      const cinCardURL = await getDownloadURL(cinCardRef);

      const companyLicenseRef = ref(storage, `documents/license/${user.uid}`);
      await uploadBytes(companyLicenseRef, values.companyLicense);
      const companyLicenseURL = await getDownloadURL(companyLicenseRef);

      const usersCollectionRef = collection(firestore, "users");
      const userDocRef = doc(usersCollectionRef, user.uid);
      await setDoc(userDocRef, {
        uid: auth.currentUser.uid,
        name: values.name,
        email: values.email,
        profileImageUrl:"https://i.pinimg.com/564x/b0/dc/a1/b0dca1538a110dd5ee860db55e6ea2e7.jpg",
        phoneNumber: values.phoneNumber,
        role: values.role,
        cinCardURL,
        companyLicenseURL,
        registeredAt: new Date(),
      });
      navigate("/");
    } catch (error) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "البريد الإلكتروني مستخدم بالفعل";
          break;
        case "auth/invalid-email":
          errorMessage = "تنسيق البريد الإلكتروني غير صالح";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "تم تعطيل تسجيل الحسابات الجديدة";
          break;
        case "auth/weak-password":
          errorMessage = "كلمة المرور ضعيفة جدًا";
          break;
        default:
          errorMessage = "حدث خطأ ما. يرجى المحاولة مرة أخرى.";
      }
      setErrors({ api: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
      <div className="col-md-6">
      <div className="card">
      <div className="card-body">
      <h1 className="text-center mb-4">تسجيل جديد</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue, errors }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
              <Field
                name="email"
                type="email"
                className="form-control"
              />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">كلمة المرور</label>
              <Field
                name="password"
                type="password"
                className="form-control"
              />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">الاسم</label>
              <Field
                name="name"
                type="text"
                className="form-control"
              />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">رقم الهاتف</label>
              <Field
                name="phoneNumber"
                type="text"
                className="form-control"
              />
              <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">الدور</label>
              <Field
                name="role"
                as="select"
                className="form-control"
              >
                <option value="contractor">متعاقد</option>
                <option value="establishment">مؤسسة</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="cinCard" className="form-label">بطاقة CIN</label>
              <input
                name="cinCard"
                type="file"
                accept="image/jpeg, image/png, application/pdf"
                className="form-control"
                onChange={(event) => {
                  setFieldValue("cinCard", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="cinCard" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="companyLicense" className="form-label">رخصة الشركة</label>
              <input
                name="companyLicense"
                type="file"
                accept="image/jpeg, image/png, application/pdf"
                className="form-control"
                onChange={(event) => {
                  setFieldValue("companyLicense", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="companyLicense" component="div" className="text-danger" />
            </div>
            {errors.api && <Alert variant="danger">{errors.api}</Alert>}
            <div className="d-grid">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                block
              >
                {isSubmitting ? <Spinner animation="border" size="sm" /> : "تسجيل"}
              </Button>
            </div>
            <div className="text-center">
              <Link to="/login">هل لديك حساب بالفعل؟ تسجيل الدخول</Link>
            </div>
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

export default Signup;
