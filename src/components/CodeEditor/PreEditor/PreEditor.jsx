import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react'
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import Result from '../Result';
import CodeMirror from "@uiw/react-codemirror";
import '../styles/Editor.css';
import axios from "axios";

function PreEditor({postId, code}) {
	const navigate = useNavigate();
	const [html_edit, setHtml_Edit] = useState('');
	const [css_edit, setCss_Edit] = useState('');
	const [js_edit, setJs_Edit] = useState('');
	const [srcCode, setSrcCode] = useState('');
	const redirect_uri = import.meta.env.VITE_BACK_REDIRECT_URI;
	const postIdNum = postId;
	
	useEffect(() => {
    // code 값이 변화할 때 초기 값을 설정하고, srcCode를 업데이트합니다.
    const htmlContent = code.html ? JSON.parse(code.html) : '';
    const cssContent = code.css ? JSON.parse(code.css) : '';
    const jsContent = code.js ? JSON.parse(code.js) : '';

    setHtml_Edit(htmlContent);
    setCss_Edit(cssContent);
    setJs_Edit(jsContent);

    const initialSrcCode = `
			<body>${htmlContent}</body>
			<style>${cssContent}</style>
			<script>${jsContent}</script>
		`;
    setSrcCode(initialSrcCode);
	}, [code]);
	
	const onChangeHtml = useCallback((value) => {
		setHtml_Edit(value);
	}, []);

	const onChangeCss = useCallback((value) => {
		setCss_Edit(value);
	}, []);

	const onChangeJavaScript = useCallback((value) => {
		setJs_Edit(value);
	}, []);

	useEffect(() => {
		const srcCodeUpdated = `
			<body>${html_edit}</body>
			<style>${css_edit}</style>
			<script>${js_edit}</script>
		`;
		setSrcCode(srcCodeUpdated);
	}, [html_edit, css_edit, js_edit]);

	// const choiceCode = async () => {
	// 	const html = JSON.stringify(html_edit);
	// 	const css = JSON.stringify(css_edit);
	// 	const js = JSON.stringify(js_edit);
	// 	const memberId = localStorage.getItem('member_id');
	// 	const code = {
	// 		memberId: memberId,
	// 		postId: postIdNum,
	// 		html: html,
	// 		css: css,
	// 		js: js,
	// 	};
	// 	try {
	// 		const access_token = localStorage.getItem('access_token');
	// 		const response = await axios.post(`${redirect_uri}/post/choice`, code, {
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				'Authorization': `Bearer ${access_token}`,
	// 			}
	// 		});
	// 		console.log('Save response:', response.data);
	// 		navigate('/post/list/0');
	// 	} catch (error) {
	// 		console.error('Error saving code:', error);
	// 	}
	// };
	const choicecode = async () => {
		const html = JSON.stringify(html_edit);
		const css = JSON.stringify(css_edit);
		const js = JSON.stringify(js_edit);
		const memberId = localStorage.getItem('member_id');
		try {
			const access_token = localStorage.getItem('access_token');
			const response = await axios.get(`${redirect_uri}/post/choice/${memberId}/${postIdNum}/${html}${css}/${js}`, {
				headers: { 
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${access_token}`,
				}
			});
			console.log('Save response:', response.data);
			navigate('/post/list/0');
		} catch (error) {
			console.error('Error choice code:', error);
		}
	}
	
// 	화면에 보여지는 코드 편집기 부분
  return (
    <div>
			<button onClick={choiceCode} style={{width:"100px", height:"40px", margin:"10px 10px", fontSize:"20px"}}> 채택 </button>
      <div className="editor-container">
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

export default PreEditor;