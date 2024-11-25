import React, { useState, ChangeEvent } from "react";
import { RegisterSubmit } from "./submits/RegisterSubmit";
import styles from "../../assets/style/formularios/Register.module.css";
import LoginGoogle from "./submits/LoginGoogle";
import { motion } from "framer-motion"
import useBodyScrollLock from "../../hooks/useBodyScrollLock";

interface FormState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register: React.FC = () => {
  const [stateForm, setStateForm] = useState<FormState>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStateForm({
      ...stateForm,
      [name]: value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordVisibilityChange = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibilityChange = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useBodyScrollLock(true)

  return (
    <>
      <main className={`${styles.background}`}>
        <div className={`${styles.containerRegister}`}>
          <motion.div
            className={`${styles.form}`}
          >
            
          </motion.div>
          <motion.div
            className={`${styles.logo}`}
          >

          </motion.div>
        </div>
      </main>
    </>
  );
};
