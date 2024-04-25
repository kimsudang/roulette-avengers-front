import { Link } from "react-router-dom";
import PostLayout from "../../components/PostLayout/PostLayout";
import axios from "axios";
import { useEffect, useState } from "react";

const BoardMain = ({ defaultCurrentPage }) => {
	const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage); 
  
  const redirect_uri = import.meta.env.VITE_BACK_REDIRECT_URI;

// 메인페이지 default : page = 0
  useEffect(() => {
		const fetchPosts = async () => {
			const access_token = localStorage.getItem('access_token');
				try {
					const response = await axios.get(`${redirect_uri}/post/list/${currentPage}`, {
						headers: {
							Authorization: `Bearer ${access_token}`
						}
					});
					const res = response.data;
					setPosts(res.content);
					setTotalPages(res.totalPages);
				} catch (error) {
					console.error('Error fetching posts:', error);
				}
			};
    fetchPosts();
  }, [currentPage]); // currentPage가 변경될 때마다 fetchPosts 함수를 호출합니다.

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col">
      <h1 className='mt-6 mb-2 pb-4 pl-[160px] text-3xl font-bold'> 게시판 </h1>
      <div className="w-full border-t border-custom-pink-1" >
        <div className="flex flex-row-reverse">
          <Link to="/code/ask" className='mt-5 mb-5 mr-[160px] pt-1 pb-1 pl-3 pr-3 border border-custom-pink-1 bg-custom-pink-2 text-[#474747] no-underline rounded'> 
            질문하기
          </Link>
        </div>
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ml-[10%] mr-[10%] mb-10 justify-items-center'>
          {posts?.map(post => (
            <PostLayout key={post.postId} post={post} />
          ))}
        </div>
      </div>
      <div className="pagination">
        {[...Array(totalPages).keys()].map(pageNumber => (
          <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BoardMain;