import {
  getAllClasses,
  getAllFees,
  getFailedStudents,
  getStudentAcademics,
  getStudents,
  getUserProfile,
} from "../api/User";
import { auth_token } from "../constants/AppConstants";

export const getUserProfileService = async () => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await getUserProfile(token);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllFeesService = async (filter) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await getAllFees(token, filter);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllClassesService = async () => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await getAllClasses(token);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getStudentsService = async (filter) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await getStudents(token, filter);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getFailedStudentsService = async (filter) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await getFailedStudents(token, filter);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getStudentAcademicsService = async (studentId) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await getStudentAcademics(studentId, token);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
