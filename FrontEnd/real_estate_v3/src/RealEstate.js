// React imports
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// CSS imports
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
import './css/investor-thongtinchitiet.css';
import './css/customer-thongtinchitiet.css';
import './css/investor-dangtinmain.css';
import './css/investor-naptien.css';
import './css/agency-menu.css'
import './css/investor-lichsugiaodich.css'
import './css/admin-agencybooking.css'
import './css/admin-adminallreservation.css'
import './css/admin-adminviewcompletebooking.css'
// Component imports
import Header from './header-footer/Header';
import Header2 from './header-footer/Header2';
import Footer from './header-footer/Footer';
import Login from './components/Login';
import Dangki from './components/Dangki';
import Logout from './components/Logout';

// Customer Components
import TrangChu from './components/Customer/customer-trangchu';
import Customergioithieu from './components/Customer/customer-gioithieu';
import Customerdondat from './components/Customer/customer-dondat';
import Customerlienhe from './components/Customer/customer-lienhe';
import Customerthongtintaikhoan from './components/Customer/customer-thongtintaikhoan';
import Customerthongtinchitiet from './components/Customer/customer-thongtinchitiet';


// Investor Components
import InvestorDangtin from './components/Investor/investor-dangtin';
import Quanlitindang from './components/Investor/investor-quanlitindang';
import Investorthongtintaikhoan from './components/Investor/investor-thongtintaikhoan';
import InvestorTindang from './components/Investor/investor-chinhsuatindang';
import Investorthongtinchitiet from './components/Investor/investor-thongtinchitiet';
import Investordangtinmain from './components/Investor/investor-dangtinmain';
import InvestorNaptien from './components/Investor/investor-naptien';
import InvestorNaptienkhachhang from './components/Investor/investor-naptienkhachhang';
import InvestorLichsugiaodich from './components/Investor/investor-lichsugiaodich';

// Agency Components
import Agencytindang from './components/Agency/agency-tindang';
import Agencythongtinchitiet from './components/Agency/agency-thongtinchitiet';
import Agencyduyettindang from './components/Agency/agency-duyettindang';
import Agencyxemlichdat from './components/Agency/agency-xemlichdat';

// Admin Components
import Adminmain from './components/Admin/admin-main';
import AdminDetailBookingAgen from './components/Admin/admin-DetailBookingAgen';

function RealEstate() {
  const [userInfo, setUserInfo] = useState(null);
  const [initialPageLoad, setInitialPageLoad] = useState(true);

  useEffect(() => {
    setInitialPageLoad(false);
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Header2 />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={initialPageLoad ? <Navigate to="/trangchu" replace /> : <TrangChu />} />
          <Route path="/dangnhap" element={<Login />} />
          <Route path="/dangki" element={<Dangki />} />
          <Route path="/logout" element={<Logout />} />

          {/* Customer Routes */}
          <Route path="/trangchu" element={<TrangChu />} />
          <Route path="/gioithieu" element={<Customergioithieu />} />
          <Route path="/dondat" element={<Customerdondat />} />
          <Route path="/lienhe" element={<Customerlienhe />} />
          <Route path="/customerthongtintaikhoan" element={<Customerthongtintaikhoan />} />
          <Route path="/thongtinchitietbatdongsan/:id" element={<Customerthongtinchitiet />} />
          <Route path="/naptienkhachhang" element={<InvestorNaptienkhachhang />} />
          <Route path="/lichsugiaodich" element={<InvestorLichsugiaodich />} />

          {/* Investor Routes */}
          <Route path="/investordangtin" element={<InvestorDangtin />} />
          <Route path="/quanlitindang" element={<Quanlitindang />} />
          <Route path="/investorthongtintaikhoan" element={<Investorthongtintaikhoan />} />
          <Route path="/investorthongtinchitiet/:id" element={<Investorthongtinchitiet />} />
          <Route path="/chinhsuatindang" element={<InvestorTindang />} />
          <Route path="/investordangtinmain" element={<Investordangtinmain />} />
          <Route path="/investornaptien" element={<InvestorNaptien />} />

          {/* Agency Routes */}
          <Route path="/agencytindang" element={<Agencytindang />} />
          <Route path="/agencythongtinchitiet/:id" element={<Agencythongtinchitiet />} />
          <Route path="/xemlichdat" element={<Agencyxemlichdat />} />
          <Route path="/duyettindang" element={<Agencyduyettindang />} />

          {/* Admin Routes */}
          <Route path="/adminmain" element={<Adminmain />} />
          <Route path="/admin-DetailBookingAgen/:id" element={<AdminDetailBookingAgen />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default RealEstate;
