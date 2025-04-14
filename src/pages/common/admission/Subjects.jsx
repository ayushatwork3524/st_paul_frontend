import { useState } from "react";
import { FormSelect } from "../../../components/ui/FormSelect";

export const Subjects = ({
  errors,
  subjectData,
  setSubjectData,
  bSubjectData,
  setBSubjectData,
}) => {
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedMedium, setSelectedMedium] = useState("");
  const [selectedSubstream, setSelectedSubstream] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedBioFocal, setSelectedBioFocal] = useState("");
  const [selectedBioFocalLanguage, setSelectedBioFocalLanguage] = useState("");

  const streams = {
    Science: {
      medium: ["English"], // Science must be English
      substreams: {
        "General Science": [
          "English",
          "Marathi/Hindi/Sanskrit",
          "Physics",
          "Chemistry",
          "Biology",
          "Maths/Sociology",
        ],
        "Information Technology": [
          "English",
          "Marathi/Hindi/Sanskrit",
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
          "Marathi/Hindi/Sanskrit/Information Technology",
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

  const handleStreamChange = (event) => {
    setSelectedStream(event.target.value);
    setSelectedMedium(""); // Reset medium selection
    setSelectedSubstream("");
    setSelectedSubjects([]);
    setSelectedBioFocal("");
    setSelectedBioFocalLanguage("");
  };

  const handleMediumChange = (event) => {
    setSelectedMedium(event.target.value);
    setSelectedSubstream("");
    setSelectedSubjects([]);
  };

  const handleSubstreamChange = (event) => {
    setSelectedSubstream(event.target.value);
    setSelectedSubjects([]);
    setSelectedBioFocal("");
    setSelectedBioFocalLanguage("");
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleBioFocalChange = (event) => {
    setSelectedBioFocal(event.target.value);
    setSelectedBioFocalLanguage("");
  };

  const handleBioFocalLanguageChange = (event) => {
    setSelectedBioFocalLanguage(event.target.value);
  };

  const getSubjectOptions = (subject) =>
    subject.includes("/") ? subject.split("/").map((s) => s.trim()) : [subject];

  const handleConfirm = () => {
    const getConfirm = window.confirm("Are you sure you want to confirm?");

    if (!getConfirm) {
      return;
    }

    // Update subjectData
    setSubjectData({
      stream: selectedStream,
      medium: selectedMedium,
      subStream: selectedSubstream,
      subjects: selectedSubjects,
    });

    // Update bSubjectData (only if a Bio-Focal subject is selected)
    setBSubjectData({
      subStream: selectedBioFocal !== "None" ? selectedBioFocal : "",
      subject: selectedBioFocal !== "None" ? selectedBioFocalLanguage : "",
    });

    console.log("Final Selection:", {
      Stream: selectedStream,
      Medium: selectedMedium,
      Substream: selectedSubstream,
      Subjects: selectedSubjects,
      BioFocal: selectedBioFocal !== "None" ? selectedBioFocal : "None",
      BioFocalLanguage: selectedBioFocalLanguage || "None",
    });
  };

  return (
    <div className="w-full h-full p-4 flex gap-6">
      {/* Left Section: Subject Selection */}
      <div className="w-1/2 flex flex-col gap-5">
        {/* Stream Selection */}
        <FormSelect
          isRequired
          label="Select Stream"
          name="stream"
          error={errors?.stream}
          options={Object.keys(streams)}
          value={selectedStream}
          onChange={handleStreamChange}
        />

        {/* Medium Selection */}
        {selectedStream && (
          <FormSelect
            isRequired
            label="Select Medium"
            name="medium"
            error={errors?.medium}
            options={streams[selectedStream].medium}
            value={selectedMedium}
            onChange={handleMediumChange}
          />
        )}

        {/* Substream Selection */}
        {selectedMedium && (
          <FormSelect
            isRequired
            label="Select Substream"
            name="subStream"
            error={errors?.subStream}
            options={Object.keys(streams[selectedStream].substreams)}
            value={selectedSubstream}
            onChange={handleSubstreamChange}
          />
        )}

        {/* Subject Selection */}
        {selectedSubstream && (
          <div className="mt-4">
            <label className="font-semibold">Select Subjects:</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {streams[selectedStream].substreams[selectedSubstream]
                .flatMap((subject) => getSubjectOptions(subject))
                .map((subject) => (
                  <label key={subject} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={subject}
                      checked={selectedSubjects.includes(subject)}
                      onChange={() => handleSubjectChange(subject)}
                      className="w-4 h-4"
                    />
                    <span>{subject}</span>
                  </label>
                ))}
            </div>
          </div>
        )}

        {/* Bio-Focal Subjects Selection */}
        {selectedStream && (
          <div className="mt-4">
            <label className="font-semibold">
              Select Bio-Focal Subject (Optional):
            </label>
            <FormSelect
              label="Bio-Focal Subject"
              name="bioFocal"
              options={["None", ...Object.keys(bioFocalSubjects)]}
              value={selectedBioFocal}
              onChange={handleBioFocalChange}
            />
          </div>
        )}

        {/* Bio-Focal Language Selection */}
        {selectedBioFocal && selectedBioFocal !== "None" && (
          <div className="mt-4">
            <label className="font-semibold">Select Language:</label>
            <FormSelect
              label="Bio-Focal Language"
              name="bioFocalLanguage"
              error={errors.bSubject}
              options={bioFocalSubjects[selectedBioFocal].subjects}
              value={selectedBioFocalLanguage}
              onChange={handleBioFocalLanguageChange}
            />
          </div>
        )}
      </div>

      {/* Right Section: Preview */}
      <div className="flex w-1/2 flex-col gap-1">
        <div className=" bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold">Selected Deatils</h2>
          <p>
            <span className="font-semibold">Stream:</span>{" "}
            {selectedStream || "Not Selected"}
          </p>
          <p>
            <span className="font-semibold">Medium:</span>{" "}
            {selectedMedium || "Not Selected"}
          </p>
          <p>
            <span className="font-semibold">Substream:</span>{" "}
            {selectedSubstream || "Not Selected"}
          </p>
          <p>
            <span className="font-semibold">Subjects:</span>{" "}
            {selectedSubjects.length > 0 ? selectedSubjects.join(", ") : "None"}
          </p>
          <p>
            <span className="font-semibold">Bio-Focal Subject:</span>{" "}
            {selectedBioFocal !== "None" && selectedBioFocal
              ? selectedBioFocal
              : "Not Selected"}
          </p>
          <p>
            <span className="font-semibold">Bio-Focal Language:</span>{" "}
            {selectedBioFocalLanguage || "Not Selected"}
          </p>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>

        {subjectData ? (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-blue-600">
              Confirmed Details ✔️
            </h2>
            <p>
              <span className="font-semibold">Stream:</span>{" "}
              {subjectData?.stream || "Not Selected"}
            </p>
            <p>
              <span className="font-semibold">Medium:</span>{" "}
              {subjectData?.medium || "Not Selected"}
            </p>
            <p>
              <span className="font-semibold">Substream:</span>{" "}
              {subjectData?.subStream || "Not Selected"}
            </p>
            <p>
              <span className="font-semibold">Subjects:</span>{" "}
              {subjectData?.subjects?.length > 0
                ? subjectData.subjects.join(", ")
                : "None"}
            </p>
            <p>
              <span className="font-semibold">Bio-Focal Subject:</span>{" "}
              {bSubjectData?.subStream || "Not Selected"}
            </p>
            <p>
              <span className="font-semibold">Bio-Focal Language:</span>{" "}
              {bSubjectData?.subject || "Not Selected"}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
