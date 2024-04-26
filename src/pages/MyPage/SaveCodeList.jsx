import { useEffect, useState } from "react";
import SaveCodeLayout from "../../components/PostLayout/SaveCode/SaveCodeLayout"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SaveCodeList = () => {
  const [codes, setCodes] = useState([]);
	const [profile, setProfile] = useState([]);
  const redirect_uri = import.meta.env.VITE_BACK_REDIRECT_URI;
	const navigate = useNavigate();
	const token = localStorage.getItem('access_token');
	
	useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) {
        console.error("토큰이 없습니다.");
        navigate("/"); // 토큰이 없으면 홈으로 리디렉션
        return;
      }
      try {
        const res = await axios.get(`${redirect_uri}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data); // 사용자 정보 설정
        loadSaveCodeList(); // 사용자 정보를 성공적으로 불러온 후 코드 목록 불러오기
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류가 발생했습니다.", error);
        navigate("/"); // 에러 발생 시 홈으로 리디렉션
      }
    };

    const loadSaveCodeList = async () => {
      try {
        const res = await axios.get(`${redirect_uri}/mypage/code`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const filteredCodes = res.data.filter(code => code.member_name !== profile.name);
				console.log(filteredCodes);
        setCodes(filteredCodes);
      } catch (error) {
        console.error('Failed to get saved code list:', error);
      }
    };

    fetchUserInfo();
  }, [navigate, token, redirect_uri]); 

  return (
    <div className="flex flex-col">
      <div className="flex justify-center pt-5 pb-5 border border-b-custom-pink-1">
        <p className="text-3xl font-semibold ">저장한 코드 목록</p>
      </div>
      <div>
        <div className="flex justify-center pt-10 pb-10">
          <div className="flex w-1/2 h-screen border border-black rounded overflow-y-auto">
						{Array.isArray(codes) && codes.map(code => (
							<SaveCodeLayout code={code} />
						))}
          </div>
        </div>
      </div> 
    </div>
  )
}

export default SaveCodeList;