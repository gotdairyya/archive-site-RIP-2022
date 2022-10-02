---
layout: post
title: Abstract Abstracts
subtitle: Has abstract readability in arXiv papers changed?
image: ../assets/images/calculator.png
zoom: 60%
---
This is deep dive done by myself and my friend Cole Polychronis for our data mining class.

### Motivation
Our project began with a desire to answer a question posed in the backlog of an online data visualization blog, [the Pudding](pudding.cool): are the titles of scientific texts becoming harder to read? As two first-year graduate students who will be involved in the process of writing research papers and hope to reach large(r) audiences, we were immediately invested in this idea. While we both felt that we had anecdotal evidence that scientific papers were getting harder to read due to an increase in the use of jargon, acronyms, etc. we were also interested in expanding this question to not just investigate change in readability over time, but also to investigate whether different disciplines exhibited different types of change. Being able to identify if there are certain disciplines who “do readability” better would give us places to look for examples to emulate. As a means of managing the scope of our project, we elected to examine the readability of abstracts available on arXiv. In order to explore the readability of these scientific papers, we opted to use four of the most widely used readability metrics: Flesch-Kincaid Grade Level, Flesch Reading Ease, Automated Readability Index, and the Dale-Chall Readability. To build on these established readability measures, we explored using principal component analysis to reduce noise and discard redundancy amongst the various (similar) readability metrics, as well as removing domain specific keywords to improve the nuance of these readability metrics.

### Data
Under the Open Archives Initiative, metadata and full text are available for download from arXiv. We began our search using the help page of ArXiv.org, but found that there was an already extracted subset of the data on [Kaggle](https://www.kaggle.com/tayorm/arxiv-papers-metadata/data#). This subset on Kaggle is stored as tsvs according to either the category of research or the year of publication. In order to download from Kaggle, we had to create a Kaggle account and then download the zip file. The data is roughly 9GB and is comprised of the metadata for 1.5 million research papers, spanning roughly 25 different disciplines, collected between 1993 to 2019.


### Key Idea
Our initial intent for this project was to use several readability metrics that we discovered during our background research for this project in order to differentiate different disciplines. In particular, we identified the Flesch-Kincaid Grade Level, Flesch Reading Ease, Automated Readability Index, and the Dale-Chall Readability metrics to be significant metrics that are widely used across education and even employed by the United States Government to assess the readability of written documents. A key assumption that informed this research approach was our belief that we would see some pattern of decreased readability over time or variable readability across disciplines. However, as we began conducting the analysis for our intermediate report, we found that there were no distinctly readable disciplines and patterns that implied less or more readability. Additionally, across all four readability metrics that we used, we found that the results were not all that nuanced, indicating that the title and abstract together were consistently at a college or above reading level. The scores and their interpretations are summarized in Table 1. We’ve also Fig 1 to illustrate an example of our initial experiment.

|  | Formula | PDW | ASL | ASW | CC | WC | Interpretation |
|-----------------------------|:---------------------------------------|:---:|:---:|:---:|:--:|:--:|:----------------------------------------------------------------------------------------------|
| **Flesch KincaidGrade** | 0.39xASL + 11.8xASW - 15.59 |  | x | x |  |  | Corresponds directly to grade levels in the US. Anything above 12 is a college reading level. |
| **Flesch Reading Ease** | 206.835 - (1.015 × ASL) - (84.6 × ASW) |  | x | x |  |  | Anything above 30 is difficult to read and intended for college students. |
| **Automated Readability Index** | 4.71xCC/WC + 0.5*WC/ASL - 21.43 |  | x |  | x | x | Corresponds to grade levels. Anything above 12 is a college reading level. |
| **Dale-Chall** | 0.1579x(PDW) + 0.0496x(ASL) +3.6365 | x | x |  |  |  | Indirectly corresponds to grade levels. Anything above 9.0 is a college reading level. |

*Table 1. This table represents the four major readability metrics and how to interpret the metric.PDW: Percentage of difficult words not on the Dale-Chall word list; ASL: Average sentence length; ASW: Average word length in syllables; CC: Character Count; WC: Word Count*

Given our lack of exciting results after experimenting for the intermediate report, we pivoted to exploring two complementary aspects of our readability criteria in the hopes of achieving a higher level of nuance and possibly identifying patterns that weren’t immediately obvious during our experimentation for the intermediate report.These complementary approaches were:
- A1. Using a combination of normalization and principal component analysis (PCA) could serve to reduce noise and discard redundancy between the multiple readability scores to identify a clearer pattern, either across time or discipline.
- A2. Removing domain specific words could result in more conclusive and/or nuanced reading scores.

### Experiments

**A1. Normalization and PCA**

In order to conduct PCA, we first had to normalize our data to ensure that a difference in units was not the cause for explainability for a component. In order to normalize our data, we first had to determine if the scores for each one of our readability metrics were normally distributed. We recognized that in order to normalize our scores, we had to apply log transforms to both the Flesch-Kincaid Readability Measure and the Automated Readability Index, as these distributions had fairly long left and right tails, respectively.

After transforming and normalizing these metrics, we applied PCA and kept the first two principal components in the hope of visualizing them. If there is a difference in readability of scientific papers, either across discipline or time, we would hope to see some clustering loosely along the diagonal, with a position further up the diagonal indicating that cluster is more difficult to read according to our readability metrics. The results of applying PCA are discussed in the results section below.

**A2. Removing Domain Specific Words**
Inspired by research in medical literature readability, we decided to explore the effect that removing domain-specific words from abstracts would have on readability scores. In medical information retrieval literature, methods of categorizing the difficulty of word comprehension (or inversely, the domain knowledge necessary to understand a word) are aided by referencing the Medical Subject Headings, the U.S. National Library of Medicine’s hierarchical term thesaurus (see: Xin Yan, Dawei Song, and Xue Li. 2006. Concept-based document readability in domain specific information retrieval.).

Given that we did not have access to a controlled thesaurus to indicate the difficulty of domain-specific words, we had to construct our own frequent domain word list. We created two word vectors of equal length: one of domain-specific words V_D and one of random words V_R. The domain-specific V_D was created using the word frequency found across abstracts within a discipline over the entire time period that the discipline spanned.

To construct the vectors, the abstracts were first stripped of stop-words. Next, we found the word frequency of all the words that occurred within a discipline over the full period of time available on arXiv. V_D was constructed with the top n words, and V_R was constructed of n random words from the same list.

We tested typically used n = 100 when running the experiments after testing values of n that were larger and smaller than 100. We found that removing too few words did not capture the breadth of domain jargon present in abstracts and removing too many words would result in shorter abstracts, affecting the readability scores.

By taking the top n words that occurred in a discipline over time and removing them from the abstracts we hoped the resulting readability scores would be representative of the true readability sans domain-specific knowledge. Additionally, the exclusion of domain knowledge from abstracts would enable us to compare readability scores across domains in order to understand a more general trend of readability in research papers found in ArXiv.

Finally, we tested the impact of removing n random words to check whether the change in readability scores was a result of removing domain specific words or making the abstracts shorter in length.

### Results

The visualization of our data projected onto the two most important principal components yielded by PCA is shown below. If there is a difference in readability of scientific papers, either across discipline or time, we would hope to see some clustering loosely along the diagonal, with a position further up the diagonal indicating that cluster is more difficult to read according to our readability metrics.



|  |  |
|:-|:-|
|![PCA by domain, it's a big ole blob of nothing interesting](/../assets/images/abstractabstracts/domainPCA.png){:.responsive-image}|![PCA by year, like the PCA by domain, it's a big ole blob of nothing interesting](/../assets/images/abstractabstracts/yearPCA.png){:.responsive-image}|

Before discussing the details of either coloration of the projected data above, one of the key observations that we can make from either chart is that there is a distinct lack of clustering! Rather, there is one large ‘blob’ of data, which we can loosely interpret as being centered at an average level of scientific paper readability, with a whispy tail along the diagonal, indicating papers that are not as easily readable.

Looking at the projected data by domain is relatively uninformative. We can see that the domain of biology is most tightly packed around the center, with math forming a looser packing, which we can interpret to mean that there is more variability in the readability of papers in math as compared to biology. The rest of the domain are disperse in a way that means that we can’t glean much about these domains comparatively. We notice that the less readable papers are comprised of physics and computer science papers. However, there is not much weight to this tail along the diagonal, so it is hard to say much about this.

A bit more interesting of a distinction can be made when we look at the projected data by year of publication. While we still only see a large blob centered around mean readability, we can see that papers published before roughly 1990-2000 are more tightly packed than papers published after 2000. This means that overtime, the readability of scientific papers has not necessarily increased or decreased, but has become much more variable; papers span a much wider range on the readability spectrum than they did 20 years ago. Informally, papers haven’t gotten easier to read or harder to read since the 90’s, the readability of papers has become a more extreme crapshoot.


Removing domain specific words yielded two somewhat surprising results.
1. Removing domain specific words from abstracts did not affect the readability scores.
2. Removing random words had the same effect as removing domain specific words.

On further consideration, these results are not too surprising because the readability scores (aside from the Dale-Chall) calculate readability using non-semantic metrics such as sentence length, character count and word count. By removing n words, regardless of whether it was domain specific or random, we affected both the character count and the word count.

### Discussion
Ultimately, our experimentation with applying readability metrics to scientific papers defy our expectations and anecdotal examples: readability does not seem to have increased or decreased over the last 30 years and further, there doesn’t necessarily seem to be one discipline that “does” readability better than others. Instead, we found that readability of scientific papers has become more varied over time. This perhaps makes sense, given the proliferation of venues for papers and the volume and variety of research being conducted now versus 30 years ago.

However, we also feel that our experimentation has demonstrated that to a certain extent, existing readability metrics lack the nuance and complexity to identify readability of research papers. As discussed above, all of these reading metrics identified that our papers were above a college reading level (which is to be expected), with little relevance existing at the varying levels of scores above a college reading level. Our experimentation with removing words from text shows that these metrics lack a means of identifying semantic importance of certain text features such as stop words. This experimentation has lead us to conclude that readability metrics need more semantic awareness in order to compare and understand readability of scientific documents.

Sooo you could say we found nothing or someone's PhD thesis...
![daria from the animated tv show shrugging. she is my alter-ego and i never watched the show till 2020](/../assets/images/daria-shrug.gif){:.scale-50-center}
