import {
  deleteDocumentById,
  deleteStudent,
  deleteStudents,
  downloadExcel,
  downloadRawExcel,
  generateLeavingCertificate,
  getStudentsById,
  makePayment,
  submitAdmission,
  submitDocuments,
  updateBankDetail,
  updateGuardianDetail,
  updateLastSchool,
  updatePersonalDetail,
  updateStudentAcademics,
  updateStudentBioFocal,
  updateStudentDocument,
  updateStudentImage,
  updateStudentStream,
  uploadExcel,
} from "../api/Manager";
import { errorResponse } from "../api/response/ErrorResponse";
import { auth_token } from "../constants/AppConstants";

export const submitAdmissionService = async (addReq) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await submitAdmission(addReq, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const submitDocumentService = async (studentId, documents) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await submitDocuments(studentId, documents, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const makePaymentService = async (studntId, academicId, paymentReq) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await makePayment(studntId, academicId, paymentReq, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const getStudentsByIdService = async (studentId) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await getStudentsById(studentId, token);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const uploadExcelService = async (formData) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await uploadExcel(formData, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const downloadExcelFileService = async (
  query,
  stdClass,
  section,
  session
) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await downloadExcel(token, query, stdClass, section, session);
    return res;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const downloadRawExcelService = async () => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await downloadRawExcel(token);
    return res;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const updatePersonalDetailService = async (studentId, updateReq) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await updatePersonalDetail(studentId, updateReq, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const updateLastSchoolService = async (
  studentId,
  lastSchoolId,
  updateReq
) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await updateLastSchool(
      studentId,
      lastSchoolId,
      updateReq,
      token
    );
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const updateBankDetailService = async (studentId, bankId, updateReq) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await updateBankDetail(studentId, bankId, updateReq, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const updateGuardianDetailService = async (
  studentId,
  guardianId,
  updateReq
) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await updateGuardianDetail(
      studentId,
      guardianId,
      updateReq,
      token
    );
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const deleteStudentService = async (studentId) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await deleteStudent(studentId, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const deleteStudentsService = async (ids) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await deleteStudents(ids, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const deleteDocumentByIdService = async (docId) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await deleteDocumentById(docId, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const updateStudentImageService = async (image, studentId) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await updateStudentImage(image, studentId, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const updateStudentDocumentService = async (document, docId) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await updateStudentDocument(document, docId, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const updateStudentAcademicsService = async (
  studentId,
  academicId,
  updateReq
) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await updateStudentAcademics(
      studentId,
      academicId,
      updateReq,
      token
    );
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const updateStudentStreamService = async (
  academicId,
  streamId,
  updateReq
) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await updateStudentStream(
      academicId,
      streamId,
      updateReq,
      token
    );
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const updateStudentBioFocalService = async (
  academicId,
  bioId,
  updateReq
) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await updateStudentBioFocal(
      academicId,
      bioId,
      updateReq,
      token
    );
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const generateLeavingCertificateService = async (studentId, req) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await generateLeavingCertificate(studentId, token, req);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};
