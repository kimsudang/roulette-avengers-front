import { Link } from "react-router-dom";
import axios from "axios";
import Mail from "../../../assets/mail.png";

const SaveCodeLayout = ({code, index}) => {
  const redirect_uri = import.meta.env.VITE_BACK_REDIRECT_URI;

	if (!code || Object.keys(code).length === 0) {
    return <div>저장한 코드가 없습니다.</div>;
  }

  const formatDate = (dateTimeStr) => {
		const date = new Date(dateTimeStr);
		return new Intl.DateTimeFormat('ko-KR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}).format(date);
	};
	
	const formattedTime = formatDate(code.create_time);

  return (
    <div className=' flex justify-around m-5 w-full h-[60px] border border-[#d5d5d5] rounded hover:bg-gray-100'>
      <div className="flex justify-center items-center w-1/4">
        <div className="text-lg text-[#747474]">{index + 1}</div>
      </div>
      <div className="w-1/4 flex justify-center items-center">
        <div className="text-lg text-[#747474]">{code.member_Name}</div>
      </div>
      <div className="w-1/4 flex justify-center items-center">
        <div className="text-lg text-[#747474]">{formattedTime}</div>
      </div>
    </div>
  )
}

export default SaveCodeLayout;