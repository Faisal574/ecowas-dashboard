import { useEffect, useState } from "react";
import { FaPlusSquare, FaSave } from "react-icons/fa";
import { emptyData, fetchNodes, setToggleTrue } from "../../redux/sankey_slice";

// Model
import NodeModel from "./NodeModel";
import Sankey from "../Sankey/Sankey";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../utils/fetchFunctions";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import SaveSankeyModal from "../UI/SaveSankeyModal";

const DiagramCanvas = ({ country }) => {
  const dispatch = useDispatch();

  // TODO: Testing => sankey info
  const [sankeyInfo, setSankeyInfo] = useState({
    country: country ? country : "NA",
    sankey_name: "",
    year: "",
  });

  const [loading, setLoading] = useState(false);
  const [saveModal, setSavedModal] = useState(false);

  // Sankey Data
  const { data, toggle } = useSelector((state) => state.sankeySlice);

  // NodeModal's state Handler
  const toggleHandler = () => {
    dispatch(setToggleTrue());
  };

  // Handle Save Sankey Info
  const handleSankeyInfo = (e) => {
    setSankeyInfo((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  // Open Save Sankey Modal
  const handleModalOpen = () => {
    setSavedModal(true);
  };

  // Sankey Info
  const sankey = {
    ...sankeyInfo,
    created_by: "waleed",
    data,
  };

  const handleSaveSankey = (e) => {
    e.preventDefault();
    // Check if sankey name or year is empty
    if (sankey.country === "" || sankey.year === "") {
      console.log("please fill all input");
      return;
    }

    // Save Sankey
    setLoading(true);
    fetchServices.saveSankey(sankey).then(() => {
      toast("Sankey Saved Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(emptyData());
      setLoading(false);
      setSavedModal(false);
    });
  };

  useEffect(() => {
    dispatch(fetchNodes());
  }, [dispatch]);

  return (
    <section className="space-y-10 p-4">
      <h2 className="text-2xl font-bold">Sankey Diagram</h2>
      <div className="space-y-2 bg-white p-4">
        <div className="flex items-center justify-between pb-1 border-b border-gray-200">
          <p className="text-neutral-700 font-semibold">Graph View</p>
          <button
            onClick={handleModalOpen}
            disabled={data.nodes.length === 0 && data.links.length === 0}
            className="flex items-center py-2 px-5 text-white bg-darkGreen border-2 border-darkGreen font-semibold gap-2 capitalize"
          >
            <FaSave />
            <span>Save Sankey</span>
          </button>
        </div>
        {/* Canvas */}
        <div className="min-h-[600px] relative">
          {/* Node Modal Btn */}
          <button
            className="capitalize flex items-center gap-2 text-darkGreen font-semibold"
            onClick={toggleHandler}
          >
            <FaPlusSquare />
            <span>add node</span>
          </button>
          {loading && <RingSpinnerOverlay color="#2f9e44" size={70} />}
          <ToastContainer />
          <Sankey />

          {/* Node Modal */}
          {toggle && <NodeModel />}

          {/* Save Sankey Modal */}
          {saveModal && (
            <SaveSankeyModal
              setSavedModal={setSavedModal}
              sankeyInfo={sankeyInfo}
              handleSankeyInfo={handleSankeyInfo}
              handleSaveSankey={handleSaveSankey}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default DiagramCanvas;
