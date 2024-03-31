import { toast } from 'react-toastify';

class FormValidation {
    static validateFormData(formData) {
        // Kiểm tra các trường bắt buộc
        for (let key in formData) {
            if (formData[key].trim() === '') {
                toast.error(`Vui lòng điền đầy đủ thông tin cho ${key}.`);
                return false;
            }
        }
      
        // Kiểm tra mật khẩu
        if (/\s/.test(formData.matKhau)) {
            toast.error('Mật khẩu không được chứa khoảng trắng.');
            return false;
        }

        if (formData.matKhau.length < 6 || !/[A-Z]/.test(formData.matKhau)) {
            toast.error('Mật khẩu phải chứa ít nhất 6 kí tự và có ít nhất 1 kí tự viết hoa.');
            return false;
        }

        if (formData.matKhau !== formData.xacNhanMatKhau) {
            toast.error('Mật khẩu và xác nhận mật khẩu không khớp.');
            return false;
        }

        // Kiểm tra số điện thoại
        if (!/^\d{8,11}$/.test(formData.soDienThoai)) {
            toast.error('Số điện thoại phải có từ 8 đến 11 số.');
            return false;
        }

        // Kiểm tra định dạng email
        if (/^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)?(edu)(\.[a-zA-Z]{2,})?$/.test(formData.email)) {
            toast.error('Email edu không được phép.');
            return false;
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)) {
            toast.error('Email không đúng định dạng.');
            return false;
        }
        
        

        return true;
    }
}

export default FormValidation;
