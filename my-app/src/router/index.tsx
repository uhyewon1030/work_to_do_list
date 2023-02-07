import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from 'pages/MainPage';
import PrivateRoute from './PrivateRouter';
import MyPage from 'pages/MyPage';
import LoginPage from 'pages/LoginPage';
import JoinPage from '../pages/JoinPage';

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                {/* 인증 여부 상관 없이 접속 가능한 페이지 정의 */}
                <Route index element={<MainPage/>}/>

                {/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 */}
                <Route element={<PrivateRoute authentication={false}/>}>
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/join" element={<JoinPage/>} />
                </Route>

                {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
                <Route element={<PrivateRoute authentication={true}/>}>
                    <Route path="/mypage" element={<MyPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router