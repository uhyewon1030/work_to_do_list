import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router';

const MainPage = () => {
// const isAuthenticated = sessionStorage.getItem('isAuthenticated');
const [isAuthenticated, setIsAuthenticated] = useState<string|null>(sessionStorage.getItem('isAuthenticated'));
const navigate = useNavigate();

return (
  <>
    <h1>Main Page</h1>
    <div>로그인 여부 상관없이 누구나 접속 가능!</div>
    {
      isAuthenticated === null || isAuthenticated === 'false' ? (
          <>
              <button onClick={()=>{navigate('/login')}}>로그인</button>
              <button onClick={()=>{navigate('/join')}}>회원가입</button>
          </>
      ): (
            <div>
                <button onClick={()=>{{
                    setIsAuthenticated('false');
                    sessionStorage.setItem('isAuthenticated', 'false');
                }}}>
                    로그아웃
                </button>
                <button onClick={() => {navigate('/mypage')}}>
                    myPage로 이동
                </button>
            </div>
         )
    }
  </>
)
}

export default MainPage