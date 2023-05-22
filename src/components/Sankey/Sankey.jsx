import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";
import { useDispatch, useSelector } from "react-redux";
import {
  editData,
  setToggleTrue,
} from "../../redux/sankey_slice";
import { nodesEndpoint } from "../../constant";

const Sankey = () => {
  const svgRef = useRef(null);

  const dispatch = useDispatch();

  const data = useSelector((state) => state.sankeySlice.data);

  const cloned = data && structuredClone(data);

  useEffect(() => {
    const width = 1000; // SVG Ref width
    const height = 1200; // SVG Ref height

    // select the SVG element using the Ref
    const svg = d3
      .select(svgRef.current)
      .attr("width", width) // set SVG width
      .attr("height", height) // set SVG height
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; min-height: intrinsic;");

    svg.selectAll("*").remove();

    // define Sankey generator
    const sankeyGenerator = sankey()
      .nodeWidth(30) // width of nodes
      .nodePadding(20) // padding between nodes
      .extent([
        [1, 5],
        [width - 1, height - 5],
      ]); // extent of sankey

    const linkAndNodeCount = cloned.links.length;
    if (linkAndNodeCount < 10) {
      sankeyGenerator.size([width, height]);
    } else {
      const resolution = Math.max(Math.floor(height / linkAndNodeCount), 10);
      sankeyGenerator.size([width, linkAndNodeCount * resolution]);
    }

    // initialize Sankey generator using data
    if (cloned.nodes && cloned.links.length > 0) {
      const { nodes, links } = sankeyGenerator(cloned);

      const defs = svg.append("defs"); // Define a <defs> element for storing the images

      nodes.forEach((node, i) => {
        // Loop through each node
        defs
          .append("pattern") // Append a <pattern> element to the <defs> element
          .attr("id", `node-${i}`) // Set the id of the pattern
          .attr("width", 1) // Set the width of the pattern to 1 unit
          .attr("height", 1) // Set the height of the pattern to 1 unit
          .append("image") // Append an <image> element to the <pattern> element
          .attr("xlink:href", node.image ? nodesEndpoint + node.image : "") // Set the href attribute to the URL of the image
          .attr("width", node.x1 - node.x0) // Set the width of the image
          .attr("height", node.y1 - node.y0); // Set the height of the image
      });

      // Append another group element to SVG element
      const link = svg
        .selectAll("path") // select all sub-groups
        .data(links) // bind link data
        .join("path") // join link data with groups
        .attr("d", sankeyLinkHorizontal())
        .attr("stroke", (d) => d.color) // link stroke color
        .attr("stroke-width", (d) => Math.max(1, d.width)) // link width
        .attr("fill", "none") // set fill color for links
        .style("mix-blend-mode", "multiply")
        .on("click", (event, d) => {
          const source = d.source.id;
          const target = d.target.id;
          const value = d.value;
          const color = d.color;
          const index = d.index;
          dispatch(editData({ source, target, value, color, index }));
          dispatch(setToggleTrue());
        });

      link
        .append("title") // Append title element to groups
        .text((d) => `${d.source.id} → ${d.target.id}\n${d.value}`); // Set text for title

      // Append a group element into SVG element
      const node = svg
        .append("g")
        .attr("stroke", "#000") // set stroke color for rects
        .selectAll("rect") // select all rects
        .data(nodes) // bind node data to rects
        .join("rect") // join node data with rects
        .attr("x", (d) => d.x0) // set x-coordinate of rect
        .attr("y", (d) => d.y0) // set y-coordinate of rect
        .attr("height", (d) => d.y1 - d.y0) // set rect height
        .attr("width", (d) => d.x1 - d.x0) // set rect width
        .style("fill", (d, i) => `url(#node-${i})`) // Use the <pattern> element as the fill style
        .attr("cursor", "move") // Set cursor
        .call(
          d3
            .drag()
            .subject((d) => d)
            .on("drag", (event, d) => {
              // Change the coordinates on drag
              d.y0 += event.dy;
              d.y1 += event.dy;
              d.x0 += event.dx;
              d.x1 += event.dx;

              // Change node's position
              d3.select(event.subject.sourceEvent.target)
                .attr("y", d.y0)
                .attr("x", d.x0);

              // Update the links
              sankeyGenerator.update(cloned);
              link
                .filter((link) => link.source === d || link.target === d)
                .attr("d", sankeyLinkHorizontal());
            })
        );

      node
        .append("title") // Append title element to rectangles
        .text((d) => `${d.id}\n${d.value}`); // set text for title element
    }
  }, [cloned]);

  return <svg ref={svgRef} style={{ marginTop: "80px" }} />;
};

export default Sankey;
