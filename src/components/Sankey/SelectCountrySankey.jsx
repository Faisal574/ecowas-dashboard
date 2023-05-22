import { FaStar } from "react-icons/fa";

const SelectCountrySankey = () => {
  return (
    <section className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">Select Country & Year</h2>
      <div className="flex items-center gap-8">
        <div className="space-y-2">
          <label htmlFor="country" className="flex items-center font-semibold">
            <span className="text-red-500">*</span> Country
          </label>
          <select
            name="country"
            id="country"
            className="py-2 px-3 w-[10rem] border border-gray-200"
          >
            <option value="Select Country">Select Country</option>
            <option value="1">Benin</option>
            <option value="1">Benin</option>
            <option value="1">Benin</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="year" className="flex items-center font-semibold">
            <span className="text-red-500">*</span> Year
          </label>
          <select
            name="year"
            id="year"
            className="py-2 px-3 w-[10rem] border border-gray-200"
          >
            <option value="Select Year">Select Year</option>
            <option value="1">Benin</option>
            <option value="1">Benin</option>
            <option value="1">Benin</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default SelectCountrySankey;
