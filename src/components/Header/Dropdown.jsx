import { Link, useNavigate } from "react-router-dom";
// image import
import Edit from '../../assets/editing.png'
import Answer from '../../assets/a.png'
import Question from '../../assets/q.png'
import Save from '../../assets/save.png'
import Logout from '../../assets/power-off.png'

const Dropdown = ({closeDrop}) => {
	const navigate = useNavigate();
	const back_logout = 'https://k9bceeba41403a.user-app.krampoline.com/logouts';
	
  const dropdownClicked = () => {
    const close = closeDrop;
    close[1](!close[0]);
  };
	
	const kakaoLogout = async () => {
		const token = localStorage.getItem('access_token');
		try {
			if (token) {
				const res = await axios.get(`${back_logout}`, null, {
				  headers: {
					Authorization: `Bearer ${token}`
				  }
				});
			};
			console.log('로그아웃 성공: ', res);
			localStorage.clear();
			navigate('/');
		} 
		catch (error) {
			console.error('로그아웃 중 오류 발생', error);
		}
	}
	
	const logoutClicked = () => {
		dropdownClicked();
		kakaoLogout();
	};
	
	
	
  return (
    <div className="dropdownList active" 
      style={{
        width: "150px",
        height: "238px",
        position: "absolute",
        right: "-20px",
        top: "65px",
        backgroundColor: "lightpink",
        boxShadow: "0px 8px 16px 0px rgba(0,,0,0,0.2)",
      }}>
		  
      <Link to="/mypage/info" className="link borderBottom" onClick={dropdownClicked}>
        <img src={Edit} />마이페이지
      </Link>
      <Link to="/mypage/list" className="link borderBottom" onClick={dropdownClicked}>
        <img src={Question}/>내 질문 보기
      </Link>
      <Link to="/mypage/post" className="link borderBottom" onClick={dropdownClicked}>
        <img src={Save}/>저장한 코드
      </Link>
      <Link to="/mypage/code" className="link borderBottom" onClick={dropdownClicked}>
        <img src={Answer}/>답변한 코드
      </Link>
      <Link to="/" className="link" onClick={logoutClicked}>
        <img src={Logout}/>로그아웃
      </Link>
    </div>
  );
}

export default Dropdown;