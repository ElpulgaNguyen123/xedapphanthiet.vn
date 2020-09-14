let tranvalidation_register = {
  email_incorrect: 'Vui lòng nhập email theo đúng cú pháp example@gmail.com',
  gender_incorrect: 'Vui lòng chọn giới tính',
  password_incorrect: "Mật khẩu bao gồm số và chữ viết hoa và phải hơn 6 số !",
  password_confirm_incorrect: "Mật khẩu nhập lại phải giống với mật khẩu bên trên !"
}
let tranvalidation_resetPassword = {
  email_notavailable: 'Email này chưa được đăng ký, vui lòng nhập',
  email_incorrect: 'Vui lòng nhập email theo đúng cú pháp example@gmail.com',
  email_correct: '1 Email đã được gửi cho bạn, Vui lòng đăng nhập email xác nhận !',
  password_incorrect: "Mật khẩu bao gồm số và chữ viết hoa và phải hơn 6 số !",
  password_confirm_incorrect: "Mật khẩu nhập lại phải giống với mật khẩu bên trên !",
}
let TranProductSuccess = {
  createNewSuccess: 'Thêm mới sản phẩm thành công !',
  deleteProducts: 'Xóa sản phẩm thành công !',
  editSuccess: 'Sửa sản phẩm thành công !',
}
let TranAuthSuccess = {
  createNewAccountsuccess: 'Tạo tài khoản thành công !, vui lòng đăng nhập email để xác nhận !',
}
let Tranerrors = {
  user_created_errors: 'Đăng ký lỗi !',
  user_email_inuse: 'Email này đã được sử dụng, vui lòng kiểm tra nếu chưa kích hoạt',
  account_removed: 'Tài khoản email này đã bị khóa và xóa khỏi hệ thống, vui lòng liên hệ bộ phận hỗ trợ.',
  account_notActive: 'Email này đã được đăng ký nhưng chưa kích hoạt, vui lòng kiểm tra email để kích hoạt tài khoản.',
  account_undefind: "Token không tồn tại !",
  login_failed: 'Mật khẩu hoặc tài khoản không đúng',
  server_error: 'Server lỗi !',
  Login_success: 'Đăng nhập thành công !',
  hasErrors: 'Có lỗi xảy ra',
  emailinvalid: 'Email này không tồn tại, vui lòng nhập lại !',
  userinvalid: 'Tài khoản này không tồn tại'

}
let Transuccess = {
  user_created: function (username) {
    return `Chào mừng ${username}, Đăng ký tài khoản thành công !`;
  },
  account_remind_active: 'Vui lòng vào email để kích hoạt tài khoản',
  account_actived: 'Kích hoạt tài khoản thành công, bạn có thể đăng nhập vào ứng dụng',
  logout_success: 'Đăng xuất thành công !',
  user_updated: 'Cập nhật thành công',
  product_updated: 'Cập nhật sản phẩm thành công',
  reset_passwordsendsuccess: 'Email reset password đã được gửi, vui lòng đến email để reset password',
  reset_passwordsuccess: 'Đổi mật khẩu thành công !',
  userinfoNotChange: 'Không có sự thay đổi nào !',
  createSuccess: function (text) {
    return `Thêm ${text} thành công !`;
  },
  saveSuccess: function (text) {
    return `Lưu ${text} thành công !`;
  },
  deleteSuccess: function (text) {
    return `Xóa ${text} thành công !`;
  }
}
let tranMail = {
  subject: "Xe Đạp Phương Đông : Xác nhận tài khoản !",
  sendmailSubject : 'Gửi xe đạp Phương Đông',
  template: (linkverify) => {
    return `<h2> Bạn nhận được email này và đã đăng ký tài khoản trên ứng dụng Funny chat. </h2>
        <h3> Vui lòng click vào liên kết bên dưới để kích hoạt tài khoản. </h3>
        <h3> <a href="${linkverify}" target=""blank> ${linkverify} </h3>
        <p> Nếu tin rằng email này là nhầm lẫn, hãy bỏ qua nó ! </p>`
  },
  templateResetPass: (linkverify) => {
    return `<style type="text/css">    
        /* CLIENT-SPECIFIC STYLES */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }
        /* RESET STYLES */
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
    
        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
        /* MOBILE STYLES */
        @media screen and (max-width:600px){
            h1 {
                font-size: 32px !important;
                line-height: 32px !important;
            }
        }
        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] { margin: 0 !important; }
    </style>
    
    <style type="text/css">
    
    </style>
    </head><body style="background-color: #ffff; margin: 0 !important; padding: 0 !important;">
    
    <!-- HIDDEN PREHEADER TEXT -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Đổi mật khẩu của bạn
    </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- LOGO -->
        <tr>
            <td bgcolor="#0CCB85" align="center">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                    <tr>
                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                            <a href="http://rightindem.com" target="_blank">
                                <img alt="Logo" src="http://localhost:4000/admin/images/auth/logo-dark.png" width="169" height="40" style="display: block; width: 169px; max-width: 169px; min-width: 169px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">
                            </a>
                        </td>
                    </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
            </td>
        </tr>
        <!-- HERO -->
        <tr>
            <td bgcolor="#0CCB85" align="center" style="padding: 0px 10px 0px 10px;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                          <h1 style="font-size: 28px; font-weight: 400; margin: 0; letter-spacing: 0px;">Reset mật khẩu của bạn</h1>
                        </td>
                    </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
            </td>
        </tr>
        <!-- COPY BLOCK -->
        <tr>
            <td bgcolor="#0CCB85" align="center" style="padding: 0px 10px 0px 10px;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                  <!-- COPY -->
                  <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                      <p style="margin: 0;">Chúng tôi rất vui mừng khi bạn bắt đầu. Đầu tiên, bạn cần xác nhận tài khoản của bạn. Chỉ cần nhấn nút bên dưới.</p>
                    </td>
                  </tr>
                  <!-- BULLETPROOF BUTTON -->
                  <tr>
                    <td bgcolor="#ffffff" align="left">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                            <table border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                  <td align="center" style="border-radius: 3px;" bgcolor="#0CCB85"><a href="${linkverify}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #0CCB85; display: inline-block;">Reset mật khẩu</a></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- COPY -->
                  <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                      <p style="margin: 0;">Nếu không hoạt động, copy link bên dưới và dán vào trình duyệt</p>
                    </td>
                  </tr>
                  <!-- COPY -->
                    <tr>
                      <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                        <p style="margin: 0;"><a href="${linkverify}" target="_blank" style="color: #4A35EA;">Click vào đây nếu không hoạt động !</a></p>
                      </td>
                    </tr>
                  <!-- COPY -->
                  <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                      <p style="margin: 0;">Nêu có bất kỳ thắc mắc nào, vui lòng trả lời email này để được hỗ trợ !</p>
                    </td>
                  </tr>
                  <!-- COPY -->
                  <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                      <p style="margin: 0;">Cheers,<br>The UT DESIGN Team</p>
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
            </td>
        </tr>
        <!-- FOOTER -->
        <tr>
            <td bgcolor="#0CCB85" align="center" style="padding: 0px 10px 0px 10px;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                  <!-- NAVIGATION -->
                  <tr>
                    <td bgcolor="#0CCB85" align="left" style="padding: 30px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                      <p style="margin: 0;">
                        <a href="http://litmus.com" target="_blank" style="color: #111111; font-weight: 700;">Dashboard</a> -
                        <a href="http://litmus.com" target="_blank" style="color: #111111; font-weight: 700;">Billing</a> -
                        <a href="http://litmus.com" target="_blank" style="color: #111111; font-weight: 700;">Help</a>
                      </p>
                    </td>
                  </tr>
                  <!-- PERMISSION REMINDER -->
                  <tr>
                    <td bgcolor="#0CCB85" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                      <p style="margin: 0;">You received this email because you just signed up for a new account. If it looks weird, <a href="http://litmus.com" target="_blank" style="color: #111111; font-weight: 700;">view it in your browser</a>.</p>
                    </td>
                  </tr>
                  <!-- UNSUBSCRIBE -->
                  <tr>
                    <td bgcolor="#0CCB85" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                      <p style="margin: 0;">If these emails get annoying, please feel free to <a href="http://litmus.com" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                    </td>
                  </tr>
                  <!-- ADDRESS -->
                  <tr>
                    <td bgcolor="#0CCB85" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                      <p style="margin: 0;">Ceej - 1234 Main Street - Anywhere, MA - 56789</p>
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
            </td>
        </tr>
    </table>`
  },
  sendmailInfo:(user) => {
  return `<ul class="list-group">
      <li class="list-group-item"><strong>Họ tên : </strong> ${user.name}</li>
      <li class="list-group-item"><strong>Điện thoại : </strong> ${user.phone}</li>
      <li class="list-group-item"><strong>Email : </strong>${user.email}</li>
      <li class="list-group-item"><strong>Nội dung : </strong>${user.content}</li>
    </ul>`
},
send_success: 'Gửi mail thành công. chúng tôi sẽ phản hồi ngay !',
  send_failed: "Có lỗi, vui lòng liên hệ vơi bộ phận hỗ trợ để được giúp đỡ !"
}

module.exports = {
  tranvalidation_register,
  TranProductSuccess,
  Tranerrors,
  TranAuthSuccess,
  tranMail,
  Transuccess,
  tranvalidation_resetPassword
}   