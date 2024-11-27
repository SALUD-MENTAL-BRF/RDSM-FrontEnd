import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 75vh;
`;

export const FormWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

export const Title = styled.h2`
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #34495e;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #27ae60;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: #fadbd8;
  border: 1px solid #e74c3c;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #3498db;
  margin: 2rem 0;
`;

