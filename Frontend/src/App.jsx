import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home"
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptaionLogin from './pages/CaptaionLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import { Layout } from './components/Layout'
import { ThemeProvider } from './components/DarkTheme'

const App = () => {
  return (
    <div>
      <ThemeProvider defaultTheme='system'>

      <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<UserLogin/>}/>
          <Route path='/signup' element={<UserSignUp/>}/>
          <Route path='/captain-login' element={<CaptaionLogin/>}/>
          <Route path='/captain-signup' element={<CaptainSignUp/>}/>
        </Routes>
      </Layout>
      </ThemeProvider>
    </div>
  )
}

export default App