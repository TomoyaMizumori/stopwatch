import React from "react";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
        <h1>ストップウォッチアプリへようこそ！</h1>
        <div>
            <button onClick={() => {navigate('/login')}}>ログインする</button>
            <button onClick={() => {navigate('/signup')}}>アカウント登録</button>
        </div>
    </div>
  );
};

export default Home;
