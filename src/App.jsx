import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// component 가져오기
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Login from "./pages/User/Login";
import LoginHandler from "./pages/User/Loginhandler";
import BoardMain from "./pages/Code/BoardMain";
import RequestCode from "./pages/Code/RequestCode";
import Chat from "./pages/Chat/Chat";
import CodeIDE from "./pages/Code/CodeIDE";
import MyCodeIDE from "./pages/Code/MyCodeIDE";
import RequestList from "./pages/MyPage/RequestList";
import SaveCodeList from "./pages/MyPage/SaveCodeList";
import Myinfo from "./pages/MyPage/Myinfo";
import PostCodePreview from "./pages/Code/PostCodePreview";
import PostDetailReq from "./pages/Code/PostDetailReq";

function App() {
  const defaultCurrentPage = 0;

  return (
    <div className="h-auto min-h-full App">
      <Router>
        <Header />

        <div className="w-full min-h-screen Main">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/user" element={<Login />} />
            <Route
              path="/login/oauth2/callback/kakao"
              element={<LoginHandler />}
            />
            <Route
              path="/post/list/:currentPage"
              element={<BoardMain defaultCurrentPage={defaultCurrentPage} />}
            />
            <Route path="/post/ask" element={<RequestCode />} />
            <Route path="/post/:postId" element={<PostDetailReq />} />
            <Route path="/post/preview" element={<PostCodePreview />} />
            <Route path="/reply" element={<CodeIDE />} />
            <Route path="/code" element={<MyCodeIDE />} />
            <Route path="/chat/start" element={<Chat />} />
            <Route path="/mypage/member" element={<Myinfo />} />
            <Route path="/mypage/list" element={<RequestList />} />
            <Route path="/mypage/code" element={<SaveCodeList />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
