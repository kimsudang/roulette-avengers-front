import { Link } from 'react-router-dom';

const MyPostLayout = ({ posts }) => {
		
  if (!posts || posts.length === 0) {
    return <div className="post-container">작성한 게시글이 없습니다.</div>;
  }

  return (
    <Link to={`/post/${posts.postId}`} key={posts.id} className="flex flex-col m-2.5 p-2.5 w-[270px] h-[300px] border border-[#d5d5d5] rounded">
      <div className="w-full h-[200px]">
        <img className="w-full h-[200px]" src={posts.image} alt="이미지"/> 
      </div>
      <div className="flex flex-col p-[5px]">
        <div className='mt-[5px] ml-0 mb-0 mr-0 p-1 text-[#474747]'>
          <p>제목: {posts.title}</p>
        </div>
        <div className="mt-[5px] ml-0 mb-0 mr-0 p-1 text-[#474747]">
          <p>작성시간: {posts.createdTime}</p>
        </div>
      </div>
    </Link>
  );
}

export default MyPostLayout;