import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { UserProvider } from './contexts/user.context.jsx'
import { ChatProvider } from './contexts/chat.context.jsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<BrowserRouter>
				<UserProvider>
					<ChatProvider>
						<App />
					</ChatProvider>
				</UserProvider>
			</BrowserRouter>
  	</React.StrictMode>
)
