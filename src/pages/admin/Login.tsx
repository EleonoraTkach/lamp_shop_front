import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../store/actions/authActions";
import styles from "../styles/login.module.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector(
      (state: any) => state.auth
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) return;

    dispatch(loginUser(username, password) as any);
  };

  useEffect(() => {
    if (token) {
      navigate("/admin");
    }
  }, [token, navigate]);

  return (
      <div className={styles.loginPage}>
        <form className={styles.loginCard} onSubmit={handleSubmit}>
          <h1 className={styles.loginTitle}>
            Вход администратора
          </h1>

          <input
              type="text"
              placeholder="Логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />

          <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
              <p className={styles.loginError}>
                {error}
              </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
  );
}