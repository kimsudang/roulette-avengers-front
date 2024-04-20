import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 3000,
    host: true,
  },
	define: {
		'process.env': {
			VITE_KAKAO_REDIRECT_URI: JSON.stringify(import.meta.env.VITE_KAKAO_REDIRECT_URI)
		}
	}
})
