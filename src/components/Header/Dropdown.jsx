import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// image import
import Edit from "../../assets/editing.png";
import Answer from "../../assets/a.png";
import Question from "../../assets/q.png";
import Save from "../../assets/save.png";
import Logout from "../../assets/power-off.png";

const Dropdown = ({ closeDrop }) => {
  const navigate = useNavigate();
  const back_logout = "https://k9bceeba41403a.user-app.krampoline.com/logouts";

  const dropdownClicked = () => {
    const close = closeDrop;
    close[1](!close[0]);
  };

  const kakaoLogout = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token);
    try {
      const res = await axios.get(`${back_logout}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("로그아웃 성공: ", res);
      localStorage.clear();
      navigate("/");
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error("로그아웃 중 오류 발생", error);
    }
  };

  const logoutClicked = () => {
    kakaoLogout();
    dropdownClicked();
  };

  return (
    <div className="dropdownList opacity-100 visible transform translate-y-0 min-w-40 h-60 absolute right-[-20px] top-16 bg-custom-pink-2 z-50 flex flex-col">
      <div className="flex items-center h-12 px-5 text-black hover:bg-custom-pink-3">
        <img src={Edit} className="w-4 mr-2" />
        <Link
          to="/mypage/member"
          className="no-underline"
          onClick={dropdownClicked}
        >
          마이페이지
        </Link>
      </div>
      <div className="flex items-center h-12 px-5 text-black hover:bg-custom-pink-3">
        <img src={Question} className="w-4 mr-2" />
        <Link
          to="/mypage/list"
          className="no-underline"
          onClick={dropdownClicked}
        >
          내 질문 보기
        </Link>
      </div>
      <div className="flex items-center h-12 px-5 text-black hover:bg-custom-pink-3">
        <img src={Save} className="w-4 mr-2" />
        <Link
          to="/mypage/code"
          className="no-underline"
          onClick={dropdownClicked}
        >
          저장한 코드
        </Link>
      </div>
      <div className="flex items-center h-12 px-5 text-black hover:bg-custom-pink-3">
        <img src={Answer} className="w-4 mr-2" />
        <Link
          to="/mypage/post"
          className="no-underline"
          onClick={dropdownClicked}
        >
          답변한 코드
        </Link>
      </div>
      <div className="flex items-center h-12 px-5 text-black hover:bg-custom-pink-3">
        <img src={Logout} className="w-4 mr-2" />
        <button className="no-underline" onClick={logoutClicked}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
