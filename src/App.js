import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { login, selectUser, logout} from './features/userSlice';
import Feed from './Feed';
import { auth } from './firebase';
import Header from './Header';
import Login from './Login';
import Sidebar from './Sidebar';
import Widgets from './Widgets';

function App() {
const user = useSelector(selectUser);
  const dispatch = useDispatch();


useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
  //user log out
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
         photoUrl  : userAuth.photoUrl  
        }));
        
      } else {
        //user is log out
        dispatch(logout());
}
    });
  }, [dispatch]);
  

  return (
      <div className="app">
      
      {!user ? (<Login />) : (
        
        <div>
           <Header />
            <div className="app_body">
             <Sidebar />
             <Feed />
              <Widgets />
             </div>
         </div>
         )}
     </div>
   
  );
  
}

export default App;