import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CodeLayout from '../../components/PostLayout/CodeLayout';

// 함수형 컴포넌트 PostDetailReq를 정의합니다.
function PostDetailReq() {
  const { postId } = useParams();
  const postIdNum = parseInt(postId, 10);
  const [post, setPost] = useState(null);  // 게시물 정보를 저장할 상태
  const [code, setCode] = useState(null);  // 코드 정보를 저장할 상태
  const redirect_uri = import.meta.env.VITE_BACK_REDIRECT_URI;
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const access_token = localStorage.getItem('access_token');
        const response = await axios.get(`${redirect_uri}/post/${postIdNum}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          }
        });
        const res = response.data;
        setPost(res);  // 응답받은 데이터로 post 상태 업데이트
        setCode(res.replyList);  // 댓글 리스트 상태 업데이트
      } catch (error) {
        console.error('게시물 불러오기 에러:', error);
      }
    };
    fetchPosts();
  }, [postId]);

  return (
    <div className='postDetail-container'>
      {post ? (
        <div>
          <h1 className='mt-4 ml-5 text-3xl'>제목:{post.title}</h1>
          <div className="flex justify-center mt-5 mb-5 p-5 border-t border-custom-pink-1">
            <div>
              <div className="mr-3 border border-custom-pink-2 w-[800px] h-[500px] rounded" >
                <img className="w-[800px] h-[500px]" src={`data:image/png;base64,${post.imgBase64}`} alt="사진" />
              </div>
              <p className='mt-2 mb-2 p-1 w-[800px] h-8 border border-[#d5d5d5] rounded'>작성자:{post.name}</p>
              <p className='mt-2 mb-2 p-1 w-[800px] h-[52px] border border-[#d5d5d5] rounded'>내용: {post.content}</p>
            </div>
            <div className='border border-custom-pink-2 p-2 w-[420px] h-[600px] rounded overflow-y-auto'>
              {code?.map(code => (
                <CodeLayout key={code.replyId} postId={post.postId} post={post} code={code} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default PostDetailReq; 