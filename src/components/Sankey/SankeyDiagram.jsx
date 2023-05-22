import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";
import { nodesEndpoint } from "../../constant";

const SankeyDiagram = ({ data }) => {
  const svgRef = useRef(null);
  const containerRef = useRef();

  useEffect(() => {
    const container = d3.select(containerRef.current);
    // select the SVG element using the Ref
    const svg = d3.select(svgRef.current);

    const width = container.node().getBoundingClientRect().width;
    const height = 400;

    // Clear Svg element
    svg.selectAll("*").remove();

    svg
      .attr("width", width) // set SVG width
      .attr("height", height);

    // define Sankey generator
    const sankeyGenerator = sankey()
      .nodeWidth(15) // width of nodes
      .nodePadding(10) // padding between nodes
      .extent([
        [1, 1],
        [width - 1, height - 1],
      ]); // extent of sankey

    if (data) {
      // initialize Sankey generator using data
      const { nodes, links } = sankeyGenerator(data);

      const defs = svg.append("defs"); // Define a <defs> element for storing the images

      nodes.forEach((node, i) => {
        // Loop through each node
        defs
          .append("pattern") // Append a <pattern> element to the <defs> element
          .attr("id", `node-${i}`) // Set the id of the pattern
          .attr("width", 2) // Set the width of the pattern to 1 unit
          .attr("height", 1) // Set the height of the pattern to 1 unit
          .append("image") // Append an <image> element to the <pattern> element
          .attr("xlink:href", node.image ? nodesEndpoint + node.image : "") // Set the href attribute to the URL of the image
          .attr("width", node.x1 - node.x0) // Set the width of the image
          .attr("height", node.y1 - node.y0); // Set the height of the image
      });

      // Append another group element to SVG element
      const link = svg
        .append("g")
        .selectAll("path") // select all sub-groups
        .data(links) // bind link data
        .join("path") // join link data with groups
        .attr("d", sankeyLinkHorizontal())
        .attr("stroke", (d) => d.color) // link stroke color
        .attr("stroke-width", (d) => d.width) // link width
        .attr("fill", "none") // set fill color for links
        .style("mix-blend-mode", "multiply"); // Set blend mode for links

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
              sankeyGenerator.update(data);
              link
                .filter((link) => link.source === d || link.target === d)
                .attr("d", sankeyLinkHorizontal());
            })
        );

      node
        .append("title") // Append title element to rectangles
        .text((d) => `${d.id}\n${d.value}`); // set text for title element
    }
  }, [data]);

  return (
    <div ref={containerRef} id="sankey-diagram">
      <svg ref={svgRef} />
    </div>
  );
};

export default SankeyDiagram;
