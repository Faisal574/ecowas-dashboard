import FileUploader from "../components/data-loader/FileUploader";
import DiagramCanvas from "../components/data-loader/DiagramCanvas";
import SelectCountrySankey from "../components/Sankey/SelectCountrySankey";
import { useParams } from "react-router-dom";

const CreateSankey = () => {
  const {country} = useParams()
  return (
    <div className="flex-1 space-y-6 bg-gray-100 pt-8">
      {/* <FileUploader /> */}

      {/* Select Country */}
      {/* <SelectCountrySankey /> */}
      {/* Sankey Canvas */}
      <DiagramCanvas country={country} />
    </div>
  );
};

export default CreateSankey;
