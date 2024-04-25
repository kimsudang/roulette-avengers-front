import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PreEditor from '../../components/CodeEditor/PreEditor/PreEditor';

const PostCodePreview = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
	const postId = searchParams.get('postId');
  const postIdNum = parseInt(postId, 10);
  const replyId = searchParams.get('replyId');
  const replyIdNum = parseInt(replyId, 10);
  const [code, setCode] = useState([]);
	const redirect_uri = import.meta.env.VITE_BACK_REDIRECT_URI;

	
	useEffect(() => {
		const fetchcode = async () => {
			try {
				const access_token = localStorage.getItem('access_token');
        const replyIdPayload = { replyId: replyIdNum };
				console.log('replyIdPayload');
				const response = await axios.post(`${redirect_uri}/post/preview`, replyIdPayload, {
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${access_token}`,
						}
					});
					console.log('replyIdPayload');
					const res = response.data;
					setCode(res);

				} catch (error) {
					console.error('Error fetching posts:', error);
					console.log('replyIdPayload');
				}
			};
    fetchcode();
  }, [replyIdNum]);
	
  // 
  return (
    <div>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <h1>{code.title}</h1>
      </div>
      <PreEditor postId={postIdNum} code={code}/>
    </div>
  );
}

export default PostCodePreview;