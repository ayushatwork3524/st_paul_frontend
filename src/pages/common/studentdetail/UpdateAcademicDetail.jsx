import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FormInput } from "../../../components/ui/FormInput";
import { FormSelect } from "../../../components/ui/FormSelect";
import { HiPencilSquare } from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";
import { getAllClassesService } from "../../../service/UserService";
import ExamMonthPicker from "../../../components/ui/ExamMonthPicker";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";
import { HomeLoader } from "../../../components/ui/loaders/HomeLoader";
import {
  updateStudentBioFocalService,
  updateStudentStreamService,
} from "../../../service/ManagerService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/store/LoadingSlice";

export const UpdateAcademicDetail = ({
  isOpen,
  onClose,
  academicDetail,
  onSave,
}) => {
  const [updatedAcademicDetail, setUpdateAcademicDetail] = useState({});
  const [errors, setErrors] = useState({});
  const [subErrors, setSubErrors] = useState({});
  const [bioErrors, setBioErrors] = useState({});
  const [listHeight, setListHeight] = useState(window.innerHeight * 0.9);
  const [contentHeight, setContentHeight] = useState(window.innerHeight * 0.6);
  const [isSubjectEditable, setIsSubjectEditable] = useState(false);
  const [isBioEditable, setIsBioEditable] = useState(false);
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedMedium, setSelectedMedium] = useState("");
  const [selectedSubstream, setSelectedSubstream] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedBioStream, setSelectedBioStream] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setListHeight(window.innerHeight * 0.9);
      setContentHeight(window.innerHeight * 0.6);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setUpdateAcademicDetail({ ...academicDetail });
  }, [academicDetail]);

  const handleChange = (e) => {
    setUpdateAcademicDetail({
      ...updatedAcademicDetail,
      [e.target.name]:
        e.target.name === "alumni"
          ? e.target.value === "Yes"
          : e.target.value === ""
          ? undefined
          : e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const { data: classes } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      return await getAllClassesService();
    },
  });

  const handleSubjectSelection = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const streams = {
    Science: {
      medium: ["English"], // Science must be English
      substreams: {
        "General Science": [
          "English",
          ["Marathi", "Hindi", "Sanskrit"], // Separated for individual selection
          "Physics",
          "Chemistry",
          "Biology",
          "Maths/Sociology",
        ],
        "Information Technology": [
          "English",
          ["Marathi", "Hindi", "Sanskrit"], // Separated for individual selection
          "Physics",
          "Chemistry",
          "Biology",
          "Maths",
        ],
      },
    },
    Commerce: {
      medium: ["English", "Marathi"], // Commerce can be English or Marathi
      substreams: {
        "English & Information Technology": [
          "English",
          ["Marathi", "Hindi", "Sanskrit", "Information Technology"], // Separated
          "Economic",
          "Organization of Commerce",
          "Secretarial Practice",
          "Book Keeping and Accountancy",
          "E.V.S",
        ],
      },
    },
  };

  const bioFocalSubjects = {
    "Computer Science": {
      subjects: ["English", "Physics", "Chemistry", "Maths"],
    },
    Electronics: {
      subjects: ["English", "Physics", "Chemistry", "Maths"],
    },
    Fishery: {
      subjects: ["English", "Physics", "Chemistry", "Biology"],
    },
  };

  const validate = () => {
    let newErrors = {};

    if (!updatedAcademicDetail.collegeName?.trim()) {
      newErrors.collegeName = "College Name is required";
    }

    if (!updatedAcademicDetail.stdClass?.trim()) {
      newErrors.stdClass = "Select the class";
    }

    if (!updatedAcademicDetail.examination?.trim()) {
      newErrors.examination = "Examination Name is required";
    }

    if (
      !updatedAcademicDetail.marksObtained
      // updatedAcademicDetail.marksObtained.trim() === ""
    ) {
      newErrors.marksObtained = "Marks is required";
    } else if (isNaN(updatedAcademicDetail.marksObtained)) {
      newErrors.marksObtained = "Marks must be a valid number";
    } else if (
      Number(updatedAcademicDetail.marksObtained) < 0 ||
      Number(updatedAcademicDetail.marksObtained) > 100
    ) {
      newErrors.marksObtained = "Marks must be between 0 and 100";
    }

    if (!updatedAcademicDetail.status?.trim()) {
      newErrors.status = "Select the status";
    }

    if (!updatedAcademicDetail.rollNo?.trim()) {
      newErrors.rollNo = "Enter the Roll Number";
    }

    if (!updatedAcademicDetail.examMonth?.trim()) {
      newErrors.examMonth = "Select the Exam Month";
    }

    if (!updatedAcademicDetail.result?.trim()) {
      newErrors.result = "Select the Result";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSubjects = () => {
    let newErrors = {};

    if (!selectedStream) {
      newErrors.sStream = "Select the stream";
    }

    if (!selectedMedium) {
      newErrors.sMedium = "Select the medium";
    }

    if (!selectedSubstream) {
      newErrors.sSubStream = "Select the substream";
    }

    if (selectedSubjects.length === 0) {
      newErrors.sSubjects = "Select at least one subject";
    }

    setSubErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateBioSubjects = () => {
    let newErrors = {};

    if (!selectedBioStream) {
      newErrors.bioStream = "Select the stream";
    }

    if (!selectedSubject) {
      newErrors.bioSubject = "Select the subject";
    }

    setBioErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    // if (!validate()) {
    //   toast.warn("Please fill all the required fields");
    //   return;
    // }
    onSave(updatedAcademicDetail);
    onClose();
  };

  const handleSubjectSave = async () => {
    if (!validateSubjects()) {
      toast.warn("Please fill all the required fields");
      return;
    }

    const payload = {
      stream: selectedStream,
      subStream: selectedSubstream,
      medium: selectedMedium,
      subjects: selectedSubjects,
    };

    dispatch(setLoading(true));
    const res = await updateStudentStreamService(
      updatedAcademicDetail?.studentAcademicsId,
      updatedAcademicDetail?.stream?.id,
      payload
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

    setSelectedStream("");
    setSelectedSubstream("");
    setSelectedMedium("");
    setSelectedSubjects([]);

    setIsSubjectEditable(false);

    console.log(payload);
  };

  const handleBioSave = async () => {
    if (!validateBioSubjects()) {
      toast.warn("Please fill all the required fields");
      return;
    }
    const payload = {
      subStream: selectedBioStream,
      medium: "English",
      subject: selectedSubject,
    };

    dispatch(setLoading(true));
    const res = await updateStudentBioFocalService(
      updatedAcademicDetail?.studentAcademicsId,
      updatedAcademicDetail?.biofocalSubject?.id,
      payload
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

    setSelectedBioStream("");
    setSelectedSubject("");

    setIsBioEditable(false);

    console.log(payload);
  };

  if (!isOpen) return null;

  // if (isLoading) {
  //   return (
  //     <div className="fixed inset-0 flex items-center w-full h-full justify-center bg-black/20">
  //       <div
  //         style={{ height: listHeight }}
  //         className="bg-white p-6 rounded-lg flex flex-col justify-center items-center shadow-lg w-[95%]"
  //       >
  //         <HomeLoader />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20">
      <div
        className="bg-white p-6 rounded-lg flex flex-col justify-between shadow-lg w-[95%]"
        style={{ height: listHeight }}
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-between w-[98%] mx-auto">
            <h2 className="text-lg text-gray-800 mb-4 font-serif">
              Update Academics
            </h2>
            <RxCross2
              onClick={() => {
                setIsSubjectEditable(false);
                setIsBioEditable(false);
                onClose();
              }}
              size={24}
              className="cursor-pointer transform hover:text-red-600 hover:scale-110"
            />
          </div>

          <div
            className="flex flex-col gap-10 px-2 overflow-auto"
            style={{ height: contentHeight }}
          >
            <div className="flex gap-3 w-full">
              <FormInput
                isRequired
                label="College Name"
                type="text"
                name="collegeName"
                value={updatedAcademicDetail.collegeName || ""}
                onChange={handleChange}
                placeholder="College Name"
                error={errors.collegeName}
              />
              <FormSelect
                isRequired
                label="Class"
                name="stdClass"
                value={updatedAcademicDetail.stdClass || ""}
                onChange={handleChange}
                options={classes}
                error={errors.stdClass}
              />
              <FormSelect
                isRequired
                label="Section"
                name="section"
                value={updatedAcademicDetail.section}
                onChange={handleChange}
                options={["A", "B", "C"]}
                error={errors.section}
              />
            </div>
            <div className="flex gap-3 w-full">
              <FormInput
                isRequired
                label="Examination"
                type="text"
                name="examination"
                value={updatedAcademicDetail.examination || ""}
                onChange={handleChange}
                placeholder="Examination"
                error={errors.examination}
              />
              <FormInput
                isRequired
                label="Marks Obtained"
                type="text"
                name="marksObtained"
                value={updatedAcademicDetail.marksObtained || ""}
                onChange={handleChange}
                placeholder="Marks Obtained"
                error={errors.marksObtained}
              />
              <FormSelect
                isRequired
                label="Status"
                name="status"
                value={updatedAcademicDetail.status || ""}
                onChange={handleChange}
                options={["Ongoing", "Pending", "Completed"]}
                error={errors.status}
              />
            </div>
            <div className="flex gap-3 w-full">
              <FormInput
                isRequired
                label="Roll No"
                type="text"
                name="rollNo"
                value={updatedAcademicDetail.rollNo || ""}
                onChange={handleChange}
                placeholder="Roll No"
                error={errors.rollNo}
              />
              <ExamMonthPicker
                value={updatedAcademicDetail.examMonth}
                error={errors.examMonth}
                isRequired
                onChange={handleChange}
              />
              <FormSelect
                isRequired
                label="Result"
                name="result"
                value={updatedAcademicDetail.result || ""}
                onChange={handleChange}
                options={["PASS", "FAIL", "ON_GOING"]}
                error={errors.result}
              />
            </div>
            <div className="flex gap-3 w-full">
              <FormSelect
                isRequired
                label="Alumni"
                name="alumni"
                value={updatedAcademicDetail.alumni ? "Yes" : "No"}
                onChange={handleChange}
                options={["Yes", "No"]}
                error={errors.alumni}
              />
              <div className="w-full"></div>
              <div className="w-full"></div>
            </div>

            <div>
              <div className="flex gap-3 mb-5">
                <h3 className="text-lg font-serif font-medium text-gray-900">
                  Subjects
                </h3>
                {isSubjectEditable ? (
                  <>
                    <p className="flex justify-center text-red-600 items-center">
                      <RxCross2
                        onClick={() => {
                          setSelectedStream("");
                          setSelectedSubstream("");
                          setSelectedMedium("");
                          setSelectedSubjects([]);
                          setIsSubjectEditable(false);
                        }}
                        className="cursor-pointer"
                        size={20}
                      />
                    </p>
                    <p
                      onClick={handleSubjectSave}
                      className="flex justify-center text-green-600 items-center"
                    >
                      <FaRegCheckCircle className="cursor-pointer" size={20} />
                    </p>
                  </>
                ) : (
                  <p className="flex justify-center items-center">
                    <HiPencilSquare
                      onClick={() => setIsSubjectEditable(true)}
                      className="cursor-pointer"
                      size={20}
                    />
                  </p>
                )}
              </div>
              <div>
                {isSubjectEditable ? (
                  <div className="flex flex-col gap-4 p-4 mx-auto">
                    {/* Stream Selection */}
                    <FormSelect
                      value={selectedStream}
                      label="Select Stream"
                      error={subErrors?.sStream}
                      onChange={(e) => {
                        setSelectedStream(e.target.value);
                        setSelectedMedium("");
                        setSelectedSubstream("");
                        setSelectedSubjects([]);
                      }}
                      options={Object.keys(streams)}
                    />

                    {/* Medium Selection */}
                    {selectedStream && (
                      <>
                        <FormSelect
                          value={selectedMedium}
                          error={subErrors.sMedium}
                          label="Select Medium"
                          onChange={(e) => {
                            setSelectedMedium(e.target.value);
                            setSelectedSubstream("");
                            setSelectedSubjects([]);
                          }}
                          options={streams[selectedStream].medium}
                        />
                      </>
                    )}

                    {/* Substream Selection */}
                    {selectedMedium && (
                      <>
                        <FormSelect
                          value={selectedSubstream}
                          onChange={(e) => {
                            setSelectedSubstream(e.target.value);
                            setSelectedSubjects([]);
                          }}
                          error={subErrors.sSubStream}
                          label="Select Substream"
                          options={Object.keys(
                            streams[selectedStream].substreams
                          )}
                        />
                      </>
                    )}

                    {/* Subject Selection (Checkboxes) */}
                    {selectedSubstream && (
                      <div className="mt-4 p-3 bg-gray-100 rounded">
                        <h3 className="font-semibold">Select Subjects:</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {streams[selectedStream].substreams[
                            selectedSubstream
                          ].flatMap((subject) =>
                            Array.isArray(subject)
                              ? subject.map((lang) => (
                                  <label
                                    key={lang}
                                    className="flex items-center gap-2"
                                  >
                                    <input
                                      type="checkbox"
                                      value={lang}
                                      checked={selectedSubjects.includes(lang)}
                                      onChange={() =>
                                        handleSubjectSelection(lang)
                                      }
                                      className="cursor-pointer"
                                    />
                                    {lang}
                                  </label>
                                ))
                              : [
                                  <label
                                    key={subject}
                                    className="flex items-center gap-2"
                                  >
                                    <input
                                      type="checkbox"
                                      value={subject}
                                      checked={selectedSubjects.includes(
                                        subject
                                      )}
                                      onChange={() =>
                                        handleSubjectSelection(subject)
                                      }
                                      className="cursor-pointer"
                                    />
                                    {subject}
                                  </label>,
                                ]
                          )}
                        </div>
                        {subErrors.sSubjects && (
                          <p className="text-red-500">{subErrors.sSubjects}</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-blue-100 text-left text-gray-700 uppercase text-sm">
                        <th className="p-3 border">Stream</th>
                        <th className="p-3 border">Sub Stream</th>
                        <th className="p-3 border">Medium</th>
                        <th className="p-3 border">Subjects</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border hover:bg-gray-100 transition">
                        <td className="p-3 border">
                          {updatedAcademicDetail?.stream?.stream || "-"}
                        </td>
                        <td className="p-3 border">
                          {updatedAcademicDetail?.stream?.subStream || "-"}
                        </td>
                        <td className="p-3 border">
                          {updatedAcademicDetail?.stream?.medium || "-"}
                        </td>
                        <td className="p-3 border">
                          {updatedAcademicDetail?.stream?.subjects
                            ?.map((sub) => sub.name)
                            .join(", ") || "-"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div>
              <div className="flex gap-3 mb-5">
                <h3 className="text-lg font-serif font-medium text-gray-900">
                  Bio-Focal Subjects
                </h3>
                {isBioEditable ? (
                  <>
                    <p className="flex justify-center text-red-600 items-center">
                      <RxCross2
                        onClick={() => {
                          setSelectedBioStream("");
                          setSelectedSubject("");
                          setIsBioEditable(false);
                        }}
                        className="cursor-pointer"
                        size={20}
                      />
                    </p>
                    <p
                      onClick={handleBioSave}
                      className="flex justify-center text-green-600 items-center"
                    >
                      <FaRegCheckCircle className="cursor-pointer" size={20} />
                    </p>
                  </>
                ) : (
                  <p className="flex justify-center items-center">
                    <HiPencilSquare
                      onClick={() => setIsBioEditable(true)}
                      className="cursor-pointer"
                      size={20}
                    />
                  </p>
                )}
              </div>
              <div>
                {isBioEditable ? (
                  <div>
                    <FormSelect
                      label="Select Bio-Focal Stream"
                      onChange={(e) => {
                        setSelectedBioStream(e.target.value);
                        setSelectedSubject("");
                      }}
                      error={bioErrors?.bioStream}
                      value={selectedBioStream}
                      options={Object.keys(bioFocalSubjects)}
                    />

                    {selectedBioStream && (
                      <div className="mt-4">
                        <FormSelect
                          label="Select Subject"
                          onChange={(e) => setSelectedSubject(e.target.value)}
                          value={selectedSubject}
                          error={bioErrors?.bioSubject}
                          options={
                            bioFocalSubjects[selectedBioStream]?.subjects
                          }
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-blue-100 text-left text-gray-700 uppercase text-sm">
                        <th className="p-3 border">Stream</th>
                        <th className="p-3 border">Medium</th>
                        <th className="p-3 border">Subjects</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border hover:bg-gray-100 transition">
                        <td className="p-3 border">
                          {updatedAcademicDetail?.biofocalSubject?.subStream ||
                            "-"}
                        </td>
                        <td className="p-3 border">
                          {updatedAcademicDetail?.biofocalSubject?.medium ||
                            "-"}
                        </td>
                        <td className="p-3 border">
                          {updatedAcademicDetail?.biofocalSubject?.subject ||
                            "-"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              setIsSubjectEditable(false);
              setIsBioEditable(false);
              onClose();
            }}
            className="px-6 py-2 cursor-pointer bg-gray-200 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
