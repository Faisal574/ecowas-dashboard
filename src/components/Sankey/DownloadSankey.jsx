import React from "react";
import { FaDownload } from "react-icons/fa";

const DownloadSankey = () => {
  // handle download svg
  const handleDownloadSvg = () => {
    // Get the SVG element from the DOM
    const svgElement = document.getElementById("sankey-diagram");

    if (svgElement) {
      // Create a Blob object from the SVG content
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });

      // Initiate the download action
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "sankey-diagram.svg";
      link.click();
    }
  };

  return (
    <div className="self-end">
      <button
        className="flex items-center gap-2 border-2 border-green-600 bg-[#EAF9EE] px-4 py-2 rounded-md text-green-700"
        onClick={handleDownloadSvg}
      >
        <FaDownload />
        <span className="">Download Sankey</span>
      </button>
    </div>
  );
};

export default DownloadSankey;
