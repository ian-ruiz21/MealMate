import { useState } from 'react';
import * as authService from '../../services/authService';
import styles from './SignUpPage.module.css'; // Updated to module.css for CSS module support

export default function SignUpPage({ setUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.signUp(formData);
      setUser(user);
    } catch (err) {
      console.log(err);
      setErrorMsg('Sign Up Failed - Try Again');
    }
  }

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }

  const disable = formData.password !== formData.confirm;

  return (
    <div className={styles.signUpContainer}>
      <h2 className={styles.heading}>Sign Up!</h2>
      <form autoComplete="off" onSubmit={handleSubmit} className={styles.signUpForm}>
        <label htmlFor="name-input">Name</label>
        <input
          type="text"
          name="name"
          id="name-input"
          value={formData.name}
          onChange={handleChange}
          required
          className={styles.formInput}
        />
        <label htmlFor="email-input">Email</label>
        <input
          type="email"
          name="email"
          id="email-input"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.formInput}
        />
        <label htmlFor="password-input">Password</label>
        <input
          type="password"
          name="password"
          id="password-input"
          value={formData.password}
          onChange={handleChange}
          required
          className={styles.formInput}
        />
        <label htmlFor="confirm-input">Confirm</label>
        <input
          type="password"
          name="confirm"
          id="confirm-input"
          value={formData.confirm}
          onChange={handleChange}
          required
          className={styles.formInput}
        />
        <button type="submit" disabled={disable} className={styles.submitButton}>
          SIGN UP
        </button>
      </form>
      {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
    </div>
  );
}
