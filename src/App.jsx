import { Routes, Route } from 'react-router-dom'
import Report from '@/pages/user/Report'
import DashBoard from '@/pages/user/DashBoard'
import Quiz from '@/pages/user/Quiz'
import Main from '@/pages/user/Main'

/*
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
`
*/

function App() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<DashBoard />} />
      <Route path="/report" element={<Report />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  )
}
/*
function App() {
  return (
    <>
      <GlobalStyle />

      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<DashBoard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </>
  )
}
*/

export default App