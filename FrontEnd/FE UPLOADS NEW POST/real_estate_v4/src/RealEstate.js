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
import './css/adminSetTime.css'
import './css/admin-allaccount.css'
import './css/admin-adminmain.css'
import './css/admin-admindepositcus.css'
import './css/admin-creatyaccountagency.css'
import './css/admin-duyetcoc.css'
import './css/admin-admin-duyettindang.css'
import './css/admin-reservationdetailpage.css'
import './css/admin-realestatedetail.css'
import './css/admin-detailbookingagen.css'
// Component imports
import Header from './header-footer/Header';
import Header2 from './header-footer/Header2';
import Footer from './header-footer/Footer';
import Login from './components/Login';
import Dangki from './components/Dangki';
import Logout from './components/Logout';
import Tintuc from './components/Tintuc';
import Duan from './components/Duan';


// Customer Components
import TrangChu from './components/Customer/customer-trangchu';
import Customergioithieu from './components/Customer/customer-gioithieu';
import Customerdondat from './components/Customer/customer-dondat';
import Customerlienhe from './components/Customer/customer-lienhe';
import Customerthongtintaikhoan from './components/Customer/customer-thongtintaikhoan';
import Customerthongtinchitiet from './components/Customer/customer-thongtinchitiet';
import CustomerLichsudatdon from './components/Customer/customer-lichsudatdon';
import CustomerLichsumuaban from './components/Customer/customer-lichsumuaban';


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

import Agencyxemlichdat from './components/Agency/agency-xemlichdat';
import AgencyDonhoanthanh from './components/Agency/agency-donhoanthanh';
import AgencyDatcocmuaban from './components/Agency/agency-datcocmuaban';
import AgencyCustomerDetailPage from './components/Agency/agency-CustomerDetailPage';
// Admin Components
import Adminmain from './components/Admin/admin-main';
import AdminDetailBookingAgen from './components/Admin/admin-DetailBookingAgen';
import AdminReservationDetailPage from './components/Admin/admin-ReservationDetailPage';
import AdminDuyetdatcoc from './components/Admin/admin-duyetdatcoc';
import AdminRealEstateDetail from './components/Admin/admin-RealEstateDetail';
import Adminduyettindang from './components/Admin/admin-duyettindang';
import AdminThongtinbatongsan from './components/Admin/admin-Thongtinbatongsan';

function RealEstate() {
  const [userInfo, setUserInfo] = useState(null);
  const [initialPageLoad, setInitialPageLoad] = useState(true);

  useEffect(() => {
    setInitialPageLoad(false);
  }, []);

  return (
    <Router>
      <div className="App">
        {/* <Header />
        <Header2 /> */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={initialPageLoad ? <Navigate to="/trangchu" replace /> : <TrangChu />} />
          <Route path="/dangnhap" element={<><Header /><Login /></>} />{/* Đã fix xong */}
          <Route path="/dangki" element={<><Header /><Dangki /></>} /> {/* Đã fix xong */}
          <Route path="/logout" element={<><Header /><Header2 /><Logout /><Footer /></>} />{/* Đã fix xong */}
          <Route path='/tintuc' element={<><Header /><Header2 /><Tintuc /><Footer /></>} />
          <Route path='/duan' element={<><Header /><Header2 /><Duan /><Footer /></>} />
          {/* Customer Routes */}
          <Route path="/trangchu" element={<><Header /><Header2 /><TrangChu /><Footer /></>} />
          <Route path="/gioithieu" element={<><Header /><Header2 /><Customergioithieu /></>} /> {/* Đã fix xong */}
          <Route path="/khachhang-lichsudatdon" element={<><Header /><Header2 /><Customerdondat /></>} />
          <Route path="/khachahng-trangthacacdondat" element={<><Header /><Header2 /><CustomerLichsudatdon /></>} />
          <Route path="/khachhang-lichsumuaban" element={<><Header /><Header2 /><CustomerLichsumuaban /></>} />
          <Route path="/lienhe" element={<><Header /><Header2 /><Customerlienhe /></>} /> {/* Đã fix xong */}
          <Route path="/customerthongtintaikhoan" element={<><Header /><Header2 /><Customerthongtintaikhoan /></>} />
          <Route path="/thongtinchitietbatdongsan/:id" element={<><Header /><Header2 /><Customerthongtinchitiet /></>} />



          {/* Investor Routes */}
          <Route path="/investordangtin" element={<><Header /><Header2 /><InvestorDangtin /></>} />
          <Route path="/quanlitindang" element={<><Header /><Quanlitindang /></>} />
          <Route path="/investorthongtintaikhoan" element={<><Header /><Investorthongtintaikhoan /></>} />
          <Route path="/investorthongtinchitiet/:id" element={<><Header /><Header2 /><Investorthongtinchitiet /></>} />
          <Route path="/chinhsuatindang" element={<><Header /><InvestorTindang /></>} />
          <Route path="/investordangtinmain" element={<><Header /><Investordangtinmain /></>} />
          <Route path="/investornaptien" element={<><Header /><Header2 /><InvestorNaptien /></>} />
          <Route path="/naptienkhachhang" element={<><Header /><InvestorNaptienkhachhang /></>} />
          <Route path="/lichsugiaodich" element={<><Header /><InvestorLichsugiaodich /></>} />

          {/* Agency Routes */}
          <Route path="/agencytindang" element={<><Header /><Header2 /><Agencytindang /></>} />
          <Route path="/agencythongtinchitiet/:id" element={<><Header /><Header2 /><Agencythongtinchitiet /></>} />
          <Route path="/xemlichdat" element={<><Header /><Agencyxemlichdat /></>} />

          <Route path="/donhoanthanh" element={<><Header /><AgencyDonhoanthanh /></>} />
          <Route path="/datconmuaban" element={<><Header /><AgencyDatcocmuaban /></>} />
          <Route path="/customer/:customerId/realestate/:realEstateId" element={<><Header /><Header2 /><AgencyCustomerDetailPage /></>} />

          {/* Admin Routes */}
          <Route path="/adminmain" element={<><Header/><Adminmain /></>} />
          <Route path="/admin-DetailBookingAgen/:id" element={<><Header /><Header2 /><AdminDetailBookingAgen /></>} />
          <Route path="/reservation-details/:timeSlot/:date" element={<><Header /><AdminReservationDetailPage /></>} />
          <Route path="/duyetdatcoc" element={<><Header /><Header2 /><AdminDuyetdatcoc /></>} />
          <Route path="/real-estate/:id" element={<><Header /><Header2 /><AdminRealEstateDetail /></>} />
          <Route path="/thongtinbatdongsan/:id" element={<><Header /><Header2 /><AdminThongtinbatongsan /></>} />
          <Route path="/duyettindang" element={<><Header /><Header2 /><Adminduyettindang /></>} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default RealEstate;
