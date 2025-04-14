const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const marksRegex = /^(100|[0-9]{1,2})(\.\d{1,2})?$/;
const mobileRegex = /^[6-9]\d{9}$/;
const incomeRegex = /^\d+(\.\d{1,2})?$/;

export const validateIFSC = (ifsc) => {
  return ifscRegex.test(ifsc);
};

export const validateMarks = (marks) => {
  return marksRegex.test(marks);
};

export const validateMobile = (mobile) => {
  return mobileRegex.test(mobile);
};

export const validateIncome = (income) => {
  return incomeRegex.test(income);
};
