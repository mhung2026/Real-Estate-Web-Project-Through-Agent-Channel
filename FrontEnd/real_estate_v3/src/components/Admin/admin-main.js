import React from 'react'
import Adminallaccount from './admin-allaccount'
import AdminCreaccountagency from './admin-creaccountagency'
import AdminAllReservation from './admin-AllReservation'
import AdminAgencyBooking from './admin-AgencyBooking'
import AdminViewCompleteBooking from './admin-ViewCompleteBooking'
export default function Adminmain() {
    return (
        <div style={{lineHeight: '20px'}}>
            
            {/* <Adminallaccount /> */}
            <AdminAgencyBooking />
            <AdminAllReservation />
            <AdminViewCompleteBooking />
            {/* <AdminCreaccountagency /> */}
        </div>
    )
}
