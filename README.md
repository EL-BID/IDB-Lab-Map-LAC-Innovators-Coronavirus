[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=EL-BID_IDB-Lab-Map-LAC-Innovators-Coronavirus&metric=alert_status)](https://sonarcloud.io/dashboard?id=EL-BID_IDB-Lab-Map-LAC-Innovators-Coronavirus)

# IDB Lab Map of LAC innovators – Coronavirus

Data from the map https://bidlab.org/en/map-LAC-innovators-Covid-19. 

This map shows innovators from Latin America and the Caribbean that are leading potential solutions relevant to the different aspects and challenges of the Coronavirus pandemic.  Contribute to this map and share your innovative solution [here](https://bidlab.org/en/map-LAC-innovators-Covid-19).


![landing_dash](https://github.com/EL-BID/IDB-Lab-Map-LAC-Innovators-Coronavirus/blob/master/Map-lac-innovators-covid.png?raw=true)

[Go to map](https://bidlab.org/en/map-LAC-innovators-Covid-19)

Interactive map from LAC's entrepreneurship ecosystem responding to the pandemic.


## Access and use of the data

The data was also thought to be used by the broad community of the innovation ecosystem and developers. If you have any ideas or doubts about using the data, do not hesitate to submit an [issue](https://github.com/EL-BID/IDB-Lab-Map-LAC-Innovators-Coronavirus/issues/new).

The latest version of the data is easily available through the methods below.


### Visualize, filter and download the data using dynamic web interface

[Download the data](https://el-bid.github.io/IDB-Lab-Map-LAC-Innovators-Coronavirus/)

The visualization tool pulls the data directly from the map and uses open source libraries to build a web friendly table. Filter, browse and search the data before exporting it as a CSV or XLSX:

[![table preview](https://github.com/EL-BID/IDB-Lab-Map-LAC-Innovators-Coronavirus/blob/master/web-table-preview.png?raw=true)](https://el-bid.github.io/IDB-Lab-Map-LAC-Innovators-Coronavirus/)

**Main Open Source used libraries:**

* https://jquery.com/
* https://getbootstrap.com/
* https://bootstrap-table.com/docs/getting-started/usage/
* https://github.com/typeiii/jquery-csv
* https://www.chartjs.org/


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

Use the options from the visualization and download data as csv or XLSX.

[Click here to open](https://el-bid.github.io/IDB-Lab-Map-LAC-Innovators-Coronavirus/)


## Authors

- Code: 
  - Julien Collaer IDB Lab [linkedin](https://www.linkedin.com/in/jcollaer)
 
- Map Data:
  - Yuri Suarez Dillon IDB Lab
  - Christina Nolasco IDB Lab
  - [...]


## Don't forget to cite us :)

To cite the IDB Lab Map of LAC innovators – Coronavirus, please use the following reference:

> Inter-American Development Bank and IDB Lab. "IDB Lab Map of LAC innovators – Coronavirus". 2020. Inter-American Development Bank. https://bidlab.org/en/map-LAC-innovators-Covid-19


This work is licensed under a Creative Commons IGO 3.0 - see the [LICENSE.md](/LICENSE) file for details.+

