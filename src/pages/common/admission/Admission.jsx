import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Academic } from "./Academic";
import { Personal } from "./Personal";
import { BankDetail } from "./BankDetail";
import { LastSchool } from "./LastSchool";
import { Guardian } from "./Guardian";
import { toast } from "react-toastify";
import {
  validateIFSC,
  validateIncome,
  validateMarks,
  validateMobile,
} from "../../../regex/FormRegix";
import { Subjects } from "./Subjects";
import { submitAdmissionService } from "../../../service/ManagerService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/store/LoadingSlice";
import { Document } from "./Document";
import { encodeId } from "../../../security/secureuri/SecureUri";

export const Admission = () => {
  const [listHeight, setListHeight] = useState(window.innerHeight * 0.65);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setListHeight(window.innerHeight * 0.65);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navs = [
    "Academic",
    "Personal",
    // "Bank",
    "Last Exam",
    "Guardian",
    "Subject",
  ];

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    session: "",
    formNo: "",
    stdClass: "",
    admissionDate: "",
  });

  const [personalData, setPersonalData] = useState({
    firstName: "",
    fatherName: "",
    motherName: "",
    surname: "",
    email: "",
    phoneNo: "",
    gender: "",
    caste: "",
    category: "",
    scholarshipCategory: "",
    localAddress: "",
    permanentAddress: "",
    dateOfBirth: "",
    adharNo: "",
    bloodGroup: "",
  });

  const [image, setImage] = useState(null);

  const [bankData, setBankData] = useState({
    bankName: "",
    accountNo: "",
    ifscCode: "",
    branchName: "",
  });

  const [lastSchoolData, setLastSchoolData] = useState({
    collegeName: "",
    uid: "",
    lastStudentId: "",
    examination: "",
    rollNo: "",
    examMonth: "",
    marksObtained: "",
    result: "",
  });

  const [guardianInfo, setGuardianInfo] = useState({
    name: "",
    relation: "",
    phone: "",
    occupation: "",
    income: "",
  });

  const [subjectData, setSubjectData] = useState({
    stream: "",
    subStream: "",
    medium: "",
    subjects: [],
  });

  const [bSubjectData, setBSubjectData] = useState({
    subStream: "",
    subject: "",
  });

  const [errors, setErrors] = useState({});

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.session || formData.session === "")
        newErrors.session = "Session is required";

      if (!formData.formNo.trim()) newErrors.formNo = "Form Number is required";
      if (!formData.stdClass.trim()) newErrors.stdClass = "Class is required";

      if (!formData.admissionDate.trim() || formData.admissionDate == "")
        newErrors.admissionDate = "Date is required";
    }

    if (step === 2) {
      if (!personalData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!personalData.fatherName.trim())
        newErrors.fatherName = "Father name is required";
      if (!personalData.motherName.trim())
        newErrors.motherName = "Mother name is required";
      if (!personalData.surname.trim())
        newErrors.surname = "Surname is required";
      if (!personalData.email.trim()) newErrors.email = "Email is required";
      if (!personalData.phoneNo.trim())
        newErrors.phoneNo = "Phone number is required";
      if (personalData.phoneNo.length !== 10)
        newErrors.phoneNo = "Enter valid phone number";
      if (!personalData.gender) newErrors.gender = "Gender is required";
      if (!personalData.dateOfBirth || personalData.dateOfBirth === "")
        newErrors.dateOfBirth = "Date Of Birth is required";
      if (!personalData.caste.trim()) newErrors.caste = "Caste is required";
      if (!personalData.category || personalData.category === "")
        newErrors.category = "Select the category";
      if (
        !personalData.scholarshipCategory ||
        personalData.scholarshipCategory === ""
      )
        newErrors.scholarshipCategory = "Select the scholarship category";
      if (image && image.size > 5 * 1024 * 1024)
        newErrors.image = "File size must be less than 5MB";
      if (!personalData.localAddress.trim())
        newErrors.localAddress = "Local address is required";
      if (!personalData.permanentAddress.trim())
        newErrors.permanentAddress = "Permanent address is required";
      if (!personalData.adharNo.trim())
        newErrors.adharNo = "Adhar number is required";
      if (personalData.adharNo.length !== 12)
        newErrors.adharNo = "Enter valid Adhar number";
    }

    // if (step === 3) {
    //   if (!bankData.bankName.trim())
    //     newErrors.bankName = "Bank name is required";
    //   if (!bankData.accountNo.trim())
    //     newErrors.accountNo = "Account number is required";
    //   if (bankData.accountNo.length > 17)
    //     newErrors.accountNo =
    //       "Account number should not be more than 17 digits";
    //   if (!bankData.ifscCode.trim())
    //     newErrors.ifscCode = "IFSC code is required";
    //   if (!validateIFSC(bankData.ifscCode))
    //     newErrors.ifscCode = "Enter Valid IFSC code";
    //   if (!bankData.branchName.trim())
    //     newErrors.branchName = "Bank branch is required";
    // }

    if (step === 3) {
      if (!lastSchoolData.collegeName.trim())
        newErrors.collegeName = "School/College name is required";
      if (!lastSchoolData.uid.trim())
        newErrors.uid = "U Dise Number is required";
      if (!lastSchoolData.lastStudentId.trim())
        newErrors.lastStudentId = "Last School Student ID is required";
      if (!lastSchoolData.examination.trim())
        newErrors.examination = "Examination Name is required";
      if (!lastSchoolData.rollNo.trim())
        newErrors.rollNo = "Roll Number is required";
      if (!lastSchoolData.examMonth || lastSchoolData.examMonth === "")
        newErrors.examMonth = "Exam Month is required";
      if (!lastSchoolData.marksObtained.trim())
        newErrors.marksObtained = "Obtained Marks is required";
      if (!validateMarks(lastSchoolData.marksObtained))
        newErrors.marksObtained = "Enter Valid marks";
      if (!lastSchoolData.result || lastSchoolData.result === "")
        newErrors.result = "Select the result";
    }

    if (step === 4) {
      if (!guardianInfo.name.trim())
        newErrors.name = "Guardian name is required";
      if (!guardianInfo.relation.trim())
        newErrors.relation = "Guardian Relation is required";
      if (!guardianInfo.phone.trim())
        newErrors.phone = "Guardian Mobile Number is required";
      if (!validateMobile(guardianInfo.phone))
        newErrors.phone = "Enter Valid Mobile Number";
      if (!guardianInfo.occupation.trim())
        newErrors.occupation = "Guardian Occupation is required";
      if (!guardianInfo.income.trim())
        newErrors.income = "Guardian Income is required";
      if (!validateIncome(guardianInfo.income))
        newErrors.income = "Enter Valid Income";
    }

    if (step === 5) {
      if (!subjectData.stream.trim()) newErrors.stream = "Select the Stream";
      if (!subjectData.subStream.trim())
        newErrors.subStream = "Select the Sub Stream";
      if (!subjectData.medium.trim()) newErrors.medium = "Select the medium";
      if (subjectData.subjects.length === 0)
        newErrors.subjects = "Select the Subjects";
      if (bSubjectData.subStream.trim() && !bSubjectData.subject.trim())
        newErrors.bSubject = "Select the Subjects";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) {
      toast.warn("Fill All the required details");
      return;
    }

    setStep((prev) => (prev < navs.length ? prev + 1 : prev));
    if (step === 5) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const newFormData = new FormData();

    const payload = {
      admissionForm: formData,
      student: personalData,
      lastSchool: lastSchoolData,
      // bankDetail: bankData,
      guardianInfo: guardianInfo,
      subject: subjectData,
      bioFocalSubject: bSubjectData.subStream ? bSubjectData : null,
    };

    newFormData.append(
      "studentAdd",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

    if (image) {
      newFormData.append("image", image);
    }

    console.log(payload);

    dispatch(setLoading(true));
    const res = await submitAdmissionService(newFormData);
    if (res?.statusCode === 200) {
      dispatch(setLoading(false));
      navigate(`/user/student/${encodeId(res?.data)}/document`);
      setTimeout(() => {
        toast.success(res?.message);
      }, 1000);
    } else {
      dispatch(setLoading(false));
      setTimeout(() => {
        toast.error(res?.message);
      }, 1000);
      return;
    }
  };

  return (
    <section className="w-full p-6 flex flex-col gap-3 h-full">
      <div className="flex flex-col w-full justify-between gap-5">
        {/* Step Navigation */}
        <div className="flex justify-between m-0 items-center sticky -top-6 p-2 z-20 bg-white">
          {navs.map((title, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full relative"
            >
              {/* Step Indicator */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold transition-all duration-700 ${
                  step >= index + 1
                    ? step > index + 1
                      ? "bg-green-600"
                      : "bg-blue-600"
                    : "bg-gray-300"
                }`}
              >
                {step > index + 1 ? <FaCheck /> : index + 1}
              </div>

              {/* Step Title */}
              <p
                className={`mt-2 text-sm transition-all duration-300 ${
                  step === index + 1
                    ? "text-blue-700 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {title}
              </p>

              {/* Progress Bar */}
              {/* {index < navs.length - 1 && (
                <div className="absolute w-full left-1/2 transform -translate-x-1/2 top-20">
                  <div
                    className={`h-1 w-full rounded-full transition-all duration-700 ${
                      step > index + 1 ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                </div>
              )} */}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div
          className="px-10 overflow-auto"
          style={{ height: `${listHeight}px` }}
        >
          {step === 1 && (
            <>
              <Academic
                errors={errors}
                formData={formData}
                setFormData={setFormData}
              />
            </>
          )}
          {step === 2 && (
            <>
              <Personal
                personalData={personalData}
                setPersonalData={setPersonalData}
                setImage={setImage}
                errors={errors}
              />
            </>
          )}
          {/* {step === 3 && (
            <>
              <BankDetail
                bankData={bankData}
                setBankData={setBankData}
                errors={errors}
              />
            </>
          )} */}
          {step === 3 && (
            <>
              <LastSchool
                lastSchoolData={lastSchoolData}
                setLastSchoolData={setLastSchoolData}
                errors={errors}
              />
            </>
          )}
          {step === 4 && (
            <>
              <Guardian
                guardianInfo={guardianInfo}
                setGuardianInfo={setGuardianInfo}
                errors={errors}
              />
            </>
          )}
          {step === 5 && (
            <>
              <Subjects
                subjectData={subjectData}
                setSubjectData={setSubjectData}
                bSubjectData={bSubjectData}
                setBSubjectData={setBSubjectData}
                errors={errors}
              />
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between  px-10 ">
          {/* Previous Button */}
          <button
            onClick={() => setStep((prev) => (prev > 1 ? prev - 1 : prev))}
            disabled={step === 1}
            className={`px-6 py-2 select-none cursor-pointer rounded-md transition-all duration-300 ${
              step === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            <span>{"<"}-</span> Previous
          </button>

          {/* Next Button */}
          <button
            onClick={nextStep}
            className="px-6 py-2 select-none cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
          >
            Next <span>-{">"}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
