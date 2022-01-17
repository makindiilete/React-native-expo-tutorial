import React, { useState } from "react";
import { Formik } from "formik";

export function AppForm({
  children,
  validationSchema,
  initialValues,
  onSubmit,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => children}
    </Formik>
  );
}
