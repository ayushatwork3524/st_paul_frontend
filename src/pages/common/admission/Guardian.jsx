import { FormInput } from "../../../components/ui/FormInput";

export const Guardian = ({ guardianInfo, setGuardianInfo, errors }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setGuardianInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex justify-between gap-2">
        <FormInput
          value={guardianInfo.name}
          isRequired={true}
          error={errors.name}
          onChange={handleInputChange}
          name="name"
          label="Guardian Name"
          placeholder="Guardian Name"
        />
        <FormInput
          value={guardianInfo.relation}
          error={errors.relation}
          onChange={handleInputChange}
          isRequired={true}
          name="relation"
          label="Guardian Relation"
          placeholder="Guardian Relation"
        />
        <FormInput
          value={guardianInfo.phone}
          error={errors.phone}
          onChange={handleInputChange}
          name="phone"
          isRequired={true}
          label="Guardian Mobile Number"
          placeholder="Guardian Mobile Number"
        />
      </div>
      <div className="flex justify-between gap-2">
        <FormInput
          value={guardianInfo.occupation}
          error={errors.occupation}
          onChange={handleInputChange}
          isRequired={true}
          name="occupation"
          label="Guardian Occupation"
          placeholder="Guardian Occupation"
        />
        <FormInput
          value={guardianInfo.income}
          error={errors.income}
          onChange={handleInputChange}
          isRequired={true}
          name="income"
          label="Guardian Income"
          placeholder="Guardian Income"
        />
        <div className="flex-1/2"></div>
        <div className="flex-1/2"></div>
      </div>
    </div>
  );
};
