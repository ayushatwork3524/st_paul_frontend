import ExamMonthPicker from "../../../components/ui/ExamMonthPicker";
import { FormInput } from "../../../components/ui/FormInput";
import { FormSelect } from "../../../components/ui/FormSelect";

export const LastSchool = ({ lastSchoolData, setLastSchoolData, errors }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLastSchoolData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const results = ["PASS", "FAIL", "ATKT"];

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex justify-between gap-2">
        <FormInput
          value={lastSchoolData.collegeName}
          error={errors.collegeName}
          onChange={handleInputChange}
          isRequired={true}
          name="collegeName"
          label="Last School/College Name"
          placeholder="Last School/College Name"
        />
        <FormInput
          value={lastSchoolData.uid}
          error={errors.uid}
          onChange={handleInputChange}
          isRequired={true}
          name="uid"
          label="Last School U Dise Number"
          placeholder="Last School U Dise Number"
        />
        <FormInput
          value={lastSchoolData.lastStudentId}
          error={errors.lastStudentId}
          onChange={handleInputChange}
          isRequired={true}
          name="lastStudentId"
          label="Last Student Id"
          placeholder="Last Student Id"
        />
      </div>
      <div className="flex justify-between gap-2">
        <FormInput
          value={lastSchoolData.examination}
          error={errors.examination}
          onChange={handleInputChange}
          isRequired={true}
          name="examination"
          label="Examination Name"
          placeholder="Examination Name"
        />
        <FormInput
          value={lastSchoolData.rollNo}
          error={errors.rollNo}
          onChange={handleInputChange}
          name="rollNo"
          isRequired={true}
          label="Roll Number"
          placeholder="Roll Number"
        />
        <ExamMonthPicker
          value={lastSchoolData.examMonth}
          error={errors.examMonth}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-between gap-2">
        <FormInput
          value={lastSchoolData.marksObtained}
          error={errors.marksObtained}
          onChange={handleInputChange}
          isRequired={true}
          name="marksObtained"
          label="Marks Obtained (%)"
          placeholder="Marks Obtained"
        />
        <FormSelect
          name="result"
          value={lastSchoolData.result}
          label="Result"
          isRequired={true}
          error={errors.result}
          options={results}
          onChange={handleInputChange}
        />
        <div className="flex-1/2"></div>
        <div className="flex-1/2"></div>
      </div>
    </div>
  );
};
