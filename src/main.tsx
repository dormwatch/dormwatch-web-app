import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import { ClerkProvider } from '@clerk/clerk-react' // COMMENTED OUT - Clerk authentication
import { BrowserRouter } from 'react-router-dom'

// COMMENTED OUT - Clerk configuration
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
// 
// if (!PUBLISHABLE_KEY) {
//   throw new Error('❌ Missing Clerk Publishable Key. Add it to your .env file')
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* COMMENTED OUT - ClerkProvider wrapper */}
    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </ClerkProvider> */}
  </StrictMode>,
)