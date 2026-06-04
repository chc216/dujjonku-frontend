import { Routes, Route } from 'react-router-dom'
import Report from '@/pages/user/Report'
import DashBoard from '@/pages/user/DashBoard'
import Quiz from '@/pages/user/Quiz'
import Main from '@/pages/user/Main'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/report" element={<Report />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  )
}

export default App