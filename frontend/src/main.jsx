import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import SignUpSection from './pages/auth/Signup.jsx';
import LoginSection from './pages/auth/Login.jsx';
import BlogSection from './Components/UserPage/Home.jsx';
import UserLayout from './UserLayout.jsx';
import UserProfile from './Components/UserPage/UserProfile.jsx';
import MyForm from './Components/BlogInput/BlogPost.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserLayout />}>
          <Route path="" element={<BlogSection />} />
          <Route path="userprofile" element={<UserProfile/>} />
          <Route path="write" element={<MyForm/>} />
        </Route>
        <Route path="/auth" element={<LoginSection/>}/>
        <Route path="/signup" element={<SignUpSection/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
