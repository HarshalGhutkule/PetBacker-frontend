import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AddService } from './Components/AddService';
import { ConfirmOtp } from './Components/ConfirmOtp';
import { Dashboard } from './Components/Dashboard';
import { DetailPage } from './Components/DetailPage';
import { EditService } from './Components/EditService';
import { Home } from './Components/Home';
import { LogIn } from './Components/Login';
import { Navbar } from './Components/Navbar';
import { Offline } from './Components/Offline';
import { PetDetail } from './Components/PetDetail';
import { Profile } from './Components/Profile';
import { ReservationRequest } from './Components/ReservationRequest';
import { SignUp } from './Components/SignUp';
import { UserDashboard } from './Components/UserDashboard';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/AddService' element={<AddService/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/ConfirmOtp' element={<ConfirmOtp/>}/>
        <Route path='/LogIn' element={<LogIn/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/DetailPage/:id' element={<DetailPage/>}/>
        <Route path='/EditService/:id' element={<EditService/>}/>
        <Route path='/PetDetail/:id' element={<PetDetail/>}/>
        <Route path='/UserDashboard' element={<UserDashboard/>}/>
        <Route path='/ReservationRequest' element={<ReservationRequest/>}/>
        <Route path='*' element={<Offline/>}/>
      </Routes>
    </div>
  );
}

export default App;
