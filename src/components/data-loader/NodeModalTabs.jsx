import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewNode,
  editNode,
  addLinks,
  addNode,
  setToggleFalse,
  linkDelete,
} from "../../redux/sankey_slice";

const NodeModalTabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const [error, setError] = useState("");

  const [errorStatus, setErrorStatus] = useState(false);

  const nodes = useSelector((state) => state.sankeySlice.allNodes);

  const links = useSelector((state) => state.sankeySlice.data);

  const [links1, setLinks1] = useState([]);

  const editLink = useSelector((state) => state.sankeySlice.editLinks);

  const [nodeOption, setNodeOption] = useState({
    source: "",
    target: "",
  });

  const [editNodeData, setEditNodeData] = useState({
    id: "",
    image: "path",
  });

  const [nodeData, setNodeData] = useState({
    id: "",
    image: "path",
  });

  const [targetData, setTargetData] = useState({
    source: "Please Select Node",
    target: "Please Select Node",
    color: "#cccccc",
    value: "",
  });

  useEffect(() => {
    setLinks1(links.links);
  }, [links]);

  useEffect(() => {
    if (editLink) {
      const sourceIndex = nodes.findIndex(
        (node) => node.id === editLink.source
      );
      const targetIndex = nodes.findIndex(
        (node) => node.id === editLink.target
      );
      setTargetData({
        ...editLink,
        source: sourceIndex !== -1 ? sourceIndex : "",
        target: targetIndex !== -1 ? targetIndex : "",
      });
    } else {
      setTargetData({
        source: "Please Select Node",
        target: "Please Select Node",
        color: "#cccccc",
        value: "",
      });
    }
  }, [editLink, setTargetData]);

  //const [values,setValues] = useState({value:null})

  const dispatch = useDispatch();

  const addValueRow = () => {
    //setValues([...values,{value:""}]);
  };

  const handleEditNodeData = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditNodeData((prev) => ({ ...prev, [name]: files[0].name }));
    } else {
      setEditNodeData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTargetData = (e) => {
    const { name, value } = e.target;
    if (name === "color") {
      setTargetData((prev) => ({ ...prev, [name]: value }));
    } else {
      setTargetData((prev) => ({ ...prev, [name]: Number(value) }));
    }

    if (name === "source" || name === "target") {
      setNodeOption((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });

    }
  };

  const handleNodeData = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNodeData((prev) => ({ ...prev, [name]: files[0].name }));
    } else {
      setNodeData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // const handleValueData = (index, event) => {
  //const { name, value } = e.target;
  // let data = [...values];
  // data[index][event.target.name] = parseInt(event.target.value);
  //setValues((prev) => ({ ...prev, [name]: parseInt(value) }));
  // };

  const addNodeData = async () => {
    dispatch(addNewNode(nodeData));
    setNodeData({
      id: "",
      image: "",
    });
  };

  const editNodeDatas = () => {
    dispatch(editNode(editNodeData));
    setEditNodeData({
      id: "",
      image: "",
    });
  };

  const isCircularLink = (source, target, links) => {
    // Create an adjacency list representation of the graph
    const adjList = {};
    for (const link of links) {
      if (!adjList[link.sourceId]) {
        adjList[link.sourceId] = [];
      }
      adjList[link.sourceId].push(link.targetId);
    }

    // Perform a depth-first search from the target node
    const visited = new Set();
    const stack = [target];
    while (stack.length > 0) {
      const node = stack.pop();
      if (visited.has(node)) {
        continue;
      }
      visited.add(node);
      if (node === source) {
        return true;
      }
      if (adjList[node]) {
        for (const neighbor of adjList[node]) {
          stack.push(neighbor);
        }
      }
    }

    return false;
  };

  const addLinkData = () => {
    //const valueData = values.map((obj) => ({ value: obj.value }));
    //const targetWithValue = {...targetData,...values};
    if (
      typeof targetData.source !== "number" ||
      typeof targetData.target !== "number"
    ) {
      setError("Please select a source and target node");
      setErrorStatus(true);
      return;
    }

    if (targetData.source === targetData.target) {
      setError("Source and target should be different for sankey");
      setErrorStatus(true);
      return;
    }

    if (targetData.value === "") {
      setError("Please select value");
      setErrorStatus(true);
      return;
    }

    if (targetData.target === 0) {
      setError("The link between them creates a loop in the sankey.");
      setErrorStatus(true);
      return;
    }

    const isDuplicateLink = links1.some(
      (link) =>
        link.sourceId === targetData.source && link.targetId === targetData.target
    );

    if (!editLink) {
      if (isDuplicateLink) {
        setError("The link is already generated.");
        setErrorStatus(true);
        return;
      }
      if (isCircularLink(targetData.source, targetData.target, links1)) {
        setError("The link creates a circular reference.");
        setErrorStatus(true);
        return;
      }
    }

    dispatch(addNode(nodeOption));

    dispatch(addLinks(targetData));

    setTargetData({
      source: "Please Select Node",
      target: "Please Select Node",
      color: "#cccccc",
      value: "",
    });

    dispatch(setToggleFalse());
  };

  const deleteLink = (e) => {
    dispatch(linkDelete(targetData.index));
  };

  const toggleTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="flex items-start gap-2 py-4 px-2">
      {/* Tabs */}
      <Tabs activeTab={activeTab} toggleTab={toggleTab} />

      {/* Tabs Contents */}
      {activeTab === 1 && (
        <div className="flex-1 space-y-4">
          {/* Source Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="sourceName"
              className="text-black font-semibold text-sm"
            >
              Source
            </label>
            <select
              name="id"
              id="sourceName"
              onChange={handleEditNodeData}
              value={editNodeData.id}
              className="p-2 border border-gray-300"
            >
              <option value="-1" disabled>
                Please Select Nodes
              </option>
              {nodes?.map((node, i) => (
                <option value={node.id} key={node.id}>
                  {node.id}
                </option>
              ))}
            </select>
          </div>
          {/* Source Name */}
          <UploadImage
            label="Image"
            name="image"
            onChange={handleEditNodeData}
          />
          {/* Btn */}
          <Button onClick={editNodeDatas}>Update</Button>
        </div>
      )}
      {activeTab === 2 && (
        <div className="flex-1 space-y-4">
          {/* Source Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="sourceName"
              className="text-black font-semibold text-sm"
            >
              Source
            </label>
            <select
              name="source"
              id="sourceName"
              onChange={handleTargetData}
              value={targetData.source}
              className="p-2 border border-gray-300"
            >
              <option value="Please Select Node" disabled>
                Please Select Nodes
              </option>
              {nodes?.map((node, i) => (
                <option value={i} key={node.id}>
                  {node.id}
                </option>
              ))}
            </select>
          </div>
          {/* Source Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="sourceName"
              className="text-black font-semibold text-sm"
            >
              Target
            </label>
            <select
              name="target"
              id="sourceName"
              value={targetData.target}
              onChange={handleTargetData}
              className="p-2 border border-gray-300"
            >
              <option value="Please Select Node" disabled>
                Please Select Nodes
              </option>
              {nodes?.map((node, i) => (
                <option value={i} key={node.id}>
                  {node.id}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="sourceName"
              className="text-black font-semibold text-sm"
            >
              Color
            </label>
            <div className="flex border-gray-200 p-2">
              <input
                type="color"
                name="color"
                value={targetData.color}
                className=""
                onChange={handleTargetData}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="sourceName"
              className="text-black font-semibold text-sm"
            >
              Value
            </label>
            <div className="w-full space-y-2">
              {/* {values.map((item,index)=>( */}
              <input
                type="number"
                name="value"
                value={targetData.value}
                onChange={handleTargetData}
                className="p-2 focus-within:outline-none border border-gray-200 w-full"
                placeholder="e.g 1000"
              />
              {/* ))} */}
              <button
                onClick={addValueRow}
                className="text-darkGreen capitalize font-semibold flex items-center gap-1"
              >
                <FaPlus />
                <span>Add Value</span>
              </button>
            </div>
          </div>
          {/* Source Image */}
          {/* <UploadImage label="Destination Image" /> */}
          {/* Btn */}
          <Button onClick={addLinkData}>Update</Button>
          {errorStatus && (
            <p style={{ color: "#FF4455", fontSize: "16px" }}>{error}</p>
          )}
        </div>
      )}
      {activeTab === 3 && (
        <div className="flex-1 space-y-4">
          {/* Select Node */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="sourceName"
              className="text-black font-semibold text-sm"
            >
              Node
            </label>
            <input
              type="text"
              name="id"
              value={nodeData.id}
              onChange={handleNodeData}
              className="p-2 focus-within:outline-none border border-gray-200 w-full"
              placeholder="e.g 1000"
            />
          </div>
          <UploadImage label="Image" name="image" onChange={handleNodeData} />
          <Button onClick={addNodeData}>Add Node</Button>
        </div>
      )}
      {activeTab === 4 && (
        <div className="flex-1 space-y-4">
          <p>Remove this item and the links to it?</p>
          <button
            onClick={deleteLink}
            className="py-2 px-8 text-white bg-red-600 font-semibold rounded-sm capitalize w-full"
          >
            Confirm Delete
          </button>
        </div>
      )}
    </div>
  );
};

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <div className="w-40 space-y-3">
      <button
        className={`p-2 w-full font-semibold text-sm text-left ${
          activeTab === 1 && "bg-lightGreen text-darkGreen"
        }`}
        onClick={() => toggleTab(1)}
      >
        Edit Node
      </button>
      <button
        className={`p-2 w-full font-semibold text-sm text-left ${
          activeTab === 2 && "bg-lightGreen text-darkGreen"
        }`}
        onClick={() => toggleTab(2)}
      >
        Add Connection
      </button>
      <button
        className={`p-2 w-full font-semibold text-sm text-left ${
          activeTab === 3 && "bg-lightGreen text-darkGreen"
        }`}
        onClick={() => toggleTab(3)}
      >
        Add Node
      </button>
      <button
        className={`p-2 w-full font-semibold text-sm text-left ${
          activeTab === 4 && "bg-lightGreen text-darkGreen"
        }`}
        onClick={() => toggleTab(4)}
      >
        Delete Node
      </button>
    </div>
  );
};

const UploadImage = ({ label, name, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="sourceName" className="text-black font-semibold text-sm">
        {label}
      </label>
      <input
        type="file"
        name={name}
        onChange={onChange}
        className="file-input w-full max-w-xs focus-within:outline-none border border-gray-200"
      />
    </div>
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="py-2 px-8 text-white bg-darkGreen font-semibold rounded-sm capitalize w-full"
    >
      {children}
    </button>
  );
};

export default NodeModalTabs;
