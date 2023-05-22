import { FaTimes } from "react-icons/fa";
import Modal from "../UI/Modal";
import NodeModalTabs from "./NodeModalTabs";
import { useDispatch } from "react-redux";
import { setToggleFalse } from "../../redux/sankey_slice";

const NodeModel = () => {
  const dispatch = useDispatch();
  const toggleHandler = () => {
    dispatch(setToggleFalse());
  }
  return (
    <div className="modal-box rounded-none p-0 absolute top-2 left-20">
      {/* Header */}
      <header className="p-3 bg-darkGreen text-white flex items-center justify-between">
        <p>Node</p>
        <button
          className="border-none focus-within:outline-none"
          onClick={toggleHandler}
        >
          <FaTimes />
        </button>
      </header>
      {/* Modal Tabs */}
      <NodeModalTabs />
    </div>
  );
};

export default NodeModel;
