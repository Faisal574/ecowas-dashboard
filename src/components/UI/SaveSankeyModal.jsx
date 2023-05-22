import Modal from "./Modal";

const SaveSankeyModal = ({
  setSavedModal,
  handleSankeyInfo,
  sankeyInfo,
  handleSaveSankey,
}) => {
  const { country, sankey_name, year } = sankeyInfo;

  const handleClose = () => setSavedModal(false);

  return (
    <Modal>
      <form
        className="w-[25rem] border border-red-500 bg-white mx-auto rounded-lg p-6 space-y-5"
        onSubmit={handleSaveSankey}
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="sankey_name"
            className="text-black font-semibold text-sm"
          >
            <span className="text-red-500">*</span> Sankey Name
          </label>
          <input
            type="text"
            name="sankey_name"
            value={sankey_name}
            onChange={handleSankeyInfo}
            className="p-2 border border-gray-300"
            placeholder="sankey name"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <label
              htmlFor="countryName"
              className="text-black font-semibold text-sm"
            >
              <span className="text-red-500">*</span> Country
            </label>
            <input
              type="text"
              name="countryName"
              className="p-2 border border-gray-300"
              value={country}
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="year" className="text-black font-semibold text-sm">
              <span className="text-red-500">*</span> Year
            </label>
            <input
              type="text"
              name="year"
              className="p-2 border border-gray-300 w-full"
              value={year}
              onChange={handleSankeyInfo}
            />
          </div>
        </div>
        <div className="flex justify-end items-center gap-4">
          <button
            className="py-1 font-semibold px-6 border border-gray-300"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className="py-1 px-6 text-white bg-darkGreen border-2 border-darkGreen font-semibold capitalize">
            Save Sankey
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SaveSankeyModal;
