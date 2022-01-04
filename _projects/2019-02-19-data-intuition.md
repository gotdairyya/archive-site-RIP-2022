---
layout: post
title: Intuiting Data
subtitle: code paper scissor
image: ../assets/images/paper.png
zoom: 80%
---
In 2019, I was selected to participate in a 2-week workshop called 'Code, Paper, Scissors' run by the [School For Poetic Computation](https://sfpc.io/). The course was centered around the following question:
> *"How does our understanding of technology change when abstractions become tangible?"*

We had brilliant instructors who came from a variety of disciplines to teach us about their practices using paper as the main medium. The instructors and curriculum for the two weeks can be found [here](http://sfpc.io/code-paper-scissors/). 

At the end of the two weeks, we were expected to create and present a project inspired by the workshop. I focused on this question around how data may become more intuitive? Data are often required to be read in specific ways, like tables or charts, but what happens when we change the channel? My project focused on sonifying the housing prices and yearly income across zipcodes in NYC.

![table display with strips of sheet music. small music box taped to table on the right. sign above saying 'can you build data intuition?' with some illegible signs to the right](/assets/images/data-intuition/table-display.jpeg){:.responsive-image}

Using Census data for median income and Zillow data for median rent prices per zipcode, I calculated the affordability of homes in cities across the US. Home are considered affordable when you are spending less than 30% of your income on rent.

Using music boxes as instruments to present the data, my mapping of affordability was constrained to the materiality of the boxes. I presented affordability in two ways:

1. (1) the C - E - G chord presents an affordable zipcode specifically chosen for the harmony of sound it would produce.
2. (2) the pitch increases when homes become less affordable, a deviation from using the chord and offering a scale with which to illustrate the range of unaffordableness

![example of three zipcodes in an image of verticle striped musical paper. the first zipcode has circles on C, E, and G and is marked affordable. the second has only one circle beyond the G mark and is marked unaffordable. the final zipcode has only one circle all the way to the right and is marked extremely unaffordable](/assets/images/data-intuition/example-legend.png){:.responsive-image}

The data were generated as SVGs that were then cut in a Cricut laser cutter [github repo](https://github.com/gotdairyya/musical-data) if you'd like to generate your own. These sheets of paper were then fed into musical boxes as part of a performative demonstration.


![three examples of the generated musical data from three cities: raleigh, new york city, and san francisco](/assets/images/data-intuition/example-cities.png){:.responsive-image}

Ultimately, I could've made many many other choices in how to sonify the data. While what may be considered a daunting design decision, this is the part of the performance I liked most. By using a simple toy music box and mapping data to music,those choices become *instantly and evidently arbitrary*. In data visualization, we struggle with the use of visual conventions that obscure the uncertainty and createdness of data, creating a false ontology where data is collapsed with reality.[^capta] [^conventions] Using a music box and being playful took the audience away from that and generated the space to ask questions of the data.

A major question asked was about the length of the musical barcodes. Why were some cities longer than others? Since I pulled the data from publically available Zillow data and printed each zipcode per line, it became quickly evident that some cities had more information available than others -- highlighting the how the data are created, not are.

And finally, there were kids! and they played the music! and touched the musical sheets! and asked questions! trying to understand why the music box didn't play songs that they were familiar with. Much more exciting than staring at a chart.

Acknowledgements: This project would not have been possible without SFPC and specifically the help and encouragement of [Robby Kraft](https://robbykraft.com/).


[^capta]: *Data are capta*, taken not given. [Drucker, Johanna. "Humanities approaches to graphical display." Digital Humanities Quarterly 5.1 (2011): 1-21.](http://www.digitalhumanities.org//dhq/vol/5/1/000091/000091.html)
[^conventions]: [Kennedy, Helen, et al. "The work that visualisation conventions do." Information, Communication & Society 19.6 (2016): 715-735.](https://www.tandfonline.com/doi/full/10.1080/1369118X.2016.1153126)

