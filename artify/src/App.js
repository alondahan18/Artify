import './App.css';
import SignUp from './Signup/Signup';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Login/Login';
import Quiz from './Quiz/Quiz';
import Studying from './Studying/Studying';
import Filters from './Filters/Filters';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" Component= {Login}></Route>
      <Route path="/SignUp" Component= {SignUp}></Route>
      <Route path="/Filters" Component= {Filters}></Route>
      <Route path="/Studying" Component= {Studying}></Route>
      <Route path="/Quiz" Component= {Quiz}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
