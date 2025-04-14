import axios from "axios";
import {
  delete_document_end_point,
  generate_LC_end_point,
  get_students_end_point,
  managerUrl,
  submit_admission_form_end_point,
  update_stream_end_point,
} from "./ApiConstants";

const manager = axios.create({
  baseURL: managerUrl,
});

export const submitAdmission = (addReq, token) => {
  return manager.post(submit_admission_form_end_point, addReq, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const submitDocuments = (studentId, documents, token) => {
  return manager.post(
    `${get_students_end_point}/${studentId}/documents`,
    documents,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const makePayment = (studentId, academicId, paymentReq, token) => {
  return manager.post(
    `${get_students_end_point}/${studentId}/academics/${academicId}/payment-detail`,
    paymentReq,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getStudentsById = (studentId, token) => {
  return manager.get(`${get_students_end_point}/${studentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePersonalDetail = (studentId, updateReq, token) => {
  return manager.put(`${get_students_end_point}/${studentId}`, updateReq, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateLastSchool = (studentId, LastSchoolId, updateReq, token) => {
  return manager.put(
    `${get_students_end_point}/${studentId}/last-school/${LastSchoolId}`,
    updateReq,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateBankDetail = (studentId, bankId, updateReq, token) => {
  return manager.put(
    `${get_students_end_point}/${studentId}/bank-detail/${bankId}`,
    updateReq,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateGuardianDetail = (
  studentId,
  guardianId,
  updateReq,
  token
) => {
  return manager.put(
    `${get_students_end_point}/${studentId}/guardian-info/${guardianId}`,
    updateReq,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteStudent = (studentId, token) => {
  return manager.delete(`${get_students_end_point}/${studentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteStudents = (ids, token) => {
  return manager.delete(`${get_students_end_point}/delete`, {
    data: ids,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateStudentImage = (image, studentId, token) => {
  return manager.put(`${get_students_end_point}/${studentId}/image`, image, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateStudentDocument = (document, docId, token) => {
  return manager.put(`${delete_document_end_point}/${docId}`, document, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadExcel = (formData, token) => {
  return manager.post(`${get_students_end_point}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateStudentAcademics = (
  studentId,
  academicId,
  updateReq,
  token
) => {
  return manager.put(
    `${get_students_end_point}/${studentId}/academics/${academicId}`,
    updateReq,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const downloadExcel = (token, query, stdClass, section, session) => {
  return manager.get(`${get_students_end_point}/excel`, {
    params: {
      query: query,
      stdClass: stdClass,
      section: section,
      session: session,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  });
};

export const downloadRawExcel = (token) => {
  return manager.get(`${get_students_end_point}/excel/sample`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  });
};

export const updateStudentStream = (academicId, streamId, updateReq, token) => {
  return manager.put(
    `${update_stream_end_point}/${academicId}/stream/${streamId}`,
    updateReq,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateStudentBioFocal = (academicId, bioId, updateReq, token) => {
  return manager.put(
    `${update_stream_end_point}/${academicId}/bio-focal-subject/${bioId}`,
    updateReq,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteDocumentById = (docId, token) => {
  return manager.delete(`${delete_document_end_point}/${docId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const generateLeavingCertificate = (studentId, token) => {
  return manager.get(
    generate_LC_end_point,
    {
      params: {studentId},
      responseType: "blob", 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}