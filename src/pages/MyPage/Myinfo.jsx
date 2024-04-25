import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import kakao from "../../assets/KakaoTalk_logo.png";
import axios from "axios";

const Myinfo = () => {
  const navigate = useNavigate();
  const back_user =
    "https://k9bceeba41403a.user-app.krampoline.com/mypage/member";

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const [profile, setProfile] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const profile = localStorage.getItem("profile");
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`${back_user}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(res.data);
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류가 발생했습니다.", error);
        navigate("/");
      }
    };
    if (token) {
      fetchUserInfo();
    }
    if (profile) {
      setProfile(profile);
    }
  }, []);

  return (
    <div className="absolute w-full pl-20 mt-16 font-bold">
      <h2 className="text-5xl">My Page</h2>
      <div className="m-9 mb-7">
        <div className="p-3 mb-16">
          <p className="text-3xl">프로필</p>
          <div className="flex items-center p-2">
            <img src={profile} alt="프로필 이미지" className="w-20 h-auto" />
            <p className="pt-2 text-lg">
              <span>{userInfo.name}</span>님
            </p>
          </div>
        </div>
      </div>
      <div className="m-7 mb-7">
        <div className="p-3">
          <p className="text-3xl">소셜 로그인 계정</p>
          <div className="flex items-center p-7">
            <img src={kakao} className="w-12 h-auto" />
            <p className="text-lg pl-1/4">
              <span>{userInfo.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myinfo;
