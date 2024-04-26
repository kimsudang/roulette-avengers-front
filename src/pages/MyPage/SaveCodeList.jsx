import { useEffect, useState } from "react";
import SaveCodeLayout from "../../components/PostLayout/SaveCode/SaveCodeLayout"
import axios from "axios";

const SaveCodeList = () => {
  const [codes, setCodes] = useState([]);
	const redirect_uri = import.meta.env.VITE_BACK_REDIRECT_URI;
	
	useEffect(() => {
		const fetchmycode = async () => {
			try {
				const access_token = localStorage.getItem('access_token');
				const response = await axios.get(`${redirect_uri}/mypage/code`, {
					headers : {
						Authorization: `Bearer ${access_token}`,
					}
				});
				const mycodes = response.data;
				console.log('response: ',mycodes);
				setCodes(mycodes);
			} catch(error) {
				console.error('Failed to fetch codes: ',error);
			}
		}
		fetchmycode();
	}, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center pt-5 pb-5 border border-b-custom-pink-1">
        <p className="text-3xl font-semibold ">저장한 코드 목록</p>
      </div>
      <div>
        <div className="flex justify-center pt-10 pb-10">
          <div className="flex w-1/2 h-screen border border-black rounded overflow-y-auto">
						{Array.isArray(codes) && codes.map((code, index) => (
							<SaveCodeLayout key={code.codeId} code={code} index={index} />
						))}
          </div>
        </div>
      </div> 
    </div>
  )
}

export default SaveCodeList;