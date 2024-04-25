import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const PostLayout = ({post}) => {
	const navigate = useNavigate();
	const back = 'https://k9bceeba41403a.user-app.krampoline.com';

	const startChating = async () => {
		const my_member_id = localStorage.getItem('member_id');
		const chat_member_id = post.memberId;
		const chat_message = '대화을 시작합니다.';

		try {
			const res = await axios.post(`${back}/chat/start`, {
				sender: my_member_id,
				reciver: chat_member_id,
				message: chat_message,
			});
			console.log('대화 시작');
			navigate(`${back}/chat/start?memberId=${post.memberId}`);
		} catch (error) {
			alert('대화 요청을 실패하였습니다.');
		}
	};

	if (!post || post.length === 0) {
		return <div className="post-container">게시글이 없습니다.</div>;
	}
		
	return (
		<div className="flex flex-col w-[270px] h-[350px] border border-custom-pink-1 p-2.5 rounded">
			<Link to={`/post/${post.postId}`}>
				<div className="w-full h-[200px]">
				<img className='w-full h-[200px]' src={`data:image/png;base64,${post.imgBase64}`} alt="사진" />
				</div>
				<div className="mt-2.5 mb-1 w-full h-fit-content">
					<p className="m-0 p-1 text-[#474747]">제목: {post.title}</p>
					<div className="dropdown-container">
						<button onClick={startChating} className='mt-[5px] ml-0 mb-0 mr-0 p-1 text-[#474747]'>
							작성자: {post.name}
						</button>
					</div>
				</div>
			</Link>
			<div className="flex justify-around">
				<Link to={`/reply?postId=${post.postId}`} className="w-[80px] h-10 bg-[#ff9e9e9] py-1.5 px-2.5 border border-custom-pink-1 text-[#474747] no-underline rounded bg-custom-pink-1 hover:bg-custom-pink-3 transition-colors duration-300">
					답변하기
				</Link>
				<button onClick={startChating} className="w-[80px] h-10 border border-custom-pink-1 text-[#474747] rounded bg-custom-pink-1 hover:bg-custom-pink-3 transition-colors duration-300">
					채팅
				</button>
			</div>
		</div>
	);
};
  
export default PostLayout;