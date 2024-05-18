import React,{ useState, ChangeEvent } from "react";

interface FormState {
  username: string;
  password: string;
}

export const Login: React.FC = () => {

  const [stateForm, setStateForm] = useState<FormState>({
    username: '',
    password: '',
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStateForm({
      ...stateForm,
      [name]: value,
    });
  };

  return(
    <div>
      <h1>Login</h1>
    </div>
  )
  
};
