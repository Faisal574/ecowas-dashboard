import { FaEye } from "react-icons/fa";

const MembersSankey = () => {
  return (
    <div className="flex-1 space-y-10 bg-gray-100 pt-8 self-stretch p-4">
      <div className="overflow-x-auto">
        <table className="table table-compact w-full p-2">
          <thead>
            <tr>
              <th>Sanke Name</th>
              <th>Country</th>
              <th>Year</th>
              <th>Created by</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="space-y-3">
            <tr>
              <td>Emission Sankey 1</td>
              <td>Benin</td>
              <td>2017</td>
              <td>Animashanu Adeeko</td>
              <td className="space-x-4">
                <button className="text-semibold text-blue-400">
                  <FaEye className="inline-block mr-2" />
                  <span>View</span>
                </button>
                <button className="text-semibold text-blue-400">Publish</button>
              </td>
            </tr>
            <tr>
              <td>Emission Sankey 2</td>
              <td>Benin</td>
              <td>2018</td>
              <td>John Tunde</td>
              <td className="space-x-4">
                <button className="text-semibold text-blue-400">
                  <FaEye className="inline-block mr-2" />
                  <span>View</span>
                </button>
                <button className="text-semibold text-blue-400">Publish</button>
              </td>
            </tr>
            <tr>
              <td>Emission Sankey 3</td>
              <td>Benin</td>
              <td>2019</td>
              <td>Micheal Ozor </td>
              <td className="space-x-4">
                <button className="text-semibold text-blue-400">
                  <FaEye className="inline-block mr-2" />
                  <span>View</span>
                </button>
                <button className="text-semibold text-blue-400">Publish</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersSankey;
