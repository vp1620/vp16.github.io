const data = [
                {state: "California", avgCost: 17836.71053}, 
                {state: "Texas", avgCost: 13607.29907}, 
                {state: "New York", avgCost: 17850.7069}, 
                {state: "Florida", avgCost: 15075.63008}, 
                {state: "Illinois", avgCost: 26715.70796}];
  
  
  const width = 1500;
  const height = 700;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };
  const title = "Average Cost from Each State";
  const yaxisname = "Average income for the owner of the car";
  
  const svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);
  
  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)
  
  const y = d3.scaleLinear()
    .domain([0, 30000])
    .range([height - margin.bottom, margin.top])
  
  svg.append("g")
    .attr("fill", 'royalblue')
    .selectAll("rect")
    .data(data.sort((a, b) => d3.descending(a.avgCost, b.avgCost)))
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.avgCost))
      .attr('title', (d) => d.avgCost)
      .attr("class", "rect")
      .attr("height", d => y(0) - y(d.avgCost))
      .attr("width", x.bandwidth())
  
  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '20px')
      .append('text')
      .attr('class', 'axis-label')
      .attr('y', -100)
      .attr('x', -100)
      .attr('transform', 'rotate(-90)')
      .attr('fill', 'black')
      .style("font-size","28px")
      .text(yaxisname)
  }
  
  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].state))
      .attr("font-size", '20px')
  }

  d3.select('svg')
            .append('g')
            .attr("transform","translate("+650+","+50+")")
            .append('text')
            .attr('class', 'title')
            .attr('y', -10)
            .style("font-size","40px")
            .text(title);

  const annotations = [
                {
                  note: {
                    label: "States: Illinois",
                    title: "Average Price is $26,715.71",
                    wrap: 150,
                  },
                  x: 200,
                  y: 25,
                },
                {
                  note: {
                    label: "State: New York",
                    title: "Average Price is $17,850.71",
                    wrap: 150,
                  },
                  x: 475,
                  y: 200,
                },
                {
                  note: {
                    label: "State: California",
                    title: "Average Price is $17,836.71",
                    wrap: 150,
                  },
                  x: 750,
                  y: 200
                },
                {
                  note: {
                    label: "State: Florida",
                    title: "Average Price is $15,075.63",
                    wrap: 150
                  },
                  x: 1025,
                  y: 260
                },       
                {
                  note: {
                    label: "State: Texas",
                    title: "Average Price is $13,607.30",
                    wrap: 150
                  },
                  x: 1300,
                  y: 285
                }]
        
  const makeAnnotations = d3.annotation()
        .type(d3.annotationLabel)
        .annotations(annotations)

  d3.select("svg")
        .append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations)
  
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();