const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const authUrl = baseUrl + "/auth";

export const managerUrl = baseUrl + "/manager";

export const superAdminUrl = baseUrl + "/superadmin";

export const userUrl = baseUrl + "/user";

export const accountantUrl = baseUrl + "/accountant";

export const adminUrl = baseUrl + "/admin";

//auth
export const user_register_end_point = "/register";

export const user_login_end_point = "/login";

export const logout_end_point = "/logout";

export const send_otp_end_point = "/send-opt";

export const verify_otp_end_point = "/varify-otp";

export const reset_password_end_point = "/password-reset";

//manager
export const submit_admission_form_end_point = "/student";

export const delete_document_end_point = "/students/documents";

export const update_stream_end_point = "/students/academics";

export const generate_LC_end_point = "/lc/request";

//super admin
export const add_fees_end_point = "/college/fees";

//user
export const get_fees_end_point = "/college/fees";

export const get_students_end_point = "/students";

export const user_profile_end_point = "/getProfile";

export const get_all_classes_end_point = "/college/classes";

export const pay_fees_end_point = "/student/academics";
