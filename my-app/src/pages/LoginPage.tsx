import { useNavigate } from 'react-router';

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Login Page</h1>
      <div>로그인 하지 않아야만 접속 가능</div>
      <button onClick={() => {
        sessionStorage.setItem('isAuthenticated', 'true');
        // 메인으로 이동
        navigate("/")
      }}>로그인 하기</button>
    </>
  )
}

export default LoginPage