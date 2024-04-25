import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import MyPostLayout from "../../components/PostLayout/MyPost/MyPostLayout";
import axios from "axios";

const RequestList = () => {
	const [posts, setPosts] = useState([]);
	const back = 'https://k9bceeba41403a.user-app.krampoline.com/mypage/list';
	
	useEffect(() => {
	  const fetchPosts = async () => {
		try {
		  const accessToken = localStorage.getItem('access_token');
		  const response = await axios.get(`${back}`, {
			headers: {
			  Authorization: `Bearer ${accessToken}`,
			},
		  });
		  const myPosts = response.data;
		  console.log('가져온 게시글:', myPosts); // 데이터 구조 확인
		  setPosts(myPosts.postList);
		} catch (error) {
		  console.error('게시글 가져오기 오류:', error);
		  // setPosts([]); // 필요에 따라 posts를 재설정하거나 처리
		}
	  };
	  fetchPosts();
	}, []);

	return (
		<div>
			<h1 className='mt-4 mb-4 pb-4 pl-[160px] border-b text-3xl font-bold'>내 질문 목록</h1>
			<div className="flex flex-row-reverse">
				<Link to="/post/ask" className='mt-5 mb-5 mr-[160px] pt-1 pb-1 pl-3 pr-3 border border-[#ff9e9e] bg-[#FFE6E6] text-[#474747] no-underline'> 질문하기 </Link>
			</div>
			<div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ml-[10%] mr-[10%] mb-10 justify-items-center'>
			  {posts?.map(post => (
				<MyPostLayout key={posts.postId} post={post} />
			  ))}
        	</div>
		</div>
	)
};

export default RequestList;