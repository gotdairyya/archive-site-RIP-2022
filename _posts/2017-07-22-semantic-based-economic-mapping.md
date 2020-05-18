---
layout: post
title: Semantic Based Economic Mapping
subtitle: or maps.locus
image: ../assets/images/magnifying-glass.png
zoom: 80%
---
*A note from future me: Prior to my PhD I had what I would call an interesting and unconventional job. I worked at a firm focused on developing a systems-based economic model, called [Locus Analytics](home.locus). While there, I developed the design language for communicating a model that is built on semantic and syntactical relations. Below is a post from 2017 regarding some of my work.*

Maps.locus is the entrance to a new world of economic exploration; it is is a space to begin re-imagining how we navigate our complex and ever growing economy.

This project began in late 2016, focused around an accessible web app to help explain the Locus Model to outside users. From beginning to end, I worked to design an interface and experience that is not only intuitive to a first time user, but also interesting. The biggest challenge was condensing the Locus Model content and data of 16 million companies, so that it was easy to understand and also comprehensive and true to the model.

![three screenshots of maps.locus website](/../assets/images/mapslocus/screenshots.png){:.responsive-image}

The images above are early wire frames of a tool that breaks apart standardized business sentences and converts them into a matrix. The example below shows a mini demo of how the sentences are split; verbs define rows and nouns define columns. Verbs conceptually represent the different types of functions that exist in the economy, where the nouns represent resources and objects that can be acted on by the functions.

 ![gif of matrix showing how verbs and nouns are combined to describe economic activity. ex. buy + cars = buy cars](/../assets/images/mapslocus/matrix.gif){:.responsive-image}

Cool, now  you know what the matrix conceptually does, you may be asking why are all the colors under the sun and rainbow in one visual? Well, every activity and resource is assigned a specific color. This is a topic too long for this post, but long story short there is a visual language that runs parallel to the classification system. *If you would like to read more, check-out the [semiotics post]({% post_url 2019-07-22-semiotics %}).*

In redesigning the website, the biggest design challenge was incorporating color and linguistic information in one visual: the grid. Previous iterations colored the values base on this pattern:

 ![old visualization representing the color combination of the activity and resource. a big square with a purple rectangle on the right](/../assets/images/mapslocus/old-grid.png){:width="20%"}

Activities are represented on the left and resources on the right.

Users would often read this as activities signifying a large proportion of the business found in that specific area, when actually activity + resource describe the business. We need a more equal way to represent this. Ultimately, two triangles were picked to represent the combined equal role the activity and resource.

![new visualization representing the color combination of the activity and resource. a square split into two triangles](/../assets/images/mapslocus/new-grid.png){:width="20%"}
