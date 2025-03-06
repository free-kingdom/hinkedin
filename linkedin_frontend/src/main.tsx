import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="m-4 p-4 border font-bold text-xl">
      hello react
    </div>
  </StrictMode>,
)
