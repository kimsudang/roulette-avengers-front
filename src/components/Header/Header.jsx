import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import Dropdown from './Dropdown'
import Logo from '../../assets/roulette.png'
import User from '../../assets/user.png'
import Mail from '../../assets/mail.png'
import useDetectClose from '../../hooks/useOutsideClick'

const Header = () => {
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const navigate = useNavigate();
	
// 	로컬에서 token 가져옴
	const token = localStorage.getItem('access_token');
	const my_member_id = localStorage.getItem('member_id');
	const profile = localStorage.getItem('profile');

  const dropdownClicked = () => {
    setIsOpen(!isOpen);
  };

  const linkHome = () => {
    navigate('/');
  };

  const linkMail = () => {
    window.location.href = `https://k9bceeba41403a.user-app.krampoline.com/chat/${my_member_id}`;
  };

  return (
    <div className="Header" style={{
      width: "100%",
      height: "70px",
      backgroundColor: "#FFE6E6",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
     }}>
		 <button onClick={linkHome} 
			style={{
			  height: "80%",
			  width: "70px",
			  margin: "10px",
			  border: "0",
			backgroundColor: "transparent",
			}}>
			<img src={Logo} style={{
			  height: "50px",
			  width: "50px",
			}}/>
		 </button>
		  {token && (
		  	<div className="button" 
				style={{
				  height: "70px",
				  padding: "20px",
				  display: "flex",
				  justifyContent: "space-between",
				  alignItems: "center",
				}}>
				<button onClick={linkMail} 
				  style={{
					width: "50px",
					height: "50px",
					margin: "5px",
					border: "0",
				  }}>
				  <img src={Mail} style={{
					width: "30px",
				  }}/>
				</button>
				<div className="dropdown" 
				  ref={dropDownRef}
				  style={{
					position: "relative",
					display: "inline-block",
				  }}>
				  <button 
					className="Profile" 
					onClick={dropdownClicked}
					style={{
					  width: "50px",
					  height: "50px",
					  margin: "5px",
					  border: "0",
					}} >
					<img src={profile} style={{
					  width: "50px",
					  borderRadius: "50%",
					  backgroundColor: "#ffffff",
					}}/>
				  </button>
				  {isOpen && (
					<Dropdown closeDrop={[isOpen, setIsOpen]}/>
				  )}
				</div>
			</div>
		  )}
    </div>
  )
}

export default Header