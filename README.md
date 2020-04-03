# Coronavirus Innovators mapping Data

Data from the map https://bidlab.org/en/map-LAC-innovators-Covid-19. 

This map shows innovators from Latin America and the Caribbean that are leading potential solutions relevant to the different aspects and challenges of the Coronavirus pandemic.  Contribute to this map and share your innovative solution [here](https://bidlab.org/en/map-LAC-innovators-Covid-19).


![landing_dash](https://github.com/EL-BID/IDB-Lab-Map-LAC-Innovators-Coronavirus/blob/master/Map-lac-innovators-covid.png?raw=true)

[Go to map](https://bidlab.org/en/map-LAC-innovators-Covid-19)

Interactive map from LAC's entrepreneurship ecosystem responding to the pandemic.

## Use the data

The data was also though to be used by the broad community of innovators, journalists and developers. If you have any ideas or doubts about using the data, do not hesitate to submit an [issue](https://github.com/EL-BID/IDB-Lab-Map-LAC-Innovators-Coronavirus/issues/new).

The latest version of the data is easily available through the methods below.

### Mannualy visualize, filter and download the data

[Download](https://el-bid.github.io/IDB-Lab-Map-LAC-Innovators-Coronavirus/)

That vizualization tool pull the data directly from the map and use open source libraries to buld an web table.

Main Open Source used libraries :

* https://jquery.com/
* https://getbootstrap.com/
* https://bootstrap-table.com/docs/getting-started/usage/
* https://github.com/typeiii/jquery-csv


### Python

```
import pandas as pd
url = 'https://idb-lab-test.maps.arcgis.com/sharing/rest/content/items/70776ec1e2574ab88f75aad69bdabda9/data'
df = pd.read_csv(url)
```

### R

```
library(readr)

df<-read.csv('https://idb-lab-test.maps.arcgis.com/sharing/rest/content/items/70776ec1e2574ab88f75aad69bdabda9/data')
```
Obs: Not sure if it works. Submit a PR if you find a way to do it.


## Download subset for a specific country or solution category

Use the options fron the visulization and download data as csv or XLSX.

[Click here to open](https://el-bid.github.io/IDB-Lab-Map-LAC-Innovators-Coronavirus/)

## Don't forget to cite us :)

To cite the IDB and IDB Lab Coronavirus Innovator Mapping, please use the following reference:

> Inter-American Development Bank and IDB Lab. "Map of LAC innovators (COVID19)". 2020. Inter-American Development Bank. https://bidlab.org/en/map-LAC-innovators-Covid-19


This work is licensed under a Creative Commons IGO 3.0 - see the [LICENSE.md](/LICENSE.md) file for details.

