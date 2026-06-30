import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import EventPage from './pages/EventPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="events/:eventId" element={<EventPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="results" element={<ResultsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
