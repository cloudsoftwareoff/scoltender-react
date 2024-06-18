// src/components/Auth/DocumentUpload.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { storage, firestore } from "../../services/firebase";
import { Button, CircularProgress } from "@material-ui/core";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

const DocumentUpload = ({ userId }) => {
  const initialValues = {
    cinCard: null,
    companyLicense: null,
  };

  const validationSchema = Yup.object({
    cinCard: Yup.mixed().required("Required")
      .test("fileSize", "File size is too large", value => value && value.size <= 1024 * 1024) // Max 1MB
      .test("fileType", "Unsupported file type", value => value && ["image/jpeg", "image/png", "application/pdf"].includes(value.type)),
    companyLicense: Yup.mixed().required("Required")
      .test("fileSize", "File size is too large", value => value && value.size <= 1024 * 1024) // Max 1MB
      .test("fileType", "Unsupported file type", value => value && ["image/jpeg", "image/png", "application/pdf"].includes(value.type)),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(true);

      const cinCardRef = ref(storage, `documents/cin/${userId}`);
      await uploadBytes(cinCardRef, values.cinCard);
      const cinCardURL = await getDownloadURL(cinCardRef);

      const companyLicenseRef = ref(storage, `documents/license/${userId}`);
      await uploadBytes(companyLicenseRef, values.companyLicense);
      const companyLicenseURL = await getDownloadURL(companyLicenseRef);

      const userDocRef = doc(firestore, 'users', userId);
      await updateDoc(userDocRef, {
        cinCardURL,
        companyLicenseURL,
      });

      // Redirect to dashboard or home page
    } catch (error) {
      setErrors({ api: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="document-upload-form">
      <h1>Upload Documents</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue, errors }) => (
          <Form>
            <div className="form-field">
              <input
                name="cinCard"
                type="file"
                accept="image/jpeg, image/png, application/pdf"
                onChange={(event) => {
                  setFieldValue("cinCard", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="cinCard" component="div" className="error" />
            </div>
            <div className="form-field">
              <input
                name="companyLicense"
                type="file"
                accept="image/jpeg, image/png, application/pdf"
                onChange={(event) => {
                  setFieldValue("companyLicense", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="companyLicense" component="div" className="error" />
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
                {isSubmitting ? <CircularProgress size={24} /> : "Upload"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DocumentUpload;
