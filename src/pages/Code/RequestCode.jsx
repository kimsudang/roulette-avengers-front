import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CodeQuestion () {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();
	
// 	axios 통신시 필요한 변수
	const redirect_uri = 'https://k9bceeba41403a.user-app.krampoline.com/post/ask';
	const access_token = localStorage.getItem('access_token');
	const member_id = localStorage.getItem('member_id');
	
// 	제목 및 본문 내용 저장.
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleInputChange = (e) => {
    setContents(e.target.value);
  };

// 	이미지 유형 확인 및 이미지 업로드 기능
	const allowedExtensions = ['png'];

	const isImageFile = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    return allowedExtensions.includes(ext);
	};

	const handleImageChange = (e) => {
    if (e.target.files[0]) {
			const file = e.target.files[0];
			const filename = file.name.toLowerCase();
			const isValidExtension = isImageFile(filename);
        
			if (!isValidExtension) {
				alert('png만 업로드할 수 있습니다.');
				return;
			}  
			setImage(file);
    }
	};

	
//작성하기 버튼 클릭시 post 정보를 db에 전달.(member_id 처리는 어떻게 할건지?)
  const handlePostSubmit = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('contents', contents);
		formData.append('member_id', member_id);
    try {
      const response = await axios.post( `${redirect_uri}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${access_token}`,
        },
      });

      console.log('Server response:', response);
      navigate("/post/list/0");
    } catch (error) {
      console.error('Error posting the data', error);
			console.log(formData);
    }
  };

	
// 글 작성 페이지 화면
  return (
    <div className="flex-col">
      <div className="flex justify-center h-[50px] p-2 border border-b-black">
        <div className="text-3xl"> 질문하기 </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col w-1/2 mt-4 p-2.5 border border-black rounded">
          <input 
            type="text" 
            value={title} 
            onChange={handleTitleChange} 
            placeholder="제목"
            className="mb-3 border border-[#d5d5d5] rounded"
          />
          <textarea
            value={contents} 
            onChange={handleInputChange} 
            placeholder="내용"
            className="mx-auto mb-3 h-[200px] w-full resize-none overflow-y-auto border border-[#d5d5d5] rounded"
          />
          <input 
            type="file" 
            onChange={handleImageChange} 
            className=""
            style={{margin:"5px 0px"}}
          />
          <div className="flex justify-center">
            <button className="w-[200px] bg-[#d5d5d5] border border-black rounded hover:bg-[#9c9c9c] transition-colors duration-300" onClick={handlePostSubmit}>작성하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeQuestion;