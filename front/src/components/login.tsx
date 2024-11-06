import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        const response = await axios.post("http://127.0.0.1:8000/login/", {
          email: email,
          password: password,
        });
  
        alert("ログインに成功しました！");
  
        navigate("/timer", {state:{isLogin: true}});
      } catch(error) {
        setError("ログインに失敗しました");
      }
    };
    return (
        <div className="Login">
            <h1>ログイン画面</h1>

            <form onSubmit={handleSubmit} className="Form">
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
                <button type="submit">ログイン</button>
            </form>
            <p>{error}</p>
        </div>
    );
};

export default Login;
