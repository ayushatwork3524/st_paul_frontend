import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import { HiPencilSquare } from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";
import {
  generateLeavingCertificateService,
  getStudentsByIdService,
  updateBankDetailService,
  updateGuardianDetailService,
  updateLastSchoolService,
  updatePersonalDetailService,
  updateStudentAcademicsService,
} from "../../../service/ManagerService";
import { useState } from "react";
import { DetailsTable } from "./DetailsTable";
import { AcademicsDetail } from "./AcademicsDetail";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/store/LoadingSlice";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import { UpdateStudentModal } from "./UpdateStudentModal";
import { UpdateLastSchoolModal } from "./UpdateLastSchool";
import { UpdateBankModal } from "./UpdateBankDetail";
import { UpdateGuardianModal } from "./UpdateGuardian";
import { DocumentList } from "./DocumentList";
import { decodeId, encodeId } from "../../../security/secureuri/SecureUri";
import { HomeLoader } from "../../../components/ui/loaders/HomeLoader";
import { NoData } from "../../../components/ui/NoData";
import { downloadReceipt, getClassSuffix } from "../../../uitl/Util";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { UpdateImage } from "./UpdateImage";
import { openPopup } from "../../../redux/store/PopupSlice";
import { UpdateDocument } from "./UpdateDocument";
import { UpdateAcademicDetail } from "./UpdateAcademicDetail";
import LeavingCertificatesTable from "./LeavingCertificatesTable";
import { GrCertificate } from "react-icons/gr";

export const StudentDetail = () => {
  const { studentId } = useParams();
  const id = decodeId(studentId);
  const navigate = useNavigate();
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [isStudentModalOpen, setStudentModalOpen] = useState(false);
  const [isLastSchoolModalOpen, setIsLastSchoolModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [isGuardianOpen, setIsGuardianOpen] = useState(false);
  const [isAcademicOpen, setIsAcademicOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [document, setDocument] = useState(null);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();

  const {
    data: student,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      return await getStudentsByIdService(id);
    },
  });

  console.log(student);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const studentDetails = [
    { label: "First Name", value: `${student?.firstName || "-"}` },
    { label: "Father Name", value: `${student?.fatherName || "-"}` },
    { label: "Surname", value: `${student?.surname || "-"}` },
    { label: "Mother Name", value: `${student?.motherName || "-"}` },
    { label: "Email", value: `${student?.email || "-"}` },
    { label: "Mobile", value: `${student?.phoneNo || "-"}` },
    { label: "Gender", value: `${student?.gender?.toUpperCase() || "-"}` },
    {
      label: "Date of Birth",
      value: `${formatDate(student?.dateOfBirth) || "-"}`,
    },
    { label: "Adhar No.", value: `${student?.adharNo || "-"}` },
    { label: "Blood Group", value: `${student?.bloodGroup || "-"}` },
    { label: "Caste", value: `${student?.caste || "-"}` },
    { label: "Category", value: `${student?.category || "-"}` },
    {
      label: "Scolarship Category",
      value: `${student?.scholarshipCategory || "-"}`,
    },
    { label: "Local Address", value: `${student?.localAddress || "-"}` },
    {
      label: "Permanent Address",
      value: `${student?.permanentAddress || "-"}`,
    },
  ];

  const bankDetails = [
    { label: "Bank Name", value: `${student?.bankDetail?.bankName || "-"}` },
    {
      label: "Bank Branch",
      value: `${student?.bankDetail?.branchName || "-"}`,
    },
    {
      label: "Account Number",
      value: `${student?.bankDetail?.accountNo || "-"}`,
    },
    { label: "IFSC Code", value: `${student?.bankDetail?.ifscCode || "-"}` },
  ];

  const lastDetails = [
    {
      label: "School/College Name",
      value: `${student?.lastSchool?.collegeName || "-"}`,
    },
    {
      label: "U Dise Number",
      value: `${student?.lastSchool?.uid || "-"}`,
    },
    {
      label: "Examination",
      value: `${student?.lastSchool?.examination || "-"}`,
    },
    {
      label: "Roll Number",
      value: `${student?.lastSchool?.rollNo || "-"}`,
    },
    {
      label: "Exam Month",
      value: `${student?.lastSchool?.examMonth || "-"}`,
    },
    {
      label: "Marks Obtained",
      value: `${student?.lastSchool?.marksObtained || "-"}`,
    },
    { label: "Result", value: `${student?.lastSchool?.result || "-"}` },
  ];

  const guardianDetails = [
    { label: "Name", value: `${student?.guardianInfo?.name || "-"}` },
    { label: "Relation", value: `${student?.guardianInfo?.relation || "-"}` },
    {
      label: "Mobile Number",
      value: `${student?.guardianInfo?.phone || "-"}`,
    },
    {
      label: "Occupation ",
      value: `${student?.guardianInfo?.occupation || "-"}`,
    },
    { label: "Income", value: `${student?.guardianInfo?.income || "-"}` },
  ];

  const handleSave = async (updateStudent) => {
    // console.log("Updated Student Data:", updateStudent);
    dispatch(setLoading(true));
    const res = await updatePersonalDetailService(
      student?.studentId,
      updateStudent
    );
    if (res?.statusCode === 200) {
      dispatch(setLoading(false));
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

  const handleLastSave = async (updatedLastSchool) => {
    // console.log("Updated Student Data:", updatedLastSchool);
    dispatch(setLoading(true));
    const res = await updateLastSchoolService(
      student?.studentId,
      updatedLastSchool?.lsId,
      updatedLastSchool
    );
    if (res?.statusCode === 200) {
      dispatch(setLoading(false));
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

  const handleBankSave = async (updateBank) => {
    // console.log("Updated Student Data:", updateBank);
    dispatch(setLoading(true));
    const res = await updateBankDetailService(
      student?.studentId,
      updateBank?.bankDetailId,
      updateBank
    );
    if (res?.statusCode === 200) {
      dispatch(setLoading(false));
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

  const handleGuardianSave = async (updateGuardian) => {
    // console.log("Updated Student Data:", updateBank);
    dispatch(setLoading(true));
    const res = await updateGuardianDetailService(
      student?.studentId,
      updateGuardian?.giId,
      updateGuardian
    );
    if (res?.statusCode === 200) {
      dispatch(setLoading(false));
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

  const handleAcademicSave = async (updateAcademic) => {
    const { biofocalSubject, stream, ...paylod } = updateAcademic;
    console.log("Updated Student Data:", paylod);
    dispatch(setLoading(true));
    const res = await updateStudentAcademicsService(
      student?.studentId,
      updateAcademic?.studentAcademicsId,
      paylod
    );
    if (res?.statusCode === 200) {
      dispatch(setLoading(false));
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

  const handleDelete = () => {
    dispatch(
      openPopup({
        title: "Delete Confirmation",
        message: "Are you sure you want to delete this student?",
        confirmText: "Yes, Delete",
        cancelText: "Cancel",
        functionKey: "deleteStudent",
        functionParams: [id],
      })
    );
  };

  const handleGenerateLeaving = async () => {
    dispatch(setLoading(true));
  
    try {
      const res = await generateLeavingCertificateService(student?.studentId);
  
      if (res && res.data) {
        const blob = new Blob([res.data], { type: "application/pdf" });
  
        const link = window.document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "leaving-certificate.pdf";
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);
      } else {
        console.error("No data in response");
      }
    } catch (err) {
      console.error("Failed to generate leaving certificate:", err);
    }
  
    dispatch(setLoading(false));
  };
  

  const handleAddDocument = () => {
    navigate(`/user/student/${studentId}/document`);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <HomeLoader />
      </div>
    );
  }

  if (!student || student?.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <NoData content="No Student data available." />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
      <div className="flex items-center justify-between p-6 bg-white sticky top-0 w-full z-20">
        <div
          onClick={() => navigate(-1)}
          className="cursor-pointer text-blue-600"
        >
          <BsArrowLeftCircle size={30} />
        </div>

        <div className="flex-1 flex justify-center">
          <h1 className="text-2xl font-semibold font-serif">Detail</h1>
        </div>

        <div className="flex gap-2">

          <button
            onClick={handleGenerateLeaving}
            className="flex items-center cursor-pointer gap-2 p-2 border rounded-md border-blue-400 text-blue-500 font-medium uppercase hover:bg-blue-100 transition"
          >
            <GrCertificate size={24} />
            <span>Generate Leaving</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center cursor-pointer gap-2 p-2 border rounded-md border-red-400 text-red-500 font-medium uppercase hover:bg-red-100 transition"
          >
            <MdDeleteOutline size={24} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="mx-auto w-[65%] flex flex-col gap-5 md:flex-row md:gap-0 items-center">
        <div className="w-1/2 flex flex-col gap-3 justify-center items-center">
          <figure className="w-40 h-auto border border-gray-400">
            <span className="flex justify-end cursor-pointer items-center relative z-10">
              <HiOutlinePencilAlt
                onClick={() => setIsImageOpen(true)}
                size={20}
              />
            </span>
            <img
              className="w-40 h-auto"
              src={
                student?.image
                  ? `data:image/jpeg;base64,${student.image}`
                  : "/student.jpg"
              }
              alt="student image"
            />
          </figure>
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-medium font-urbanist">
              {student?.firstName || "-"} {student?.surname || "-"}
            </p>
            <div className="flex justify-center">
              <p className="px-2 py-1 rounded-full bg-blue-200">
                {getClassSuffix(student?.stdClass)}
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex px-6 flex-col gap-4">
          <div className="rounded-lg border border-gray-200 p-2 flex flex-col gap-2">
            <div className="flex justify-between">
              <h3 className="text-lg font-serif font-medium text-gray-800">
                Form Details
              </h3>
            </div>
            <div className="flex flex-col flex-wrap ">
              <p className="flex justify-between">
                Form No <span className="font-medium">1555</span>
              </p>
              <p className="flex justify-between">
                Session{" "}
                <span className="font-medium">{student?.session || "-"}</span>
              </p>
              <p className="flex justify-between">
                Class{" "}
                <span className="font-medium">{student?.stdClass || "-"}</span>
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 p-2 flex flex-col gap-2">
            <div className="flex justify-between ">
              <h3 className="text-lg font-serif font-medium text-gray-800">
                Student Details
              </h3>
            </div>
            <div className="flex flex-col flex-wrap ">
              <p className="flex justify-between">
                Roll No{" "}
                <span className="font-medium">
                  {student?.studentAcademics[0]?.rollNo || "-"}
                </span>
              </p>
              <p className="flex justify-between">
                Mobile Number{" "}
                <span className="font-medium">{student?.phoneNo || "-"}</span>
              </p>
              <p className="flex justify-between">
                Email{" "}
                <span className="font-medium">{student?.email || "-"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="px-20 py-3">
          <div className="flex gap-5">
            <h3 className="text-xl font-serif font-medium text-gray-900">
              Personal Details
            </h3>
            <p className="flex justify-center items-center">
              <HiPencilSquare
                onClick={() => setStudentModalOpen(true)}
                className="cursor-pointer"
                size={20}
              />
            </p>
          </div>

          <div className="mt-5">
            <DetailsTable detailData={studentDetails} />
          </div>
        </div>

        <div className="px-20 py-3">
          <div className="flex gap-5">
            <h3 className="text-xl font-serif font-medium text-gray-900">
              Academic Details
            </h3>
          </div>

          <div className="flex gap-3 mt-2 px-6 overflow-x-auto">
            {student?.studentAcademics?.map((record, index) => (
              <div className="flex gap-1" key={index}>
                <button
                  key={index}
                  className={`p-2 cursor-pointer text-sm font-semibold rounded-t-md transition ${activeTab === index
                    ? " text-blue-600 border-b border-b-blue-600"
                    : "text-gray-600"
                    }`}
                  onClick={() => setActiveTab(index)}
                >
                  {`Class ${record.stdClass}`}
                </button>
                {activeTab === index && (
                  <button
                    onClick={() => {
                      setSelectedRecord(record);
                      setIsAcademicOpen(true);
                    }}
                    className="flex text-gray-800 justify-center items-center"
                  >
                    <HiPencilSquare className="cursor-pointer" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5">
            {student?.studentAcademics?.length > 0 ? (
              student?.studentAcademics?.map(
                (detail, index) =>
                  activeTab === index && (
                    <AcademicsDetail key={index} detailData={detail} />
                  )
              )
            ) : (
              <div>
                <p className=" text-gray-500">No Academic details available.</p>
              </div>
            )}
          </div>
        </div>

        {/* <div className="px-20 py-3">
          <div className="flex gap-5">
            <h3 className="text-xl font-serif font-medium text-gray-900">
              Bank Details
            </h3>
            <p className="flex justify-center items-center">
              <HiPencilSquare
                onClick={() => setIsBankModalOpen(true)}
                className="cursor-pointer"
                size={20}
              />
            </p>
          </div>

          <div className="mt-5">
            <DetailsTable detailData={bankDetails} />
          </div>
        </div> */}

        <div className="px-20 py-3">
          <div className="flex gap-5">
            <h3 className="text-xl font-serif font-medium text-gray-900">
              Last School/College Details
            </h3>
            <p className="flex justify-center items-center">
              <HiPencilSquare
                onClick={() => setIsLastSchoolModalOpen(true)}
                className="cursor-pointer"
                size={20}
              />
            </p>
          </div>

          <div className="mt-5">
            <DetailsTable detailData={lastDetails} />
          </div>
        </div>

        <div className="px-20 py-3">
          <div className="flex gap-5">
            <h3 className="text-xl font-serif font-medium text-gray-900">
              Guardian Details
            </h3>
            <p className="flex justify-center items-center">
              <HiPencilSquare
                onClick={() => setIsGuardianOpen(true)}
                className="cursor-pointer"
                size={20}
              />
            </p>
          </div>

          <div className="mt-5">
            <DetailsTable detailData={guardianDetails} />
          </div>
        </div>
      </div>
      <div className="px-20 py-3 flex flex-col gap-4">
        <h2 className="text-xl font-serif font-medium text-gray-900">
          Documents
        </h2>
        <DocumentList
          documents={student?.documents}
          setSelectedDocId={setSelectedDocId}
          setIsDocumentOpen={setIsDocumentOpen}
          handleAddDocument={handleAddDocument}
        />
      </div>

      {/* <div className="px-20 py-3 flex flex-col gap-4">
        <h2 className="text-xl font-serif font-medium text-gray-900">
          Leaving Certificates
        </h2>
        <LeavingCertificatesTable leavingCertificates={student?.leavingCertificates} />
      </div> */}

      <div className="z-30">
        <UpdateImage
          isOpen={isImageOpen}
          onClose={() => {
            setImage(null);
            setIsImageOpen(false);
          }}
          image={image}
          setImage={setImage}
          studentId={student?.studentId}
        />
        <UpdateDocument
          isOpen={isDocumentOpen}
          onClose={() => {
            setDocument(null);
            setSelectedDocId(null);
            setIsDocumentOpen(false);
          }}
          file={document}
          setFile={setDocument}
          docId={selectedDocId}
        />
        <UpdateStudentModal
          isOpen={isStudentModalOpen}
          onClose={() => setStudentModalOpen(false)}
          student={student}
          onSave={handleSave}
        />
        <UpdateAcademicDetail
          isOpen={isAcademicOpen}
          onClose={() => {
            setIsAcademicOpen(false);
            setSelectedRecord(null);
          }}
          academicDetail={selectedRecord}
          onSave={handleAcademicSave}
        />
        <UpdateLastSchoolModal
          isOpen={isLastSchoolModalOpen}
          onClose={() => setIsLastSchoolModalOpen(false)}
          lastSchool={student?.lastSchool}
          onSave={handleLastSave}
        />
        <UpdateBankModal
          isOpen={isBankModalOpen}
          onClose={() => setIsBankModalOpen(false)}
          bankDetail={student?.bankDetail}
          onSave={handleBankSave}
        />
        <UpdateGuardianModal
          isOpen={isGuardianOpen}
          onClose={() => setIsGuardianOpen(false)}
          guardian={student?.guardianInfo}
          onSave={handleGuardianSave}
        />
      </div>
    </div>
  );
};
