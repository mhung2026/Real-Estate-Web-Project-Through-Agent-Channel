import React from 'react';

const FooterItem = ({ logoSrc, title, content }) => (
    <div className='list-item'>
        <img className='logo-item' src={logoSrc} alt='' />
        <span className='text-item'>{title}</span>
        <span className='text-item'>{content}</span>
    </div>
);

export default function Footer() {
    return (
        <div >
            <div className='footer2'>
                <div className='row'>
                    <div className="col-md-3 info">
                        <div className='part1'>
                            <img className='lgo-bds-ft' src='/logofooter/logo-footer.png' alt='logobdsfooter' />
                            <span className='text-intro'>Mục tiêu của Viet Villas là tạo ra những không gian sống lý tưởng, chất lượng và đẳng cấp, mang lại hạnh phúc và trải nghiệm sống tốt đẹp cho cộng đồng.</span>
                        </div>
                    </div>

                    <div class="col-md-4 ft-icon">
                        <h5 class="text-uppercase fw-bold mb-4">THÔNG TIN LIÊN HỆ</h5>
                        <hr className='divider' />
                        <p><i class="fas fa-home me-3"></i>
                            <a href='https://maps.app.goo.gl/HwkbvGvBCAJNbJ7JA'>Lô E2a-7, Đường D1, Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh</a>
                        </p>
                        <p>
                            <i class="fas fa-envelope me-3"></i>
                            <a href='mailto:info.vietvillas@gmail.com?cc=hr.vietvillas@gmail.com
                            &subject= Request Support To VIETVILLAS &body= Type to here'>info.vietvillas@gmail.com</a>
                        </p>
                        <p>
                            <i class="fas fa-phone me-3"></i>
                            <a href='tel:(+84) 825.613.369'>(+84) 825.613.369</a>
                        </p>
                    </div>

                    <div className="col-md-3 email">
                        <div className='list'>
                            <h5 className='text-uppercase fw-bold text-email'>Email</h5>
                            <hr className='divider' />
                            <span className='text-email'>Đăng ký Email để nhận tin tức mới nhất về các dự án.</span>
                            <div className='buton-email'>
                                <input className='input-email' placeholder='Email của bạn'></input>
                                <button className='submit-email'>
                                    <img src='/logofooter/logo_submit.png' alt='asd' className="button-image" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
