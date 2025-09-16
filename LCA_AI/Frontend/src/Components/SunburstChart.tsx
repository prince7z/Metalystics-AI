import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SunburstNode {
  name: string;
  value?: number;
  children?: SunburstNode[];
  _id?: string;
}

interface SunburstChartProps {
  data: SunburstNode;
  width?: number;
  height?: number;
}

const SunburstChart: React.FC<SunburstChartProps> = ({ 
  data, 
  width = 400, 
  height = 400 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    const radius = Math.min(width, height) / 2;
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Color scale
    const color = d3.scaleOrdinal<string>()
      .domain(['Air Pollution', 'Water Pollution', 'Soil Pollution'])
      .range(['#ff6b6b', '#4ecdc4', '#45b7d1']);

    // Create hierarchy
    const root = d3.hierarchy<SunburstNode>(data)
      .sum((d: SunburstNode) => d.value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    // Create partition layout
    const partition = d3.partition<SunburstNode>()
      .size([2 * Math.PI, radius]);

    partition(root);

    // Create arc generator
    const arc = d3.arc<any>()
      .startAngle((d: any) => d.x0)
      .endAngle((d: any) => d.x1)
      .innerRadius((d: any) => d.y0)
      .outerRadius((d: any) => d.y1);

    // Create tooltip
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("font-size", "12px")
      .style("z-index", "1000");

    // Draw arcs
    const paths = g.selectAll("path")
      .data(root.descendants())
      .enter().append("path")
      .attr("d", arc as any)
      .style("fill", (d: any) => {
        if (d.depth === 0) return "#fff"; // Center
        if (d.depth === 1) return color(d.data.name) as string; // Categories
        return d3.color(color(d.parent?.data.name) as string)?.darker(0.5)?.toString() || "#ccc"; // Sub-categories
      })
      .style("stroke", "#fff")
      .style("stroke-width", 2)
      .style("cursor", "pointer");

    // Add interactivity
    paths
      .on("mouseover", function(event, d: any) {
        d3.select(this).style("opacity", 0.8);
        
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        
        const tooltipText = d.depth === 0 
          ? "Pollution Distribution" 
          : `${d.data.name}: ${d.value || 0}`;
        
        tooltip.html(tooltipText)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function() {
        d3.select(this).style("opacity", 1);
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

    // Add labels for main categories
    g.selectAll("text")
      .data(root.descendants().filter(d => d.depth === 1))
      .enter().append("text")
      .attr("transform", function(d: any) {
        const angle = (d.x0 + d.x1) / 2;
        const radius = (d.y0 + d.y1) / 2;
        return `rotate(${angle * 180 / Math.PI - 90}) translate(${radius},0) rotate(${angle > Math.PI ? 180 : 0})`;
      })
      .attr("dy", "0.35em")
      .attr("text-anchor", function(d: any) {
        const angle = (d.x0 + d.x1) / 2;
        return angle > Math.PI ? "end" : "start";
      })
      .text((d: any) => d.data.name)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#333");

    // Cleanup function
    return () => {
      tooltip.remove();
    };
  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default SunburstChart;
