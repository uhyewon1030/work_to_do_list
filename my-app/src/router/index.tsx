import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {UserInterface} from 'interfaces/UserInputInterface';

import PrivateRoute from './privateRouter';
import MyPage from 'pages/MyPage';
import LoginPage from 'pages/login/LoginPage';
import JoinPage from 'pages/join/JoinPage';


type AppRouterType = {
    isLogin: boolean;
    userInfo: UserInterface | null;
};

const Router = ({isLogin, userInfo} : AppRouterType) => {
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<LoginPage/>} />
                {/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 */}
                <Route element={<PrivateRoute authentication={false}/>}>
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