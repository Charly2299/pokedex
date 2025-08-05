
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/App.tsx'
import { BrowserRouter } from 'react-router'
import { NameProvider } from './context/nameContext.tsx'
import { ThemeProvider } from './context/darkContext';
import { TrainerProvider } from './context/trainerContext'; // Import TrainerProvider

createRoot(document.getElementById('root')!).render(
     <ThemeProvider>
      <TrainerProvider>
  <NameProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </NameProvider>
  </TrainerProvider>
  </ThemeProvider>
)
