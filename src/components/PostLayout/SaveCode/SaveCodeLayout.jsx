import { Link } from "react-router-dom";
import axios from "axios";
import Mail from "../../../assets/mail.png";

const SaveCodeLayout = ({code}) => {
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
			hour: '2-digit',
			minute: '2-digit',
		}).format(date);
	};
	
	const formattedTime = formatDate(code.create_time);

  return (
    <div className=' m-4 w-full h-[100px] border border-[#d5d5d5] rounded'>
      <div className="flex justify-between pl-10">
        <div>
          <div>
            <div className="flex p-2">
              <div className="mr-10 p-2">
                <p>답변자: {code.member_name}</p>
              </div>
            </div>
            <div className="ml-2 p-2">
              <p>작성시간: {formattedTime}</p>
            </div>
          </div>
        </div>
        <div className="items-center">
          <Link to={`/post/preview?postId=${code.postId}&replyId=${code.replyId}`} className="mt-7 mr-10 p-2 h-10 border border-custom-pink-1 text-[#474747] rounded bg-custom-pink-1 hover:bg-custom-pink-3 transition-colors duration-300">
            미리보기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SaveCodeLayout;