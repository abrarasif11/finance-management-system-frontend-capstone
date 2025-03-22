
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './routes/Router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from 'react-hot-toast';
function App() {


  return (
      <div className='mx-auto poppins-regular' >
        <Toaster/>
        <RouterProvider router={router} />
     </div>
  )
}

export default App;
