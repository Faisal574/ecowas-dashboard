import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../constant";

const initialState = {
  data: {
    nodes: [],
    links: [],
  },
  allNodes: [],
  toggle: false,
  editLinks: null,
};

export const fetchNodes = createAsyncThunk(`data/retrieve`, async () => {
  try {
    const response = await axios.get(baseUrl + "getnodes");
    return response.data;
  } catch (error) {
    // Handle Error
    console.log(error);
  }
});

export const SankeySlice = createSlice({
  name: "sankeySlice",
  initialState: initialState,
  reducers: {
    addLinks: (state, action) => {
      const allNodes = state.allNodes;
      
      const {index,...createdLink} = action.payload; // get link
      createdLink.sourceId = action.payload.source;
      createdLink.targetId = action.payload.target;
      state.data.nodes.forEach((node, i) => {
        if (node.id === allNodes[action.payload.source]?.id) {
          createdLink.source = i;
        }

        if (node.id === allNodes[action.payload.target]?.id) {
          createdLink.target = i;
        }
      });

      const findLink = state.data.links.findIndex(
        (item, index) => index === action.payload.index
      );

      !state.editLinks
        ? state.data.links.push(createdLink)
        :state.data.links.splice(findLink, 1, createdLink);

      state.editLinks = null;
    },
    addNewNode: (state, action) => {
      state.allNodes.push(action.payload);
    },
    editNode: (state, action) => {
      let find = state.data.nodes.findIndex(
        (item) => item.id === action.payload.id
      );
      state.allNodes.splice(find, 1, action.payload);
      state.editNode = action.payload;
    },
    addNode: (state, action) => {
      const { source, target } = action.payload;

      const existingSourceNode = state.allNodes[Number(source)];
      const existingTargetNode = state.allNodes[Number(target)];

      const isSourceExist = state.data.nodes.some(
        (item) => item.id === existingSourceNode.id
      );
      const isTargetExist = state.data.nodes.some(
        (item) => item.id === existingTargetNode.id
      );

      if (state.data.nodes.length === 0) {
        state.data.nodes.push(existingSourceNode, existingTargetNode);
      } else if (!isSourceExist && !isTargetExist) {
        // Both nodes are new
        state.data.nodes.push(existingSourceNode, existingTargetNode);
      } else if (!isSourceExist) {
        // Source node is new
        state.data.nodes.push(existingSourceNode);
      } else if (!isTargetExist) {
        // Target node is new
        state.data.nodes.push(existingTargetNode);
      }
    },
    emptyData: (state) => {
      state.data.links = [];
      state.data.nodes = [];
    },
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
    setToggleTrue: (state) => {
      state.toggle = true;
    },
    setToggleFalse: (state) => {
      state.toggle = false;
      state.editLinks = null;
    },
    editData: (state, action) => {
      state.editLinks = action.payload;
    },

    addCountryYearData: (state, action) => {
      const { nodes, links } = action.payload;
      state.data = { nodes, links };
    },

    // TODO: For Testing
    viewSankey: (state, action) => {
      state.data = action.payload;
    },
    linkDelete:(state,action)=>{
      const findIndex = state.data.links.findIndex((item,index)=>index === action.payload);
      state.data.links.splice(findIndex,1);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNodes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNodes.fulfilled, (state, action) => {
        state.loading = false;
        state.allNodes = action.payload;
      })
      .addCase(fetchNodes.rejected, (state, action) => {
        state.loading = false;
        state.data.nodes = [];
        state.error = action.error.message;
      });
  },
});

export const {
  addNewNode,
  editNode,
  addLinks,
  emptyData,
  setToggleTrue,
  setToggleFalse,
  setToggle,
  addNode,
  editData,
  addCountryYearData,
  viewSankey,
  linkDelete
} = SankeySlice.actions;

export default SankeySlice.reducer;
