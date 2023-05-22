import { FaTimes, FaPen, FaTimesCircle } from "react-icons/fa";
import DownloadSankey from "../Sankey/DownloadSankey";
import SankeyDiagram from "../Sankey/SankeyDiagram";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";

// Component for the Sankey row with the "View" button
const ViewSankeyModal = ({ handleClose }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.sankeySlice);
  const cloned = structuredClone(data);

  // const handleViewEditor = () => {
  //   navigate("/");
  // };

  return (
    <Modal>
      {/* Saved Sankey Top*/}
      <div className="bg-white w-[60rem] mx-auto rounded-lg">
        <div className="border-b border-gray-200 flex items-center justify-between py-4 px-6">
          <h2 className="font-semibold">Saved Sankey</h2>
          <button className="text-lg text-gray-500" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
        {/* Sankey */}
        <div className="p-4 overflow-y-auto">
          <SankeyDiagram data={cloned} />
        </div>
        {/* Saved sankey Bottom */}
        <div className="border-t border-gray-200 flex items-center justify-between py-4 px-6">
          <button
            className="py-2 px-5 border border-gray-200 flex items-center gap-2"
            onClick={handleClose}
          >
            <FaTimesCircle />
            Close
          </button>
          <div className="flex items-center gap-4">
            <Link
              to={`/${params.country}`}
              className="flex items-center gap-2 bg-green-600 px-4 py-2 text-white rounded-md"
              // onClick={handleViewEditor}
            >
              <FaPen />
              View in Editor
            </Link>
            <DownloadSankey />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewSankeyModal;
