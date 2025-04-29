import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useRef, useState } from "react";
import { auth_token } from "../constants/AppConstants";
import axios from "axios";
import { useParams } from "react-router-dom";
import { decodeId } from "../security/secureuri/SecureUri";
import { toast } from "react-toastify";
import { generate_TC_end_point } from "../api/ApiConstants";

const TcPdfPreviewEditable = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const { studentId } = useParams();
  const [formData, setFormData] = useState({
    studentId: "",
    tcNo: "",
    admissionNo: "",
    duePaid: "",
    totalDays: "",
    totalPresentDays: "",
    dateOfApplication: "",
    dateOfIssue: "",
    reason: "",
    remark: "",
    generalConduct: "",
    religion: "",
    category: "",
    place: "",
    fee: "",
    ncc: "",
    games: "",
    conduct: "",
    tongue: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(false);
  const pdfContainerRef = useRef(null);

  useEffect(() => {
    axios
      .post(
        `${generate_TC_end_point}/${decodeId(studentId)}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem(auth_token),
          },
        }
      )
      .then((response) => {
        const { statusCode } = response.data;
        if (statusCode === 200) {
          const base64Pdf = response.data.data;
          const binaryData = atob(base64Pdf);
          const byteArray = new Uint8Array(binaryData.length);
          for (let i = 0; i < binaryData.length; i++) {
            byteArray[i] = binaryData.charCodeAt(i);
          }
          const blob = new Blob([byteArray], { type: "application/pdf" });
          setPdfUrl(URL.createObjectURL(blob));
        }
      })
      .catch((error) => {
        console.error("Error fetching the PDF:", error);
        setError(true);
      });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["studentId", "tcNo"];

    requiredFields.forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.toUpperCase() });
  };

  const handleDownload = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const res = await axios.post(
        `${generate_TC_end_point}/${decodeId(studentId)}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem(auth_token),
          },
        }
      );

      const base64Pdf = res.data.data;
      const binaryData = atob(base64Pdf);
      const byteArray = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "TransferCertificate.pdf";
      link.click();
    } catch (error) {
      console.error("Failed to generate TC:", error);
    }
  };

  const renderInput = (name, placeholder, style) => (
    <div className={`absolute ${style}`}>
      <input
        name={name}
        type="text"
        value={formData[name]}
        onChange={handleChange}
        className="text-black focus:outline-none text-[16px] font-bold bg-transparent px-1 py-0.5"
        placeholder={placeholder}
      />
      {errors[name] && <p className="text-red-500 text-xs">{errors[name]}</p>}
    </div>
  );

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className=" text-2xl">Not Found</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center">
      {pdfUrl ? (
        <div className="flex-1 w-full flex justify-center">
          <div
            className="relative"
            ref={pdfContainerRef}
            style={{ width: "1000px", minHeight: "100%" }} // A4 Size
          >
            {/* PDF */}
            <Worker workerUrl="/pdf.worker.mjs">
              <Viewer fileUrl={pdfUrl} />
            </Worker>

            {/* Inputs */}
            {renderInput("tcNo", "Tc No", "top-[220px] left-[290px]")}
            {renderInput("studentId", "Student No", "top-[250px] left-[290px]")}
            {renderInput(
              "admissionNo",
              "Admission No",
              "top-[220px] right-[75px]"
            )}
            {renderInput("tongue", "", "top-[373px] -right-[80px]")}
            {renderInput("religion", "Religion", "top-[410px] right-[290px]")}
            {renderInput("category", "Category", "top-[410px] right-[90px]")}
            {renderInput("place", "Place", "top-[470px] right-[10px]")}
            {renderInput("duePaid", "Due Paid", "top-[700px] left-[500px]")}
            {renderInput("fee", "Fee", "top-[730px] left-[500px]")}
            {renderInput("totalDays", "Total Days", "top-[780px] left-[500px]")}
            {renderInput(
              "totalPresentDays",
              "Present Days",
              "top-[810px] left-[500px]"
            )}
            {renderInput("ncc", "NCC", "top-[840px] left-[500px]")}
            {renderInput("games", "Games", "top-[900px] left-[500px]")}
            {renderInput(
              "generalConduct",
              "Conduct",
              "top-[980px] left-[500px]"
            )}
            {renderInput(
              "dateOfApplication",
              "dd/mm/yyyy",
              "top-[1005px] left-[500px]"
            )}
            {renderInput(
              "dateOfIssue",
              "dd/mm/yyyy",
              "top-[1040px] left-[500px]"
            )}
            {renderInput("reason", "Reason", "top-[1065px] left-[500px]")}
            {renderInput("remark", "Remark", "top-[1095px] left-[500px]")}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <h1 className="text-2xl">Not Found</h1>
        </div>
      )}

      {/* Download Button */}
      {pdfUrl && (
        <div className="my-4">
          <button
            onClick={handleDownload}
            className="bg-green-600 cursor-pointer text-white py-2 px-5 rounded hover:bg-green-700"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default TcPdfPreviewEditable;
