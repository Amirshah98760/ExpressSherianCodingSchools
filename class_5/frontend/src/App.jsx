import{ BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ShowPosts from './pages/ShowPosts'
import CreatePosts from './pages/CreatePosts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
 


const App = () => {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path='/create-posts' element={<CreatePosts />} />
        <Route path='/posts' element={<ShowPosts />} />
      </Routes>
    </Router>
  )
}

export default App