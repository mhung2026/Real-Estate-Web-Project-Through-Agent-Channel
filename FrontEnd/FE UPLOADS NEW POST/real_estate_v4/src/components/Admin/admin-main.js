import React from 'react'
import Adminallaccount from './admin-allaccount'
import AdminCreaccountagency from './admin-creaccountagency'
import AdminAllReservation from './admin-AllReservation'
import AdminAgencyBooking from './admin-AgencyBooking'
import AdminViewCompleteBooking from './admin-ViewCompleteBooking'
import AdminSetTime from './admin-SetTime'
import AdminDepositCustomer from './admin-DepositCustomer'
export default function Adminmain() {
    return (
        <div style={{lineHeight: '20px'}}>
            
            {/* <Adminallaccount /> */}
            <AdminDepositCustomer />
            {/* <AdminSetTime />
            <AdminAgencyBooking />
            <AdminAllReservation /> */}
            <AdminViewCompleteBooking />
            {/* <AdminCreaccountagency /> */}
        </div>
    )
}
