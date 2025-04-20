import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthUserProvider } from "./Context/AuthUserContext.jsx"
import { ElectionProvider } from "./Context/ElectionContext.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthUserProvider>
    <ElectionProvider>
    <App />
    </ElectionProvider>
    </AuthUserProvider>
  </StrictMode>,
)
