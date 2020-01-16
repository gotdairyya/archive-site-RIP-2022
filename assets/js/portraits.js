// class DataPortrait {
//   constructor(data) {
//     this.data = data
//
//     //adding dummy data for global portrait
//     this.data.push({
//       acquisition_date: "0",
//       artifact_name: "0",
//       continent: "0",
//       country_code: "0",
//       country_of_origin: "0",
//       created_date: "0",
//       description: "0",
//       museum: "global"
//     })
//
//
//     let museumNames = []
//
//     for (let museums of this.data) {
//       museumNames.push(museums.museum)
//     }
//
//
//     //remove duplicates
//     let museumsSet = new Set(museumNames)
//     this.museums = [...museumsSet]
//     // this.museums[7] = "global"
//
//     this.museumData = []
//     for (let n of this.museums) {
//       let filtData = this.data.filter(d => d.museum === n)
//       this.museumData.push({
//         museum: n,
//         years: filtData.map(y => y.created_date),
//         countries: filtData.map(y => y.country_of_origin),
//         artifacts: filtData.map(y => y.artifact_name).length
//       })
//     }
//
//     this.artifacts = []
//     for (let countries of this.museumData) {
//       let countrySet = new Set(countries["countries"])
//       countries["countries"] = [...countrySet]
//       this.artifacts.push(countries.artifacts)
//     }
//
//     this.colors = ["#b5a5e3", "#b1af00", "#ff5b1a", "#e2a333", "#5b7769"]
//
//     this.artifactScale = d3.scaleOrdinal()
//       .domain([d3.min(this.artifacts), d3.max(this.artifacts)])
//       .range([1, 5])
//
//
//   }
//
//   dataSummary(data) {
//     let i = 0;
//     for (let museum of this.museumData) {
//       this.drawPortrait(museum, i)
//       i++
//     }
//
//   }
//
//   drawPortrait(museum, i) {
//     let svg = d3.select("div#example").attr("width", 500).attr("height", 600).call(this.resizeSVG)
//     // console.log("Drawing:", museum)
//     svg = svg.append("g")
//
//
//     let length = museum.years.length
//
//     let bc = museum.years.filter(d => d === 0 || d < 0)
//     let first = museum.years.filter(d => d >= 0 && d < 501)
//     let second = museum.years.filter(d => d >= 501 && d < 1001)
//     let third = museum.years.filter(d => d >= 1001 && d < 1501)
//     let fourth = museum.years.filter(d => d >= 1501)
//
//
//     let yearWidths = []
//     yearWidths.push(bc.length / length)
//     yearWidths.push(first.length / length)
//     yearWidths.push(second.length / length)
//     yearWidths.push(third.length / length)
//     yearWidths.push(fourth.length / length)
//
//
//     let frameWidth = 238 * .3
//     let frameHeight = 360 * .3
//     let rectWidth = [0]
//
//     let portraitColors = svg
//       .selectAll("rect")
//       .data(yearWidths)
//       .join("rect")
//       .attr("height", frameHeight)
//       .attr("width", (d, i) => {
//         rectWidth.push((d * frameWidth) + rectWidth[i]);
//         return d * frameWidth
//       })
//       .style("fill", (d, i) => this.colors[i])
//       .attr("x", (d, i) => rectWidth[i])
//       .attr("transform", "translate(7,5)")
//
//     let lineWidth = this.artifactScale(museum.artifacts)
//
//     let artifactLine = svg
//       .append("line")
//       .attr("x1", frameWidth / 2)
//       .attr("y1", frameHeight)
//       .attr("x2", frameWidth)
//       .attr("y2", frameHeight - (frameWidth / 2))
//       .style("stroke", "black")
//       .style("stroke-width", lineWidth)
//       .attr("transform", "translate(5,5)")
//
//     let countries = museum.countries.length
//     countries = countries / 6;
//     countries = Math.round(countries)
//     let countryArray = []
//
//     for (let i = 0; i < countries; i++) {
//       countryArray.push(i)
//     }
//
//     let countryDots = svg
//       .selectAll("circle")
//       .data(countryArray)
//       .join("circle")
//
//     let j = 0;
//     let k = 3
//     countryDots
//       .attr("r", 5)
//       .attr("cx", function(d, i) {
//         if (i < 10) {
//           if (i % 2 === 0) {
//             return (i * 10) + 10
//           } else {
//             return (i * 10) + 20
//           }
//         } else if (i >= 10 && i < 20) {
//           if (i % 2 === 0) {
//             j = j + 1
//             return (j * 10) + 10
//           } else {
//             j = j + 1
//             return (j * 10) + 20
//           }
//         } else {
//           if (i % 2 === 0) {
//             k = k + 1
//             return (k * 10) + 10
//           } else {
//             k = k + 1
//             return (k * 10)
//           }
//         }
//       })
//       .attr("cy", function(d, i) {
//         if (i < 10) {
//           return (i * 10) + 10
//         } else if (i >= 10 && i < 20) {
//           return ((i - 10) * 10) + 10
//         } else {
//           return ((i - 20) * 10 - 10)
//         }
//       })
//       .attr("transform", "translate(7,20) scale(.5)")
//
//     let ticker = i
//     svg
//       .attr("transform", function() {
//         if (ticker < 4) {
//           if (ticker === 0) {
//             return `translate(0,${frameHeight*.2})`
//           } else {
//             return `translate(0,${ticker*1.2*frameHeight+(frameHeight*.2)})`
//           }
//         } else {
//           ticker = ticker - 4
//           if (ticker === 0) {
//             return `translate(${frameWidth*1.2},${frameHeight*.2})`
//           } else {
//             return `translate(${frameWidth*1.2},${ticker*1.2*frameHeight+(frameHeight*.2)})`
//           }
//         }
//       })
//       .attr("margin", 20)
//
//     let frame = svg.append("rect")
//       .attr("width", frameWidth)
//       .attr("border", 20)
//       .attr("height", frameHeight)
//       .style("stroke", "black")
//       .style("stroke-width", 5)
//       .attr("transform", "translate(5,5)")
//       .attr("id", museum.museum)
//       .attr("class", "porButton")
//
//     let globalPor = d3.select("#global")
//
//
//     globalPor //TODO add globe to global button!!!
//       .style("fill", "white")
//       .append("svg:image")
//       .attr('xlink:href', "https://upload.wikimedia.org/wikipedia/commons/c/c4/Globe_icon.svg")
//       .attr("x", function(d) {
//         return -25;
//       })
//       .attr("y", function(d) {
//         return -25;
//       })
//       .attr("height", 50)
//       .attr("width", 50);
//
//     let that = this;
//     frame.on("click", function(d, i) {
//         d3.selectAll(".porButton").classed("selected", false)
//         d3.selectAll(".porButton").classed("not-selected", true)
//         // that.vizCoord.getMuseumTabs().switchTab(museum.museum)
//         // that.vizCoord.getWorldMap().drawMuseum(museum.museum)
//         // that.vizCoord.updateMuseum(museum.museum)
//         d3.select(this).classed("selected", true)
//         d3.select(this).classed("not-selected", false)
//       })
//       .on("mouseover", function(d) {
//         let title = museum.museum
//         // d3.selectAll(".porButton").attr("opacity", title === that.vizCoord.activeMuseum ? 1 : .2)
//         title === "metropolitan-museum-of-art" ? title = "The Met" : title === "minneapolis-institute-of-art" ? title = "Mia" : title === "cooper-hewitt-smithsonian-design-museum" ? title = "Cooper Hewitt" : title === "penn-museum" ? title = "Penn Museum" : title === "cleveland-museum-of-art" ? title = "Cleveland Museum of Art" : title === "museum-of-modern-art" ? title = "MoMa" : title === "global" ? title = "All Museums" : title = "Canada Science and Technology Museum"
//         d3.select(this).append('svg:title')
//           .text(title)
//       });
//
//     // d3.selectAll("")
//   } //end drawPortraits
//
//   // make responsive
//   resizeSVG(svg) {
//     let that = this
//     // get container + svg aspect ratio
//     let container = d3.select(svg.node().parentNode),
//       width = parseInt(svg.style("width")),
//       height = parseInt(svg.style("height")),
//       aspect = width / height;
//
//     svg.attr("viewBox", "0 0 " + width + " " + height)
//       .attr("perserveAspectRatio", "xMinYMid")
//       .call(resize);
//
//     d3.select(window).on("resize." + container.attr("id"), resize);
//
//     // get width of container and resize svg to fit it
//     function resize() {
//       let targetWidth = parseInt(container.style("width"));
//       svg.attr("width", targetWidth);
//       svg.attr("height", Math.round(targetWidth / aspect));
//     }
//   }
// } //end Portraits class

let example = d3.select("div#example")

example.append("svg").append("rect").style("fill", purple)