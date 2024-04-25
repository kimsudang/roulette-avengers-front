import axios from "axios";
import { useEffect, useState } from "react";
import SaveCodeLayout from "../../components/PostLayout/SaveCode/SaveCodeLayout";

const SaveCodeList = () => {
  const [code, setCode] = useState('');
  const back = 'https://k9bceeba41403a.user-app.krampoline.com/mypage/code';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get(`${back}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const myCodes = response.data;
        console.log(myCodes);
        setCode(myCodes);
      } catch (error) {
        console.error('Error fetching posts: ', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ml-[10%] mr-[10%] mb-10 justify-items-center'>
      {code?.map(code => (
        <SaveCodeLayout key={code.replyId} code={code} />
      ))}
    </div>
  )
}

export default SaveCodeList