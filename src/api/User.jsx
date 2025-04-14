import axios from "axios";
import {
  get_all_classes_end_point,
  get_fees_end_point,
  get_students_end_point,
  user_profile_end_point,
  userUrl,
} from "./ApiConstants";

const user = axios.create({
  baseURL: userUrl,
});

export const getAllFees = (token, filter) => {
  return user.get(get_fees_end_point, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      stdClass: filter.stdClass,
    },
  });
};

export const getUserProfile = (token) => {
  return user.get(user_profile_end_point, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStudents = (token, filter) => {
  return user.get(get_students_end_point, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      query: filter.query,
      stdClass: filter.stdClass,
      section: filter.section,
      session: filter.session,
    },
  });
};

export const getFailedStudents = (token, filter) => {
  return user.get(`${get_students_end_point}/fail`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      query: filter.query,
      stdClass: filter.stdClass,
      section: filter.section,
      session: filter.session,
    },
  });
};

export const getStudentAcademics = (studentId, token) => {
  return user.get(`${get_students_end_point}/${studentId}/academics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllClasses = (token) => {
  return user.get(get_all_classes_end_point, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
