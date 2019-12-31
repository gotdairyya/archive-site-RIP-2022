class MuseumTabs {
  /**
   *
   */
  constructor(data, vizCoord) {
    this.vizCoord = vizCoord
    this.data = data;
    this.tabNum = {
      tab: 0
    };
    this.numMuseums = this.data.length;
    this.animationDuration = 500;

    this.xScale = d3.scaleLinear()
      .domain([0, 7])
      .range([150, 350])
      .nice();

    this.museumButton = null;

    // this.activeMuseum = vizCoord.activeMuseum
  }

  drawMuseumTabs() {
    let that = this;

    let view = d3.selectAll('.column');

    let tab = view.select("#museumTabContainer")
      .attr("transform", "translate(0, 80)") //-400
      .attr("width", 500)
      .attr("height", 500).call(that.resizeSVG);

    tab.append("rect")
      .attr("width", 500)
      .attr("height", 500)
      .attr("rx", 10)
      .attr("ry", 10)
      .style("fill", "white")
      .style("stroke", "#d9d9d9")
      .style("stroke-width", 6)

    let container = tab.selectAll("svg").data(this.data).enter()
      .append("svg")
      .attr("id", function(d, i) {
        return "museumBox" + i;
      })
      .classed("activeTab", function(d, i) {
        if (i == 0) {
          return true;
        } else return false;
      })
      .classed("unactiveTab", function(d, i) {
        if (i != 0) {
          return true;
        } else return false;
      })
      .classed("container", true)
      .attr("transform", function(d, i) {
        if (i == 0) {
          return "translate(0, 0)";
        } else {
          return "translate(-600, 0)";
        }
      });

    container.append("g")
      .classed("museumTextBox", true)
      .attr("transform", function(d, i) {
        if (i == 0) {
          return "translate(0, 0)";
        } else {
          return "translate(-600, 0)";
        }
      });

    tab.selectAll(".museumTextBox").append("text")
      .text(function(d) {
        return d.museumName.toUpperCase();
      }).classed("museumName", true)
      .attr("transform", "translate(35, 60)");

    tab.selectAll(".museumTextBox").append("text")
      .text(function(d) {
        return d.location;
      }).classed("museumLocation", true)
      .attr("transform", "translate(35, 90)");

    tab.selectAll(".museumTextBox").append("text")
      .text(function(d) {
        return d.website;
      }).classed("museumWebsite", true)
      .attr("transform", "translate(35, 115)");

    let svg = tab.selectAll("svg");
    let fo = svg.append('foreignObject')
      .attr('width', 400)
      .attr('height', 300)
      .attr("transform", function(d, i) {
        if (i == 0) {
          return "translate(35, 150)";
        } else {
          return "translate(-600, 150)";
        }
      });

    fo.append('xhtml:div').html(function(d, i) {
      return "<p id='museumDescription'>" + d.about + "</p>";
    });

    //on button clicks change the content
    d3.select("button#moma").on("click", function(d) {
      // that.vizCoord.updateYearRange(1958, 1958)
      that.vizCoord.reDrawBrush(1958, 1958)
      that.vizCoord.updateMuseum("museum-of-modern-art")
      that.vizCoord.getWorldMap().drawMuseum("museum-of-modern-art")
      that.momaTabs("moma")
      that.portraitHighlight("#museum-of-modern-art")
    })
    d3.select("button#penn").on("click", function(d) {
      // that.vizCoord.updateYearRange([1928, 1928])
      that.vizCoord.reDrawBrush(1928, 1928)
      that.vizCoord.updateMuseum("penn-museum")
      that.vizCoord.getWorldMap().drawMuseum("penn-museum")
      that.momaTabs("penn")
      that.portraitHighlight("#penn-museum")
    })
    d3.select("button#explore").on("click", function(d) {
      that.tutorial()
      that.portraitHighlight("reset")
    })

  }

  portraitHighlight(id) {
    if (id === "reset") {
      d3.selectAll(".porButton").classed("not-selected", false)
      d3.selectAll(".porButton").classed("selected", true)
    } else {
      d3.selectAll(".porButton").classed("not-selected", true)
      d3.selectAll(".porButton").classed("selected", false)
      d3.select(id).classed("selected", true)
    }

  }

  switchTab(which) {
    let that = this;
    let tabnum = 0;

    for (let i = 0; i < this.data.length; i++) {
      // console.log(this.data[i].museumName, which);
      let museumName = this.data[i].museumName.toLowerCase().replace(/ /g, '-');
      museumName = museumName.slice(0, -1);

      which == "global" ? tabnum = 7 : which == museumName ? tabnum = i : null
      // if (which == museumName) {
      //   tabnum = i;
      // }
    }

    let tab = d3.selectAll('.column').select("#museumTabContainer");
    let active = tab.select(".activeTab.container");

    let activeId = active.attr("id")[active.attr("id").length - 1];;

    if (tabnum < activeId) {
      if (this.tabNum.tab > 0) {
        this.tabNum.tab--;
      }
      active.select(".museumTextBox")
        .transition().duration(that.animationDuration)
        .attr("transform", function(d, i) {
          return "translate(-600, 0)";
        });
      active.select("foreignObject")
        .transition().duration(that.animationDuration)
        .attr("transform", function(d, i) {
          return "translate(-600, 150)";
        });
    } else if (tabnum > activeId) {
      if (this.tabNum.tab < this.numMuseums - 1) {
        this.tabNum.tab++;
      }

      active.select(".museumTextBox")
        .transition().duration(that.animationDuration)
        .attr("transform", function(d, i) {
          return "translate(600, 0)";
        });
      active.select("foreignObject")
        .transition().duration(that.animationDuration)
        .attr("transform", function(d, i) {
          return "translate(600, 150)";
        });

    }

    tab.select(".activeTab.container")
      .classed("activeTab", false).classed("unactiveTab", true);

    let selected = tab.select("#museumBox" + tabnum);

    selected.select(".museumTextBox")
      .transition().duration(that.animationDuration)
      .attr("transform", function(d, i) {
        return "translate(0, 0)";
      });

    selected.select("foreignObject")
      .transition().duration(that.animationDuration)
      .attr("transform", function(d, i) {
        return "translate(35, 150)";
      });

    selected.classed("unactiveTab", false)
      .classed("activeTab", true);

    //selected circles
    tab.select(".selectedTab").classed("selectedTab", false);
    tab.select("#museum" + tabnum).classed("selectedTab", true);

  }

  momaTabs(museum) {
    this.museumButton = museum
    let data = {
      moma: [
        "On April 15, 1958, MoMA caught on fire! The museum has been undergoing an update to its AC units, and while the workmen were taking a lunch break, a spark from a cigarette landed on some nearby sawdust which burst into flames, followed by highly flammable paint. Lost in the fire was one workman's life and an 18.5 foot Monet painting.", "Following the fire, the number of acquired artifacts dropped continued to well into the 80s.", 1959
      ],
      penn: ["In 1929 Penn Museum received a generous donation from Eldridge Johnson, founder of the victor Talking Machine Company (a record company and phonograph manufacturer).", "You can see the effect of 💰 starting in 1929. The museum begins to acquire a lot more artwork following the funding.", 1929]
    }

    this.updateText(data[museum][0])

    let storyButton = d3.select("#museumBox0").select("#museumDescription")
      .append("div")
      .append("button")
      .classed("story-button bouncy", true)
      .text("Next")


    let that = this

    storyButton.on("click", function() {
      // console.log("button-that", that)
      that.updateText(data[museum][1])
      console.log([data[museum][2], data[museum][2]])
      that.vizCoord.reDrawBrush(data[museum][2], data[museum][2])
    })
  }

  updateText(text) {
    let museum = this.museumButton
    let museumInfo = {
      moma: ["🔥 at MoMA", "New York, NY | USA", "https://www.moma.org"],
      penn: ["💰 at Penn", "Philadelphia, PA | USA", "https://www.penn.museum"]
    }
    d3.select("text.museumName").text(museumInfo[museum][0])
    d3.select("text.museumLocation").text(museumInfo[museum][1])
    d3.select("text.museumWebsite").text(museumInfo[museum][2])
    d3.select("#museumDescription").text(text)
  }

  tutorial() {
    // using shepherd.js to create tutorial
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        },
        classes: 'class-1 class-2',
        scrollTo: {
          behavior: 'smooth',
          block: 'center'
        }
      },
      useModalOverlay: true

    });

    tour.addStep({
      title: 'Explore Museum+Vis!',
      text: `Here is a quick tour to show you how to navigate the site.`,
      attachTo: {
        element: '#blurb-header',
        on: 'bottom'
      },
      buttons: [{
          action() {
            return this.back();
          },
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action() {
            return this.next();
          },
          text: 'Next'
        }
      ],
      id: 'creating'
    });

    tour.addStep({
      title: 'The Museum+Gallery',
      text: `Click on different portraits of the museums to explore their art collections`,
      attachTo: {
        element: '#museum-gallery',
        on: 'left'
      },
      buttons: [{
          action() {
            return this.back();
          },
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action() {
            return this.next();
          },
          text: 'Next'
        }
      ],
      id: 'creating'
    });


    tour.addStep({
      title: 'World View',
      text: `Use the slider to look at how artifact data changes throughout time and geography.`,
      attachTo: {
        element: '.column.is-one-half',
        on: 'left'
      },
      buttons: [{
          action() {
            return this.back();
          },
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action() {
            return this.next();
          },
          text: 'Next'
        }
      ],
      id: 'creating'
    });

    tour.addStep({
      title: 'Changes of Time',
      text: `Use the KDE plot to quickly find abnormalities if the collection data of time.`,
      attachTo: {
        element: '#kde-plot',
        on: 'right'
      },
      buttons: [{
          action() {
            return this.back();
          },
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action() {
            return this.next();
          },
          text: 'Next'
        }
      ],
      id: 'creating'
    });

    tour.addStep({
      title: 'Compare Museums',
      text: `With the tree map you can compare across museums both in size of their collections and locations of artifacts.`,
      attachTo: {
        element: '#tree-map',
        on: 'left'
      },
      buttons: [{
          action() {
            return this.back();
          },
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action() {
            return this.next();
          },
          text: 'Explore!'
        }
      ],
      id: 'creating'
    });

    tour.start();
  }

  // make responsive
  resizeSVG(svg) {
    let that = this
    // get container + svg aspect ratio
    let container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style("width")),
      height = parseInt(svg.style("height")),
      aspect = width / height;

    svg.attr("viewBox", "0 0 " + width + " " + height)
      .attr("perserveAspectRatio", "xMinYMid")
      .call(resize);

    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
      let targetWidth = parseInt(container.style("width"));
      svg.attr("width", .8 * targetWidth);
      svg.attr("height", .8 * Math.round(targetWidth / aspect));
    }
  }

}