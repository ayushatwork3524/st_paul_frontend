export const ROLE_HIERARCHY = {
  SUPERADMIN: ["SUPERADMIN", "ADMIN", "ACOUNTANT", "MANAGER"],
  ADMIN: ["ADMIN", "ACOUNTANT", "MANAGER"],
  ACOUNTANT: ["ACOUNTANT"],
  MANAGER: ["MANAGER"],
};

export const ROLE_ACCESS = {
  SUPERADMIN: [
    "Dashboard",
    "Add Class",
    "Class Structure",
    "Students",
    "Failed Students",
    "Admission",
    "Pay Fees",
    "Pending Applications",
    "Export",
    "Import",
  ],
  ADMIN: [
    "Dashboard",
    "Students",
    "Admission",
    "Pending Applications",
    "Pay Fees",
    "Export",
    "Import",
  ],
  ACOUNTANT: ["Dashboard", "Pending Applications", "Pay Fees"],
  MANAGER: [
    "Dashboard",
    "Students",
    "Failed Students",
    "Admission",
    "Export",
    "Import",
  ],
};
