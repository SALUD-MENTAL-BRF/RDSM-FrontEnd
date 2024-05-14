import React from 'react';

interface FormState {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterSubmit: React.FC<{ stateForm: FormState }> = ({ stateForm }) => {

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    console.log(stateForm);

  };

  return (
    <div className='botonRegister'>
      <button type="submit" onClick={handleSubmit} className='botonRegister'>Registro</button>
    </div>
  );
};
