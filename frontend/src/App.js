import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


import Translatertestpage from "./pages/Translationsarindu";
import TranslatorHistory from "./pages/TranslatorHistory";
import VoiceToTextPage from "./pages/VoiceToTextPage"
import Imt2Txt from './components/Img-2-Txt'
import Navbar from "./components/Navbar";
import FileUpload from "./components/FileUpload";
import Edit from "./components/Historyedit";

import Register from './components/Register';
import Login from './components/Login'
import FogotPassword from './components/FogotPassword'
import ResetPassword from './components/ResetPassword'
//import NavBar from './components/NavBar';
import AdminHome from './components/AdminHome';
import AdminSideRegister from './components/AdminSideRegister';
import ChangePass from './components/ChangePass';
import Profile from './components/Profile';
import 'react-toastify/dist/ReactToastify.css';
import AllPost from './components/AllPost';
import CreatePost from './components/CreatePost';
import SelectedPost from './components/SelectedPost';
import UpdatePost from './components/UpdatePost';
import ViewAllUsers from './components/ViewAllUsers';
import UpdateUser from './components/UpdateUser';


function App() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(localStorage.getItem('role') ? localStorage.getItem('role') : "");

  })


  // Function to handle beforeunload event
  const handleBeforeUnload = () => {
    // Clear the user data from localStorage when the browser is closed
    localStorage.removeItem('role');
  };
  return (
    <>
    <div className="App">

      <ToastContainer autoClose={3000} />
      <Navbar />

      {
        user === "admin" ? (

          <Router>
            <Routes>
              <Route path='/adminHome' element={<AdminHome />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/resetPassword' element={<ResetPassword />} />
              <Route path='/getUsers' element={<ViewAllUsers />} />
              <Route path='/updateUsers/:userId' element={<UpdateUser />} />
              <Route path="/allpost" element={<AllPost />} />
              <Route path="/post/:postId" element={<SelectedPost />} />

          


            </Routes>
          </Router>

        ) : user === 'user' ? (


          <Router>

            <Routes>

              {/*<Route exact path='/userHome/:token/:role' element={<UserHome />} />*/}
              <Route path='/home' element={<Translatertestpage />} />
              <Route path='/pdf-Translation' element={<FileUpload />} />
              <Route path='/imageRecognition' element={<Imt2Txt />} />
              <Route path='/translatorhistory' element={<TranslatorHistory />} />
              <Route path='/historyedit/:Id' element={<Edit />} />
              <Route path='/voicetotexttage' element={<VoiceToTextPage />} />
              
              <Route path='/profile' element={<Profile />} />
              <Route path='/resetPassword' element={<ResetPassword />} />
              <Route path="/allpost" element={<AllPost />} />
              <Route path="/post/:postId" element={<SelectedPost />} />
              <Route path="/editpost/:postId" element={<UpdatePost />} />
              <Route path="/createpost" element={<CreatePost />} />
            
          

            </Routes>

          </Router>


        ) : null

      }


      <Router>
        <Routes>

          <Route path='/' element={<Login />} />
          <Route path="/adminRegister" element={<AdminSideRegister />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/fogotPassword' element={<FogotPassword />} />
          <Route path='/changePassword/:email' element={<ChangePass />} />
          {/*<Route path="/*" element={<Profile />} />*/}

        </Routes>
      </Router>

      { /*<Footer />*/}
    </div>
  </>
  );
}

export default App;


// function App() {
//   const AppLayout = () => (
//     <>
//       <Navbar/>
//       <Outlet />
//     </>
//   );
  
//   const router = createBrowserRouter([
//     {
      
//       element: <AppLayout />,
//       children: [
//         {
//           path: "/",
//           element:<Translatertestpage />
//         },
//         {
//           path: "pdf-Translation",
//           element: <FileUpload />,
//         },
//         {
//           path: "imageRecognition",
//           element: <Imt2Txt />,
//         },
//         {
//           path: "home",
//           element: <Home/>,
//         },
//         {
//           path: "translatorhistory",
//           element: <TranslatorHistory />,
//         },
//         {
//           path: "historyedit/:Id",
//           element: <Edit />,
//         },
//         {
//           path: "voicetotexttage",
//           element: <VoiceToTextPage />,
//         },
//       ],
//     },
//   ]);
//   createRoot(document.getElementById("root")).render(
//     <RouterProvider router={router} />
//   );
  
// }

// export default App;