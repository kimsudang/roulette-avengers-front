import { Link } from "react-router-dom";
import Mail from '../../assets/mail.png';
import axios from 'axios';

const CodeLayout = ({ postId, code }) => {
    const post_Id = postId;
    const backendURI = import.meta.env.VITE_BACK_REDIRECT_URI; // Using environment variable

    const startChating = async (memberId) => {
        const my_member_id = localStorage.getItem('member_id');
        const chat_member_id = memberId;
        const chat_message = '대화을 시작합니다.';
        
        try {
            const res = await axios.post(`${backendURI}/chat/start`, {
                sender: my_member_id,
                reciver: chat_member_id,
                message: chat_message,
            });
            console.log('대화 시작');
            window.location = `${backendURI}/chat/${my_member_id}`; // Using environment variable for redirection
        } catch (error) {
            alert('대화 요청을 실패하였습니다.');
        }
    };

    return (
        <div className='w-full h-[100px] border border-[#d5d5d5]'>
            <div className="flex justify-between items-center">
                <div>
                    <div>
                        <div className="flex p-2">
                            <div className="p-2">
                                <p>답변자: {code.memberName}</p>
                            </div>
                            <button onClick={() => startChating(code.memberId)} className="p-1 w-[40px] h-10 border border-custom-pink-1 text-[#474747] rounded bg-custom-pink-1 hover:bg-custom-pink-3 transition-colors duration-300">
                                <img className="w-[30px]" src={Mail} />
                            </button>
                        </div>
                        <div className="ml-2 p-2">
                            <p>작성시간: {code.createTime}</p>
                        </div>
                    </div>
                </div>
                <Link to={`/post/preview?postId=${post_Id}&replyId=${code.replyId}`} className="mr-2 p-2 h-10 border border-custom-pink-1 text-[#474747] rounded bg-custom-pink-1 hover:bg-custom-pink-3 transition-colors duration-300">
                    미리보기
                </Link>
            </div>
        </div>
    );
};

export default CodeLayout;