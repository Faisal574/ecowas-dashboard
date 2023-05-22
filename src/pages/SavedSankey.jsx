import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteSankeyById, getSavedSankeys } from "../redux/savedSankeySlice";
import {
  RouletteSpinnerOverlay,
  DartsSpinnerOverlay,
  CircleSpinnerOverlay,
} from "react-spinner-overlay";
import { viewSankey } from "../redux/sankey_slice";
import ViewSankeyModal from "../components/UI/ViewSankeyModal";
import { formatDateAndTime } from "../utils/utils";

const SavedSankey = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  // Saved Sankeys State
  const { isLoading, savedSankeys } = useSelector(
    (state) => state.savedSankeys
  );

  useEffect(() => {
    dispatch(getSavedSankeys());
    console.log("rendered");
  }, [dispatch]);

  // View Sankey Modal
  const handleViewSankey = (sankeyData) => {
    // check if sankey data available
    if (Array.isArray(sankeyData) || sankeyData === null) {
      alert("No Sankey Available!");
      return;
    }

    // Show sankey
    dispatch(viewSankey(sankeyData));
    setShowModal(true);
  };

  // Handle delete sankey
  const handleDeleteSankey = (sankeyId) => {
    dispatch(deleteSankeyById(sankeyId));
  };

  // Close View Sankey Modal
  const handleClose = () => setShowModal(false);

  // Loading
  if (isLoading) {
    return <CircleSpinnerOverlay />;
  }

  // check if there's no Sankeys
  if (savedSankeys.length === 0) {
    return (
      <section className="flex-1 space-y-10 bg-gray-100 pt-8 self-stretch p-4">
        <h2 className="text-2xl">No Saved Sankeys Available</h2>
      </section>
    );
  }

  return (
    <>
      <section className="flex-1 space-y-10 bg-gray-100 pt-8 self-stretch p-4">
        <div className="overflow-x-auto">
          <table className="table table-compact w-full p-2">
            <thead>
              <tr>
                <th>Sanke Name</th>
                <th>Country</th>
                <th>Year</th>
                <th>Created by</th>
                <th>Time & Dates</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="space-y-3">
              {savedSankeys.length > 0 &&
                savedSankeys.map((sankey, i) => (
                  <tr key={i}>
                    <td>{`${
                      sankey.sankey_name ? sankey.sankey_name : "Unknown"
                    } ${sankey?.sankey_id}`}</td>
                    <td>{sankey.country}</td>
                    <td>{sankey.year}</td>
                    <td>{sankey.created_by ? sankey.created_by : "Unknown"}</td>
                    <td>
                      {sankey.date_time
                        ? formatDateAndTime(sankey?.date_time)
                        : "Unknown"}
                    </td>
                    <td className="space-x-4">
                      <button
                        className="text-semibold text-blue-500"
                        onClick={() => handleViewSankey(sankey.data)}
                      >
                        View
                      </button>
                      <button
                        className="text-semibold text-red-500"
                        onClick={() => handleDeleteSankey(sankey?.sankey_id)}
                      >
                        Delete
                      </button>

                      <button className="text-semibold text-green-500">
                        Ready
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
      {showModal && <ViewSankeyModal handleClose={handleClose} />}
    </>
  );
};

export default SavedSankey;
