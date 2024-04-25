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
    <div className="Request-container" style={{display:"flex", flexDirection:"column", padding:"10px" ,border: "1px solid black", borderRadius:"3px"}}>
      <input 
        type="text" 
        value={title} 
        onChange={handleTitleChange} 
        placeholder="제목"
        style={{margin:"5px 0px", width:"50%"}}
		  required
      />
      <textarea
        value={contents} 
        onChange={handleInputChange} 
        placeholder="내용"
        style={{
          margin:"auto",
          height:"200px",
          width: "100%",
          resize: "none",
          overflowY: "auto"}}
		  required
      />
      <input 
        type="file" 
        onChange={handleImageChange} 
        style={{margin:"5px 0px"}}
      />
      <button onClick={handlePostSubmit}>작성하기</button>
    </div>
  );
}

export default CodeQuestion;