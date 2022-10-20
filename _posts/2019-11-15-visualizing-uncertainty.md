---
layout: post
title: Visualizing Uncertainty
subtitle: huh? what?
image: /../assets/images/pencil.png
zoom: 70%
---

Since starting my PhD I have read A LOT. Now, you, like my wise friend Treasure may be saying, "Well duh derya, didn't you know that that's what a PhD is?!" Well. My wise friends, I did not.

So like I was saying, I've been reading a lot and I've decided to use this blog as a way of reflecting on articles that I've found interesting/still have opinions on/want to go further than a one hour group discussion. To my peers' credit though, discussion is so critical, and without them I don't think I would be nearly as informed.

### Why Authors Don't Visualize Uncertainty

_Written by Jessica Hullman ([full paper here](http://users.eecs.northwestern.edu/~jhullman/Value_of_Uncertainty_Vis_CR.pdf))_

In this paper, Hullman investigates why visualization authors don't visualize uncertainty when they know that it exists. The title of the paper is pretty self-explanatory, but there are some interesting discussion topics that I will dive deeper into.

Let's start with defining uncertainty in the visualization space.
Uncertainty can enter the visualization pipeline at many steps of the process, resulting in different types of uncertainty. Below is a simple pipeline illustrating potential areas where uncertainty may be introduced.

_As a side note, these are the same spaces where there are potential biases filtering in. Read [Feminist Data Visualization](http://www.kanarinka.com/wp-content/uploads/2015/07/IEEE_Feminist_Data_Visualization.pdf) for a more nuanced discussion._

![a table displaying the four simplified phases of visualization](/../assets/images/uncertainty/visualization-process.png){:.responsive-image}

#### Visualizing uncertainty is hard!

As you can see in the figure above, there are different types of uncertainty that could or could not be visualized. And based on what I have gathered through informal questioning (no formal review of the literature yet), there are no standard methods for visualizing uncertainty because really the choices you would have to make as a visualization designer all depend on the context.

So what do the 90 visualization experts surveyed by Hullman do when confronted with uncertainty?

| Method                  | Vis Example                                                                                           | %   |
| :---------------------- | :---------------------------------------------------------------------------------------------------- | :-- |
| Interval Representation | ![confidence interval example](/../assets/images/uncertainty/confidence-intervals.png){:.table-image} | 76  |
| Visual Variables        | ![visual variables example](/../assets/images/uncertainty/visual-variables.png){:.table-image}        | 75  |
| Density Plot/Histogram  | ![histogram example](/../assets/images/uncertainty/histogram.png){:.table-image}                      | 54  |
| Text                    | margin of error is 5%                                                                                 | 51  |

Given that there are _some_ methods of visualizing uncertainty, the interesting aspect of Hullman's results involve asking _why_ authors are not visualizing uncertainty. For that, yes, I made another table.

| Reason                                       | %   |
| :------------------------------------------- | :-- |
| Not to overwhelm viewers                     | 62  |
| Not having access to uncertainty information | 47  |
| Not knowing how to calculate uncertainty     | 26  |
| Not wanting to raise doubts in the data      | 17  |

Using the results of her survey, Hullman proposes both a rhetorical model of uncertainty omission and formal theory of visualization-based inference, neither of which I will discuss here. Instead, I'd like to relate the reasons of uncertainty omission to the visualization process and task definition. My ideas of process are informed by personal experience and drawn from the [nested model](https://www.cs.ubc.ca/labs/imager/tr/2009/NestedModel/NestedModel.pdf) by Tamara Munzner.

_NB. I apologize in advance for the funny tone shift in the next section, I somehow wound up making it prescriptive rather than descriptive because it felt like a more natural way of relaying the information_

**Domain Problem Characterization:** Before you can begin any visualization, you need to understand the problem you are trying to address with the visualization. If you are approaching data from a more exploratory perspective, then you should spend some time defining what you are interested in and what you expect as a result of your exploration.

At this stage of the design process, you can start asking yourself:

- Who will use the visualization and why?
- What is their exposure to uncertainty?
- Is uncertainty necessary for the user in accomplishing their task?

In Hullman's survey, many of the respondents who are journalists discuss simplifying the message and omitting uncertainty deliberately. I would posit here that the journalists have implicitly or explicitly answered the questions above, deciding that uncertainty is not essential to the task of their users, which is to understand the narrative and main points of the article they are reading.

In comparison, a design study researcher working with scientists should deliberately ask the scientists what types of uncertainty are important to their task at hand and why.

**Operation and Data Type Abstraction:** After understanding the domain problem and the role that uncertainty could play in the ability of the users to achieve their tasks, you can shift your attention to understanding the data.
As stated in Munzner's paper, this is the space to translate the tasks and problems from the first phase into the land of abstract computer science. In this phase, pay attention to the data. Does the data support your user's task? Where is the data coming from? Has it been manipulated? Will you need to manipulate?

**Visual Encoding and Interaction Design:** Going back to your initial task characterization, will you need to encode uncertainty in the data? What visual encoding will support the types of uncertainty that are present within the data or the processes associated with abstracting the data?

### Still Uncertain?

Even after writing this entry, I don't think there can ever be a clear path to determining when and what types of uncertainty to visualize. The only thing I can say with certainty is that as a visualization designer it's critical to understand the problem you are trying to solve and the motivation your users have to engage with and understand the visual encodings.

**Further Reading:**

- [the Medium series by Hullman and her colleague](https://medium.com/multiple-views-visualization-research-explained/- uncertainty-visualization-explained-67e7a73f031b)
- [a nice piece by FlowingData with examples of how to visualize Uncertainty](https://flowingdata.com/2018/01/08/visualizing-the-uncertainty-in-data/)
- [the NYT explanation of their political needle](https://www.nytimes.com/2018/11/05/upshot/needle-election-night-2018-midterms.html)
