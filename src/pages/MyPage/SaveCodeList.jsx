import { useEffect, useState } from "react";
import SaveCodeLayout from "../../components/PostLayout/SaveCode/SaveCodeLayout"
import axios from "axios";

const SaveCodeList = () => {
  const [codes, setCodes] = useState([]);
  const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

  useEffect(() => {
    const loadSaveCodeList = async () => {
      try {
        const access_token =  localStorage.getItem('access_token');
        const response = await axios.get(`${redirect_uri}/code`, {
          headers : {
            Authorization: `Bearer ${access_token}`,
          }
        });
        const res = response.data;
        console.log(res);
        setCodes(res);
      } catch (error) {
        console.error('Failed to get saved code list: ', error);
      }
    } 
    loadSaveCodeList();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center pt-5 pb-5 border border-b-custom-pink-1">
        <p className="text-3xl font-semibold ">저장한 코드 목록</p>
      </div>
      <div>
        <div className="flex justify-center pt-10 pb-10">
          <div className="flex w-1/2 h-screen border border-black rounded overflow-y-auto">
						{Array.isArray(codes) && codes.map(code => (
							<SaveCodeLayout code={code} />
						))}
          </div>
        </div>
      </div> 
    </div>
  )
}

export default SaveCodeList;