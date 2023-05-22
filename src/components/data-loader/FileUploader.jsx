import { useState } from "react";
import { FaTable, FaUpload } from "react-icons/fa";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  return (
    <section className="space-y-10 p-4 pt-0">
      <h2 className="text-2xl font-bold">1. Load Your Data</h2>
      <div className="flex items-start gap-4">
        <div className="p-6">
          <div className="flex items-center gap-6 flex-col">
            <button className="flex items-center py-2 px-5 text-darkGreen bg-lightGreen border-2 border-darkGreen font-semibold rounded-md gap-2 capitalize">
              <FaUpload />
              <span>Upload your data</span>
            </button>
            <button className="flex items-center gap-2 text-lightGray font-semibold py-2 px-5 capitalize">
              <FaTable />
              <span>Table View</span>
            </button>
          </div>
        </div>
        {/* File Upload Input */}
        <div className="flex items-center justify-center flex-1">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="font-semibold">Drag file here or </span>
                <span className="flex items-center py-1 px-3 text-white bg-darkGreen border-2 border-darkGreen font-semibold gap-2 capitalize">
                  Browse
                </span>
                <span className="font-semibold">from your computer</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                * You can load only .xls or .xlxs data.
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
      </div>
    </section>
  );
};

export default FileUploader;
