import React, { useState, ChangeEvent } from "react";
import { RegisterSubmit } from "./submits/RegisterSubmit";
import "../../assets/style/formularios/Register.css";
import LoginGoogle from "./submits/LoginGoogle";

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

  return (
    <>
      
    </>
  );
};
