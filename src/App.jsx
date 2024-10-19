
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './routes/Router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function App() {


  return (
      <div className='mx-auto' >
        <RouterProvider router={router} />
     </div>
  )
}

export default App;
