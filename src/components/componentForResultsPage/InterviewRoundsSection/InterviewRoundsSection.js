import React, { useEffect, useRef } from "react";
import { Typography } from "antd";
import * as d3 from "d3";
import "./InterviewRoundsSection.css";
import { useState } from "react";

const { Title } = Typography;

const interviewData = [
  { company: "Joby Aviation", FirstRound: 0, VirtualOnsite: 0, FinalRound: 1 },
  { company: "Salesforce", FirstRound: 0, VirtualOnsite: 0, FinalRound: 1 },
  { company: "Duolingo", FirstRound: 1, VirtualOnsite: 0, FinalRound: 1 },
  { company: "Robinhood", FirstRound: 2, VirtualOnsite: 0, FinalRound: 3 },
  { company: "Bloomberg", FirstRound: 4, VirtualOnsite: 0, FinalRound: 0 },
  {
    company: "Bank of America",
    FirstRound: 1,
    VirtualOnsite: 0,
    FinalRound: 4,
  },
  //   { company: "Rippling", FirstRound: 1, VirtualOnsite: 0, FinalRound: 0 },
  { company: "Microsoft", FirstRound: 0, VirtualOnsite: 0, FinalRound: 4 },
  { company: "Palantir", FirstRound: 5, VirtualOnsite: 1, FinalRound: 1 },
  { company: "Amazon", FirstRound: 0, VirtualOnsite: 0, FinalRound: 1 },
  { company: "Goldman Sachs", FirstRound: 2, VirtualOnsite: 0, FinalRound: 1 },
  { company: "Meta", FirstRound: 1, VirtualOnsite: 0, FinalRound: 6 },
  { company: "Apple", FirstRound: 2, VirtualOnsite: 0, FinalRound: 0 },
  { company: "Google", FirstRound: 2, VirtualOnsite: 0, FinalRound: 0 },
  { company: "TikTok", FirstRound: 2, VirtualOnsite: 0, FinalRound: 0 },
  { company: "Netflix", FirstRound: 1, VirtualOnsite: 2, FinalRound: 0 },
  { company: "Ebay", FirstRound: 0, VirtualOnsite: 2, FinalRound: 0 },
  { company: "Stripe", FirstRound: 1, VirtualOnsite: 1, FinalRound: 1 },
  { company: "Affirm", FirstRound: 2, VirtualOnsite: 0, FinalRound: 2 },
  { company: "Arista Network", FirstRound: 1, VirtualOnsite: 2, FinalRound: 2 },
  { company: "Whatnot", FirstRound: 1, VirtualOnsite: 0, FinalRound: 0 },
  { company: "Hubspot", FirstRound: 3, VirtualOnsite: 0, FinalRound: 2 },
  { company: "Morgan Stanley", FirstRound: 0, VirtualOnsite: 0, FinalRound: 1 },
  { company: "Paypal", FirstRound: 1, VirtualOnsite: 0, FinalRound: 1 },
  { company: "SIG", FirstRound: 3, VirtualOnsite: 0, FinalRound: 0 },
  { company: "Plaid", FirstRound: 2, VirtualOnsite: 0, FinalRound: 2 },
  { company: "Dell", FirstRound: 1, VirtualOnsite: 0, FinalRound: 1 },
  //   { company: "Alcon", FirstRound: 0, VirtualOnsite: 0, FinalRound: 1 },
  { company: "Scale AI", FirstRound: 1, VirtualOnsite: 0, FinalRound: 0 },
  //   { company: "Liberty Mutual", FirstRound: 1, VirtualOnsite: 0, FinalRound: 0 },
  //   { company: "Fannie Mae", FirstRound: 1, VirtualOnsite: 0, FinalRound: 0 },
  //   { company: "Travelers", FirstRound: 1, VirtualOnsite: 0, FinalRound: 0 },
  //   {
  //     company: "Columbus McKinnon",
  //     FirstRound: 1,
  //     VirtualOnsite: 0,
  //     FinalRound: 0,
  //   },
  //   { company: "Lewis & Ellis", FirstRound: 1, VirtualOnsite: 0, FinalRound: 0 },
  //   { company: "The Hanover", FirstRound: 1, VirtualOnsite: 0, FinalRound: 0 },
  //   { company: "Charles Schwab", FirstRound: 1, VirtualOnsite: 0, FinalRound: 0 },
  //   { company: "Bain", FirstRound: 0, VirtualOnsite: 0, FinalRound: 1 },
  { company: "The Trade Desk", FirstRound: 1, VirtualOnsite: 0, FinalRound: 1 },
  //   {
  //     company: "Intelligent Systems",
  //     FirstRound: 1,
  //     VirtualOnsite: 0,
  //     FinalRound: 0,
  //   },
  {
    company: "American Express",
    FirstRound: 0,
    VirtualOnsite: 0,
    FinalRound: 1,
  },
  //   {
  //     company: "Technology Rotational Program",
  //     FirstRound: 1,
  //     VirtualOnsite: 0,
  //     FinalRound: 0,
  //   },
  { company: "Jane Street", FirstRound: 1, VirtualOnsite: 0, FinalRound: 0 },
  //   { company: "Grammarly", FirstRound: 1, VirtualOnsite: 0, FinalRound: 0 },
  //   { company: "Lilly", FirstRound: 0, VirtualOnsite: 0, FinalRound: 1 },
  { company: "Wayfair", FirstRound: 0, VirtualOnsite: 0, FinalRound: 1 },
  { company: "Patreon", FirstRound: 1, VirtualOnsite: 0, FinalRound: 1 },
  //   { company: "Sentry", FirstRound: 1, VirtualOnsite: 0, FinalRound: 0 },
  { company: "Doordash", FirstRound: 1, VirtualOnsite: 0, FinalRound: 1 },
  //   { company: "Roblox", FirstRound: 1, VirtualOnsite: 0, FinalRound: 0 },
  { company: "HRT", FirstRound: 1, VirtualOnsite: 0, FinalRound: 0 },
  //   { company: "Jahnel Group", FirstRound: 0, VirtualOnsite: 0, FinalRound: 1 },
  //   {
  //     company: "Total Wine & More",
  //     FirstRound: 1,
  //     VirtualOnsite: 0,
  //     FinalRound: 0,
  //   },
  //   {
  //     company: "Actualization AI",
  //     FirstRound: 2,
  //     VirtualOnsite: 0,
  //     FinalRound: 0,
  //   },
  { company: "Autodesk", FirstRound: 1, VirtualOnsite: 0, FinalRound: 0 },
];

const InterviewRoundsSection = () => {
  const chartRef = useRef();
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const updateChartDimensions = () => {
      const width = chartRef.current.offsetWidth;
      const height = width * 1.5; // Increase aspect ratio for better readability on mobile

      return { width, height };
    };

    const renderChart = () => {
      const { width, height } = updateChartDimensions();
      const margin = { top: 20, right: 20, bottom: 50, left: 150 };
      const adjustedWidth = width - margin.left - margin.right;
      const adjustedHeight = height - margin.top - margin.bottom;

      d3.select(chartRef.current).select("svg").remove();

      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const y = d3
        .scaleBand()
        .domain(interviewData.map((d) => d.company))
        .range([0, adjustedHeight])
        .padding(0.6); // Adjusted padding for more space between rows on mobile

      const x = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(
            interviewData,
            (d) => d.FirstRound + d.VirtualOnsite + d.FinalRound
          ) + 1,
        ])
        .nice()
        .range([0, adjustedWidth]);

      const color = d3
        .scaleOrdinal()
        .domain(["FirstRound", "VirtualOnsite", "FinalRound"])
        .range(["#4f8edb", "#ff9800", "#4caf50"]);

      const stackedData = d3
        .stack()
        .keys(["FirstRound", "VirtualOnsite", "FinalRound"])(interviewData);

      svg
        .append("g")
        .call(d3.axisLeft(y).tickSize(0))
        .selectAll("text")
        .style("text-anchor", "end")
        .style("font-size", "14px") // Increased font size for readability
        .style("cursor", "pointer")
        .style("fill", "white")
        .on("mouseover", function (event, company) {
          d3.select(this).style("fill", "var(--secondary-color)");
          const companyData = interviewData.find((d) => d.company === company);
          setSelectedCompany(companyData);
        })
        .on("mouseout", function () {
          d3.select(this).style("fill", "white");
          setSelectedCompany(null);
        });

      svg
        .append("g")
        .attr("transform", `translate(0,${adjustedHeight})`)
        .call(d3.axisBottom(x).ticks(Math.min(6, width / 100)))
        .selectAll("text")
        .style("font-size", "12px");

      svg
        .selectAll("g.layer")
        .data(stackedData)
        .join("g")
        .attr("fill", (d) => color(d.key))
        .selectAll("rect")
        .data((d) => d)
        .join("rect")
        .attr("y", (d) => y(d.data.company))
        .attr("x", (d) => x(d[0]))
        .attr("width", (d) => x(d[1]) - x(d[0]))
        .attr("height", y.bandwidth())
        .on("mouseover", function (event, d) {
          d3.select(this).attr("opacity", 0.8);
          setSelectedCompany(d.data);
        })
        .on("mouseout", function () {
          d3.select(this).attr("opacity", 1);
          setSelectedCompany(null);
        });

      const legend = svg
        .selectAll(".legend")
        .data(["FirstRound", "VirtualOnsite", "FinalRound"])
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(0, ${i * 25})`);

      legend
        .append("rect")
        .attr("x", adjustedWidth + 20)
        .attr("y", 10)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", (d) => color(d));

      legend
        .append("text")
        .attr("x", adjustedWidth + 45)
        .attr("y", 19)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text((d) => d)
        .style("font-size", "14px")
        .style("fill", "white");
    };

    renderChart();
    window.addEventListener("resize", renderChart);

    return () => window.removeEventListener("resize", renderChart);
  }, []);

  return (
    <div className="interview-rounds-section">
      <Title level={2} className="section-title">
        Top Interview Progress of our Mentees by Rounds
      </Title>
      <div className="chart-container" ref={chartRef}></div>
      {selectedCompany && (
        <div className="company-details">
          <h3>{selectedCompany.company}</h3>
          <p>
            <strong>First Round:</strong> {selectedCompany.FirstRound}
          </p>
          <p>
            <strong>Virtual Onsite:</strong> {selectedCompany.VirtualOnsite}
          </p>
          <p>
            <strong>Final Round:</strong> {selectedCompany.FinalRound}
          </p>
          <p>
            <strong>Total Interviews:</strong>{" "}
            {selectedCompany.FirstRound +
              selectedCompany.VirtualOnsite +
              selectedCompany.FinalRound}
          </p>
        </div>
      )}
      <p className="note">
        Note: In some cases, there are more final rounds than first rounds as
        some internships directly invite candidates to the final rounds, while
        new grads often start with initial rounds.
      </p>
    </div>
  );
};

export default InterviewRoundsSection;
