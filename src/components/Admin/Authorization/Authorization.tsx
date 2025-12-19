"use client";
import React, { useEffect, useState } from "react";
import s from "./Authorization.module.css";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../../../firebaseConfig";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validationSchemaRegister } from "@/data/validationSchema";
import ResetPasswordModal from "./ResetPasswordModal/ResetPasswordModal";

type AuthProps = {
  email: string;
  password: string;
};

const Authorization = () => {
  const [isVisual, setIsVisual] = useState(false);
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisual(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const initialValues: AuthProps = {
    email: "",
    password: "",
  };

  const hundlerAuth = async (value: AuthProps) => {
    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);

      router.push("/admin");
    } catch (error: unknown) {
      alert("Невірний логін або пароль");
      console.error(error);
    }
  };
  const handleResetPassword = async (email: string) => {
    if (!email) {
      alert("Введи email для відновлення пароля");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Лист для відновлення пароля надіслано");
    } catch (error) {
      alert("Помилка відновлення пароля");
      console.error(error);
    }
  };

  return (
    <>
      {isVisual && (
        <div className={s.authWrapper}>
          <div className={s.authBlock}>
            <h3 className={s.title}>Авторизація</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchemaRegister}
              onSubmit={hundlerAuth}
            >
              {({ values }) => (
                <Form className={s.form}>
                  <div className={s.inputWrapper}>
                    <label className={s.label}>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Логін"
                        className={s.input}
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className={s.error}
                      />
                    </label>

                    <label className={s.label}>
                      <Field
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="Пароль"
                        className={s.input}
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className={s.error}
                      />
                    </label>

                    <button
                      type="button"
                      className={s.btnRestore}
                      onClick={() => setOpenModal(true)}
                    >
                      Відновити пароль
                    </button>
                    {openModal && (
                      <ResetPasswordModal onClose={() => setOpenModal(false)} />
                    )}
                  </div>

                  <button type="submit" className={s.btnEnter}>
                    Увійти
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default Authorization;
