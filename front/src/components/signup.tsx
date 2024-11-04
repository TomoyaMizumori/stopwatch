import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/create_user/", {
        username: username,
        email: email,
        password: password,
      });

      alert("アカウントが作成されました");

      navigate("/login");
    } catch (error) {
      setError("アカウントが正常に作成できませんでした");
    }
  };

  return (
    <div className="Register">
      <h1>アカウント新規登録画面</h1>
      <form onSubmit={handleSubmit} className="Form">
        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">登録</button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default SignUp;
