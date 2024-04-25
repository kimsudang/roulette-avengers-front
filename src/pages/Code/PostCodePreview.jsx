import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PreEditor from '../../components/CodeEditor/PreEditor/PreEditor';

const PostCodePreview = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
	console.log(searchParams);
	const postId = searchParams.get('postId');
	console.log(postId, typeof(postId));
  const postIdNum = parseInt(postId, 10);
	console.log(postIdNum, typeof(postIdNum));
  const replyId = searchParams.get('replyId');
	console.log(replyId, typeof(replyId));
  const replyIdNum = parseInt(replyId, 10);
	console.log(replyIdNum, typeof(replyIdNum));
  const [code, setCode] = useState([]);
	const redirect_uri = import.meta.env.VITE_BACK_REDIRECT_URI;
	
	
	// useEffect(() => {
	// 	const fetchcode = async () => {
	// 		try {
	// 			const access_token = localStorage.getItem('access_token');
	// 			// const replyIdPayload = { 
	// 			// 	replyId: replyIdNum
	// 			// };
	// 			console.log(replyIdNum+1);
	// 			console.log(replyIdPayload);
	// 			// const response = await axios.post(`${redirect_uri}/post/preview`, replyIdPayload, {
	// 			const response = await axios.get(`${redirect_uri}/post/preview/${replyIdNum}`,)
	// 					headers: {
	// 						'Content-Type': 'application/json',
	// 						Authorization: `Bearer ${access_token}`,
	// 					}
	// 				});
	// 				console.log(replyIdPayload);
	// 				const res = response.data;
	// 				setCode(res);

	// 			} catch (error) {
	// 				console.error('Error fetching posts:', error);
	// 			}
	// 		};
	// fetchcode();
	// }, [replyIdNum]);
	
	useEffect(() => {
    const fetchcode = async () => {
      try {
        const access_token = localStorage.getItem('access_token');
        const response = await axios.get(`${redirect_uri}/post/preview/${replyIdNum}`, {
          Headers : {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${access_token}`,
            }
          }
        })
        const res = response.data;
        setCode(res);
      } catch (error) {
        console.log('Error fetching codes: ', error);
      }
    }
    fetchcode();  
  }, []);
	
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