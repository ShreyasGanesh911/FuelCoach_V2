import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './sections/Home';
import Navbar from './sections/Navbar';
import SideBar from './global/SideBar';
import Login from './sections/Login';
import Signup from './sections/Signup';
import Profile from './sections/Profile';
import OverView from './sections/OverView';
import Blog from './sections/Blog';
import LogFood from './sections/LogFood';
import Recipes from './sections/Recipes';
import PageNotFound from './sections/PageNotFound';
import UserState from './Context/userContext';
import About from './sections/About';

function App() {
  return (
    <UserState>
    <BrowserRouter>
    <Navbar/>
    
      <Routes>

        <Route path='' element={<Home/> }></Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='signup' element={<Signup/>}></Route>
        <Route path='/' element={<SideBar/> } >
          <Route path='OverView' element={<OverView/>}></Route>
          <Route path='profile' element={<Profile/>}></Route>
          <Route path='blogs' element={<Blog/>}></Route>
          <Route path='LogFood' element={<LogFood/>}></Route>
          <Route path='about' element={<About/>}></Route>
          <Route path='recipes' element={<Recipes/>}></Route>
        </Route>
        <Route path='*' element={<PageNotFound/>}></Route>
      </Routes>
    </BrowserRouter>
    </UserState>
  );
}

export default App;
