import './App.css';
import Signup from './Signup/Signup';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Login/Login';
import Quiz from './Quiz/Quiz';
import Studying from './Studying/Studying';
import Filters from './Filters/Filters';
import Scoreboard from './Scoreboard/Scoreboard';
import Collection from './Collection/Collection';
function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" Component= {Login}></Route>
      <Route path="/Signup" Component= {Signup}></Route>
      <Route path="/Filters" Component= {Filters}></Route>
      <Route path="/Studying" Component= {Studying}></Route>
      <Route path="/Quiz" Component= {Quiz}></Route>
      <Route path="/Collection" Component= {Collection}></Route>
      <Route path="/Scoreboard" Component= {Scoreboard}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
