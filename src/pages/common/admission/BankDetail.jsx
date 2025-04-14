import { FormInput } from "../../../components/ui/FormInput";

export const BankDetail = ({ bankData, setBankData, errors }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setBankData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex justify-between gap-2">
        <FormInput
          isRequired={true}
          value={bankData.bankName}
          error={errors.bankName}
          onChange={handleInputChange}
          name="bankName"
          label="Bank Name"
          placeholder="Bank Name"
        />
        <FormInput
          isRequired={true}
          value={bankData.branchName}
          error={errors.branchName}
          onChange={handleInputChange}
          name="branchName"
          label="Bank Branch"
          placeholder="Bank Branch"
        />
        <FormInput
          isRequired={true}
          value={bankData.accountNo}
          error={errors.accountNo}
          onChange={handleInputChange}
          name="accountNo"
          label="Account Number"
          placeholder="Account Number"
        />
        <FormInput
          isRequired={true}
          value={bankData.ifscCode}
          error={errors.ifscCode}
          onChange={handleInputChange}
          name="ifscCode"
          label="IFSC Code"
          placeholder="IFSC Code"
        />
      </div>
    </div>
  );
};
