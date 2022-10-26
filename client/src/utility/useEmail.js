import { useState } from 'react';

export default function useEmail() {
  const getEmail = () => {
    const emailString = localStorage.getItem('email');
    const userEmail = JSON.parse(emailString);
    return userEmail?.email
  };

  const [email, setEmail] = useState(getEmail());

  const saveEmail = userEmail => {
    localStorage.setItem('email', JSON.stringify(userEmail));
    setEmail(userEmail.email);
  };

  return {
    setEmail: saveEmail,
    email
  }
}