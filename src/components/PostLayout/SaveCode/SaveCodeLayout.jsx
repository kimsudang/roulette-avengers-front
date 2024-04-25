import { Link } from "react-router-dom";
import axios from "axios";
import Mail from "../../../assets/mail.png";

const SaveCodeLayout = (code) => {
  const redirect_uri = import.meta.env.VITE_BACK_REDIRECT_URI;

  const startChating = async (memberId) => {
		const member_id = localStorage.getItem('member_id');
		const my_member_id = parseInt(member_id, 10);
		const chat_member_id = memberId;
		const chat_message = '대화을 시작합니다.';

		try {
			const res = await axios.post(`${redirect_uri}/chat/start`, {
				sender: my_member_id,
				receiver: chat_member_id,
				message: chat_message,
			});
			console.log('대화 시작');
			window.location = `${redirect_uri}/chat/${my_member_id}`;
		} catch (error) {
			alert('대화 요청을 실패하였습니다.');
		}
	};

	if (!code || code.length === 0) {
		return <div>저장한 코드가 없습니다.</div>;
	}

  const formatDate = (dateTimeStr) => {
		const date = new Date(dateTimeStr);
		return new Intl.DateTimeFormat('ko-KR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	};

  return (
    <div className=' m-4 w-full h-[100px] border border-[#d5d5d5] rounded'>
      <div className="flex justify-between pl-10">
        <div>
          <div>
            <div className="flex p-2">
              <div className="mr-10 p-2">
                <p>답변자: </p>
              </div>
              <button className="p-1 w-[40px] h-10 border border-custom-pink-1 text-[#474747] rounded bg-custom-pink-1 hover:bg-custom-pink-3 transition-colors duration-300">
                <img className="w-[30px]" src={Mail} />
              </button>
            </div>
            <div className="ml-2 p-2">
              <p>작성시간: </p>
            </div>
          </div>
        </div>
        <div className="items-center">
          <Link to=`/post/preview?postId={postId}&replyId={replyId}` className="mt-7 mr-10 p-2 h-10 border border-custom-pink-1 text-[#474747] rounded bg-custom-pink-1 hover:bg-custom-pink-3 transition-colors duration-300">
            미리보기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SaveCodeLayout;