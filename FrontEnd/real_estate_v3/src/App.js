import './css/header.css';
import './css/footer.css';
import './css/login.css';
import './css/investor-dangtin.css';
import './css/customer-fillter.css';
import './css/customer-trangchu-banvila.css';
import './css/customer-chaomung.css';
import './css/customer-gioithieu.css';
import './css/customer-lienhe.css';
import './css/customer-dangki.css';
import './css/investor-quanlitindang.css';
import './css/investor-thongtintaikhoan.css';
import './css/investor-menu.css';
import './css/investor-chinhsuatindang.css';
import './css/agency-duyettindang.css';
import './css/agency-xemlichdat.css';
import './css/customer-dondat.css';
import './css/investor-thongtinchitiet.css'
import './css/customer-thongtinchitiet.css'

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './header-footer/Header';
import Header2 from './header-footer/Header2';
import Footer from './header-footer/Footer';
import Body1 from './components/Body1';
import Login from './components/Login';
import Dangki from './components/Dangki';
import Logout from './components/Logout';
import Home2 from './components/Home2';

import Adminmain from './components/Admin/admin-main';
import Adminallaccount from './components/Admin/admin-allaccount';


import InvestorDangtin from './components/Investor/investor-dangtin';
import Quanlitindang from './components/Investor/investor-quanlitindang';
import Investorthongtintaikhoan from './components/Investor/investor-thongtintaikhoan';
import InvestorTindang from './components/Investor/investor-chinhsuatindang';
import Investorthongtinchitiet from './components/Investor/investor-thongtinchitiet';
import Investordangtinmain from './components/Investor/investor-dangtinmain';

import AuthRoleFilter from './authentication/AuthRoleFilter';
import Agencytindang from './components/Agency/agency-tindang';
import Agencythongtinchitiet from './components/Agency/agency-thongtinchitiet';
import Agencyduyettindang from './components/Agency/agency-duyettindang';
import Agencyxemlichdat from './components/Agency/agency-xemlichdat';


import TrangChu from './components/Customer/customer-trangchu';
import Customergioithieu from './components/Customer/customer-gioithieu';
import Customerthongtinchitiet from './components/Customer/customer-thongtinchitiet';
import Customerthongtintaikhoan from './components/Customer/customer-thongtintaikhoan';
import Customerlienhe from './components/Customer/customer-lienhe';
import Customerdondat from './components/Customer/customer-dondat';
function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [initialPageLoad, setInitialPageLoad] = useState(true);

  const handleLoginSuccess = (userLoginBasicInformationDto) => {
    // Callback function to update user information in App.js state
    setUserInfo(userLoginBasicInformationDto);
  };

  useEffect(() => {
    // Once the component mounts, update the state to indicate that the initial page load is complete
    setInitialPageLoad(false);
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Header should be rendered outside Routes */}
        <Header />
        <Header2 />
        <Routes>
          <Route
            path="/"
            element={initialPageLoad ? <Navigate to="/trangchu" replace /> : <Navigate to="/" />}
          />
          <Route path="/dangnhap" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          {/* <Route
            path="/home2"
            element={
              <AuthRoleFilter>
                <Home2 />
              </AuthRoleFilter>
            }
          /> */}
          {/* <Route
            path="/home"
            element={
              <AuthRoleFilter>
                <Home />
              </AuthRoleFilter>
            }
          /> */}

          <Route path="/Logout" element={<Logout />} /> done
          <Route path="/dangki" element={<Dangki />} /> done
          <Route path="/trangchu" element={<TrangChu />} /> done

          <Route path="/adminmain" element={<Adminmain />} />

          <Route path="/quanlitindang" element={<Quanlitindang />} />  done
          <Route path="/acencytindang" element={<Agencytindang />} />done
          <Route path="/agencythongtinchitiet" element={<Agencythongtinchitiet />} />
          <Route path="/agencythongtinchitiet/:id" element={<Agencythongtinchitiet />} />
          <Route path="/xemlichdat" element={<Agencyxemlichdat />} /> done
          <Route path="/duyettindang" element={<Agencyduyettindang />} /> done

          <Route path="/inestortindangmain" element={<Investordangtinmain />} />done
          <Route path="/chinhsuatindang" element={<InvestorTindang />} /> done
          <Route path="/investorthongtintaikhoan" element={<Investorthongtintaikhoan />} /> chua
          <Route path="/investorthongtinchitiet" element={<Investorthongtinchitiet />} />done
          <Route path="/investorthongtinchitiet/:id" element={<Investorthongtinchitiet />} />done
          <Route path="/investordangtin" element={<InvestorDangtin />} /> done

          <Route path="/gioithieu" element={<Customergioithieu />} /> done
          <Route path="/dondat" element={<Customerdondat />} /> done
          <Route path="/lienhe" element={<Customerlienhe />} /> done
          <Route path="/customerthongtintaikhoan" element={<Customerthongtintaikhoan />} />chua
          <Route path="/thongtinchitietbatdongsan" element={<Customerthongtinchitiet />} />
          <Route path="/thongtinchitietbatdongsan/:id" element={<Customerthongtinchitiet />} />
          {/* Remove the default route */}
        </Routes>
        {/* Footer should be rendered outside Routes */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
