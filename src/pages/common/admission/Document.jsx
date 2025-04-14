import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { submitDocumentService } from "../../../service/ManagerService";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/store/LoadingSlice";
import { decodeId, encodeId } from "../../../security/secureuri/SecureUri";

export const Document = () => {
  const [documents, setDocuments] = useState({});
  const [errors, setErrors] = useState({});
  const [undertakingChecked, setUndertakingChecked] = useState(false);
  const [declarationChecked, setDeclarationChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { studentId } = useParams();

  const id = decodeId(studentId);

  const requiredDocuments = [
    "Leaving Certificate",
    "Mark Sheet",
    "Migration Certificate",
    "Character Certificate",
    "Certificates from Two Respectable Persons",
    "2 Self Addressed Envelope",
  ];

  // Handle file selection
  const handleFileChange = (e, docName) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments((prevDocs) => ({
        ...prevDocs,
        [docName]: file,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [docName]: "",
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all required documents are uploaded
    const newErrors = {};
    requiredDocuments.forEach((docName) => {
      if (!documents[docName]) {
        newErrors[docName] = `${docName} is required`;
      }
    });

    // Ensure both checkboxes are checked
    if (!undertakingChecked || !declarationChecked) {
      toast.error("You must agree to the undertaking and declaration.");
      return;
    }

    // If errors exist, set them and prevent submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please upload all required documents.");
      return;
    }

    const formData = new FormData();
    Object.entries(documents).forEach(([docName, file]) => {
      formData.append(docName, file);
    });

    dispatch(setLoading(true));
    const res = await submitDocumentService(id, formData);

    if (res?.statusCode === 200) {
      dispatch(setLoading(false));
      navigate("/user/students");
      setTimeout(() => {
        toast.success(res?.message);
      }, 1000);
    } else {
      dispatch(setLoading(false));
      setTimeout(() => {
        toast.error(res?.message);
      }, 1000);
    }
  };

  return (
    <div className="p-10 bg-gray-100 rounded-lg mx-auto">
      <h2 className="text-xl font-medium text-gray-800 mb-8 font-serif">
        Upload Required Documents
      </h2>

      <form onSubmit={handleSubmit}>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">
                Document Name
              </th>
              <th className="border border-gray-300 px-4 py-2">Upload File</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {requiredDocuments.map((docName) => (
              <tr key={docName} className="bg-white">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  {docName} <span className="text-red-500">*</span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, docName)}
                    className="block w-full border cursor-pointer p-2 focus:outline-none border-gray-300"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {documents[docName] ? (
                    <span className="text-green-600 font-bold">✔ Selected</span>
                  ) : (
                    <span className="text-red-500">Not Selected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Undertaking and Declaration Checkboxes */}
        <div className="mt-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={undertakingChecked}
              onChange={() => setUndertakingChecked(!undertakingChecked)}
              className="w-4 h-4"
            />
            <span className="text-gray-800">
              I have read your prospectus carefully and I undertake that I will
              abide by all the rules and regulations of the college and I will
              attend 75% attendance in N.C.C./P.T. classes. I will not change
              optional subject once selected and if I leave the college any time
              after admission for any reason, I will pay Tuition and other fees
              for the whole session with fine applicable.{" "}
              <strong>Undertaking by Student</strong>.
            </span>
          </label>
        </div>

        <div className="mt-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={declarationChecked}
              onChange={() => setDeclarationChecked(!declarationChecked)}
              className="w-4 h-4"
            />
            <span className="text-gray-800">
              I declare that the applicant is my son/daughter/ward and the
              particulars given by him/her are correct. I further declare that I
              shall be responsible for his/her behaviour in the college and
              shall see that he/she observes all the rules of the college
              including rules of conduct, attendance at lectures and
              N.C.C./P.T., payment of fees and fine given in the prospectus.{" "}
              <strong>Declaration of Father or Guardian</strong>.
            </span>
          </label>
        </div>

        <div className="flex justify-center items-center mt-5">
          <button
            type="submit"
            className={`mt-4 cursor-pointer px-4 py-2 rounded text-white ${
              undertakingChecked && declarationChecked
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!undertakingChecked || !declarationChecked}
          >
            Upload Documents
          </button>
        </div>
      </form>
    </div>
  );
};
