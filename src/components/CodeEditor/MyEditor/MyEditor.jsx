import { useState, useEffect, useCallback } from 'react'
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import Result from '../Result';
import CodeMirror from "@uiw/react-codemirror";
import '../styles/Editor.css';
import axios from "axios";

function MyEditor({onSaveMycode}) {
  const [html_edit, setHtml_Edit] = useState('');
  const [css_edit, setCss_Edit] = useState('');
  const [js_edit, setJs_Edit] = useState('');
  const [srcCode, setSrcCode] = useState('');
	const redirect_uri = import.meta.env.VITE_BACK_REDIRECT_URI;
	
// 	codeTitle 넘겨주기
	const [code_title, setCodeTitle] = useState('');
	const onChangeTitle = (e) => {
		setCodeTitle(e.target.value);
	};

// 기능1: result 컴포넌트에 editor에서 작성된 코드 넘겨주기
  const onChangeHtml = useCallback((value) => {
    setHtml_Edit(value);
  }, []);

  const onChangeCss = useCallback((value) => {
    setCss_Edit(value);
  }, []);

  const onChangeJavaScript = useCallback((value) => {
    setJs_Edit(value);
  }, []);
	
	// 	string 형식
  useEffect(() => {
    const srcCodeUpdated = `
      <body>${html_edit}</body>
      <style>${css_edit}</style>
      <script>${js_edit}</script>
    `;
    setSrcCode(srcCodeUpdated);
  }, [html_edit, css_edit, js_edit]);

  console.log(srcCode);
	
// 	기능3. 나만의 ide 코드 저장 기능
	useEffect(() => {
		const saveMyCode = async() => {
			const html = JSON.stringify(html_edit);
			const css = JSON.stringify(css_edit);
			const js = JSON.stringify(js_edit);
			const memberId = localStorage.getItem('member_id');
			const codeTitle = JSON.stringify(code_title);
			const code = {
				memberId: memberId,
				codeTitle: codeTitle,
				html: html,
				css: css,
				js: js,
			}
			try{
				const access_token = localStorage.getItem('access_token');
				const response = await axios.post(`${redirect_uri}/code`, code, {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${access_token}`,
					}
				});
				console.log('Save response:', response.data);
				console.log(code);
			} catch (error) {
				console.error('Error saving code:', error);
			}
		}
		onSaveMycode(saveMyCode);
	}, [onSaveMycode]);

// 	화면에 보여지는 코드 편집기 부분
  return (
    <div>
      <div className="editor-container">
		<div>
			<input type="text" value={code_title} onChange={onChangeTitle} placeholder="제목을 입력하세요." />
		</div>
        <div className="editor-grid">
          <div className="editor">
            <h2 className="editor-title">HTML</h2>
            <CodeMirror
              className="editor-text"
              value={html_edit}
              height="342px"
              theme="dark"
              extensions={[html(true)]}
              onChange={onChangeHtml}
            />
          </div>
          <div className="editor">
            <h2 className="editor-title">CSS</h2>
            <CodeMirror
              className="editor-text"
              value={css_edit}
              height="342px"
              theme="dark"
              extensions={[css(true)]}
              onChange={onChangeCss}
            />
          </div>
          <div className="editor">
            <h2 className="editor-title">JavaScript</h2>
            <CodeMirror
              className="editor-text"
              value={js_edit}
              height="342px"
              theme="dark"
              extensions={[javascript(true)]}
              onChange={onChangeJavaScript}
            />
          </div>
        </div>
        <Result srcCode={srcCode} />
      </div>
    </div>
  )
}

export default MyEditor;