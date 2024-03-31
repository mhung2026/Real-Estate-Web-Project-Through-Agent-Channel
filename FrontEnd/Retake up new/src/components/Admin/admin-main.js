import React, { useState } from 'react';
import AdminAllAccount from './admin-allaccount';
import AdminCreateAccountAgency from './admin-creaccountagency';
import AdminAllReservation from './admin-AllReservation';
import AdminAgencyBooking from './admin-AgencyBooking';
import AdminViewCompleteBooking from './admin-ViewCompleteBooking';
import AdminSetTime from './admin-SetTime';
import AdminDepositCustomer from './admin-DepositCustomer';
import AdminApproveDeposit from './admin-duyetdatcoc';
import AdminApproveListings from './admin-duyettindang';

export default function AdminMain() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const components = {
    'Tất cả tài khoản': AdminAllAccount,
    'Khách hàng đặt cọc': AdminDepositCustomer,
    'Chỉnh sửa thời gian đặt lịch': AdminSetTime,
    'Đặt sàn giao dịch': AdminAgencyBooking,
    'Xem đơn đặt hoàn tất': AdminViewCompleteBooking,
    'Tạo tài khoản sàn giao dịch': AdminCreateAccountAgency,
    'Duyệt cọc': AdminApproveDeposit,
    'Danh sách cần được duyệt': AdminApproveListings,
  };

  return (
    <div style={{ lineHeight: '20px' }}>
      <div className="row">
        <div className="col-2" style={{ marginTop: "150px", marginLeft: "30px", display: "flex", position: "sticky", top: "100px"}}>
          <nav id="navbar-example3" className="h-100 flex-column align-items-stretch pe-4 border-end">
            <nav className="nav nav-pills flex-column" >
              {Object.keys(components).map(key => (
                <button className="linktitle" style={{color: "black", textAlign: "left", }} onClick={() => setSelectedComponent(key)} key={key}>
                  {key.replace('-', ' ')}
                </button>
              ))}
            </nav>
          </nav>
        </div>

        <div className="col-10">
          {selectedComponent ? React.createElement(components[selectedComponent]) : <div></div>}
        </div>
      </div>
    </div>
  );
}
