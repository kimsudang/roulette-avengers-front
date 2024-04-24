import MyEditor from "../../components/CodeEditor/MyEditor/MyEditor";

const MyCodeIDE = () => {
	
  const handleCodeSave = () => {
		console.log('코드 저장 중...')
	};
	
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="mt-3 ml-2.5 text-3xl font-bold">Roulette IDE</h1>
        <div style={{alignItems:"center"}}>
          <button onClick={handleCodeSave} className="w-[100px] h-10 m-2.5 text-xl"> 저장 </button>
        </div>
      </div>
      <MyEditor onSaveMycode={handleCodeSave} />
    </div>
  );
}

export default MyCodeIDE;