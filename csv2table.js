/**
 * Simple example of creating a web interactive table from CSV data.
 * 
 * The goal is showing a simple example of using open libraries to vizualize
 * CSV data in a browser.
 * Along with sorting, filtering and exporting capabilities.
 *
 * Ppen source libraries : 
 * - Bootstrap (https://getbootstrap.com/)
 * - JQuery (https://jquery.com/)
 * - bootstrap-table (https://bootstrap-table.com/docs/getting-started/usage/)
 * - boostratp-table-export
 * - JQuery-CSV (https://github.com/typeiii/jquery-csv)
 * 
 * @link   https://github.com/EL-BID/IDB-Lab-Map-LAC-Innovators-Coronavirus
 * 
 * @author Julien Collaer @IDB Lab
 * 
 * @datte  2020
 */
 
/** jshint {} */

var countries = [];
var categories = [];
var sources = [];
var showDetails = false;


/**
* Extending String for a truncate capability
*/
String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
      };


/**
 * 
 * Function receiving CSV response data object Must be CSV
 * Will parse CSV into a list of objects 
 * Creating table structure.
 * Creating combox filtering options for 3 columns: 
 *  - category
 *  - country 
 *  - source
 * Initializing filtering event on combobox
 * Setting show detail event for switching showing full description text or not
 * 
 * @since      2020
 *
 * @param {data}   html response MUST BE CSV content
 */
var processData = function(data) {
  csv = $.csv.toObjects(data);
	
  
  $('#datatable').bootstrapTable({
      pagination: true,
      search: true,
      pagination: true,
      toolbar: "#toolbar-table",
      showExport: true,
      exportDataType: "all",
      showColumns: true,
      showFullscreen: true,
      showFooter: true,
      detailView: true,
      detailViewByClick: true,
      detailViewIcon: true,
      detailFormatter: detailDescriptionFormatter,

      columns: [{
        field: 'organization',
        title: 'Organization',
        width: '20',
        widthUnit: '%',
        sortable: true,
        formatter: linkAccount,
	footerFormatter: TotalFormatter,
	detailFormatter: detailDescriptionFormatter
      }, {
        field: 'category',
        title: 'Category',
        width: '20',
        widthUnit: '%',
        sortable: true,
	footerFormatter: CategoriesFormatter,
	detailFormatter: detailDescriptionFormatter
      }, {
        field: 'country',
        title: 'Country',
        width: '10',
        widthUnit: '%',
        sortable: true,
	footerFormatter: CountriesFormatter,
	detailFormatter: detailDescriptionFormatter
      }, {
        field: 'description',
        title: 'Description',
        width: '40',
        widthUnit: '%',
	sortable: false,
	formatter: descriptionFormatter,
	detailFormatter: detailDescriptionFormatter
      }, {
        field: 'url2',
	title: 'Additional link',
        width: '10',
        widthUnit: '%',
	formatter: LinkFormatter,
	detailFormatter: detailDescriptionFormatter
      }, {
        field: 'url',
	title: 'url',
        width: '0.1',
        widthUnit: '%',
	visible: false
      }],
      data: csv
  });
	
  countries = [];
  categories = [];
  sources = [""];
  $.each(csv, function(i,d) { 
	if(! countries.includes(d.country)) {
	  countries.push(d.country);
	  $("#country")
   		.append('<option val="' + d.country + '">'+ d.country + '</option>');
	}
	if(! categories.includes(d.category)) {
	  categories.push(d.category);
	  $("#category")
   		.append('<option val="' + d.category + '">'+ d.category + '</option>');
	}
	if(! sources.includes(d.source)) {
	  sources.push(d.source);
	  $("#source")
   		.append('<option val="' + d.source + '">'+ d.source + '</option>');
	}
  });
	
	$("#country").selectpicker('refresh');
	$("#category").selectpicker('refresh');
	$("#source").selectpicker('refresh');
	
	$("#country" ).change(function() {
		refreshFilter();
	});

	$( "#category" ).change(function() {
		refreshFilter();
	});
	
	$( "#source" ).change(function() {
		refreshFilter();
	});

	$( "#more_detail").on("click", function() {
		showDetails = showDetails == false;
		refreshFilter();
	});


};


/**
 * 
 * Function refreshing filters to datatable from combobox current values
 * 
 * @since      2020
 *
 */
var refreshFilter = function() {

	var country = $("#country").val();
	var category = $("#category").val();
	var source = $("#source").val();
	filters = {};
	if (country != 0) {
		filters["country"] = country;
	};
	if (category != 0) {
		filters["category"] = category;
	};
	if (source != 0) {
		filters["source"] = source;
	};
	$('#datatable').bootstrapTable('filterBy', filters);
};


/**
 * link account formatter to se url link form URL field value (missing http prefix)
 * 
 * @since      2020
 *
 * @param {value}   field value being evaluated
 * @param {row}     current row object being evaluated
 * @param {index}   integer index of current row being evaluated
 */
var linkAccount = function (value, row, index) {
	return [
		'<a href="http://',
		row.url,
		'" title="Open webpage of ',
		row.organization,
		' in antoher window." target="_blank">',
		value,
		'</a>'].join('');
};


/**
 * link formatter to se url link form same field value
 * value must be an URL without HTTPS prefix
 * 
 * @since      2020
 *
 * @param {value}   field value being evaluated
 * @param {row}     current row object being evaluated
 * @param {index}   integer index of current row being evaluated
 */
var LinkFormatter = function(value, row, index) {
    return [
	'<a href="http://',
	value,
	'" title="Open ',
	value,
	' in antoher window." target="_blank">',
	value,
	'</a>'].join('');
}


/**
 * Total Formater for being use at the bottom of the table 
 * bootstrap table total formatter option
 * Will return a string contactenating the length of rows
 * 
 * @since      2020
 *
 * @param {data}   the whole table data with current filters applied
 */
var TotalFormatter = function(data) {
    return 'Total: ' + data.length;
};


/**
 * Total formatter to get number of differents countries in the data
 * 
 * @since      2020
 *
 * @param {data}   the whole table data with current filters applied
 */
var CountriesFormatter = function(data) {
  var currentData = $("#datatable").bootstrapTable('getData');
  var countries_f = [];
  $.each(currentData, function(i,d) { 
	if(! countries_f.includes(d.country)) {
	  countries_f.push(d.country);
	}
  });	
    return countries_f.length + ' countries';
 };


/**
 * Total formatter to get the 3 most frequent categories along the number
 * of occurence next to each ones.
 * 
 * @since      2020
 *
 * @param {data}   the whole table data with current filters applied
 */

var CategoriesFormatter = function(data) {
    var currentData = $("#datatable").bootstrapTable('getData');
  var categories_f = [];
  $.each(currentData, function(i,d) { 
	if(! categories_f.includes(d.category)) {
	  categories_f.push(d.category);
	}
  });		
    var cata = {};
    $.each(currentData, function(i, record) { 
	   cata[record.category] = (cata[record.category] ? cata[record.category] + 1 : 1);
    });
    var text = categories_f.length + ' categories.';
    //https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
    var keysSorted = Object.keys(cata).sort(function(a,b){return cata[b]-cata[a]});
    i=0

    $.each(keysSorted, function(position, key) { 
    if (i > 2) {
	    return;
    }

    text += "<br />" + key.toString().trunc(18) + ": " + cata[key];
	    
    i++;
    });
    return text;
 };


/**
 * Description field table formatter to truncate of not the content using a global parameter.
 * 
 * @since      2020
 *
 * @param {value}   field value being evaluated
 * @param {row}     current row object being evaluated
 * @param {index}   integer index of current row being evaluated
 */

var descriptionFormatter  = function (value, row, index) {
	if (showDetails)
		return value;
	else
		return value.trunc(133);
};

/**
 * Detail formatter for description to replace new lines and return cariage to
 * actual lines jumps using html break tags
 * 
 * @since      2020
 *
 * @param {value}   field value being evaluated
 * @param {row}     current row object being evaluated
 * @param {index}   integer index of current row being evaluated
 */

var detailDescriptionFormatter  = function (value, row, index) {
	return row.description.replace(/(\r\n|\n|\r)/gm,"<br />");
};

/**
 * 
 * When document is ready. 
 * AJAX request to get CSV data from URL and calling the processData function upon receiving it.
 * @todo managing errors, etc.
 * 
 * @since      2020
 */
$(document).ready(function() {
  $.ajax({
        type: "GET",
        url: "https://idb-lab-test.maps.arcgis.com/sharing/rest/content/items/70776ec1e2574ab88f75aad69bdabda9/data",
        dataType: "text",
        success: function(data) {
          processData(data);
		  initCharts($('#datatable'));
		  refreshFilter();
        }
     });
});

/**
 * 
 * chartjs initialization binfing it to a datatable
 * 
 * 
 * @since      2020
 */
var initCharts = function(datatable) {
	eventName = 'post-body.bs.table';
	datatable.on(eventName, function (e, data) {
	  refreshGraphs();
	});
};

/**
 * 
 * Funtion that retrieve subtotals for fields occurence into a data fron a datatable
 *
 * @return a configuration object for labels and data ready to be use by chartjs
 * 
 * @todo ordering by count desc
 * 
 * @since      2020
 */
var getTotalsForAttribute = function(currentData, field) {
	var structure = {
		labels:[],
		datas:[{data:[]}]
	};
	$.each(currentData, function(i,d) { 
		var fieldValue = d[field];
		//console.log(fieldValue);
		var a = structure.labels.indexOf(fieldValue);
		if(a == -1) {
			structure.labels.push(fieldValue)
			structure.datas[0].data.push(1);
		} else {
			structure.datas[0].data[a] ++;
		}
	});
	return structure;
};


/**
 * 
 * Refresh charts js graph function
 * 
 * Will recompute the data if is this filtered and redraw/destroy graph
 * 
 * @todo make it clean by not using global vars but implementing a class singleton object 
 * 
 * @since      2020
 */
var chartCategories;
var chartCountries;
var refreshGraphs = function() {
	
	var currentData = $('#datatable').bootstrapTable("getData");
	
	var countries = getTotalsForAttribute(currentData, "country");

	var categories = getTotalsForAttribute(currentData, "category");
	
	if (chartCountries)
		chartCountries.destroy();
	
	if (chartCategories)
		chartCategories.destroy();
	
	chartCountries = new Chart("chartCanvas1", {
		type: 'bar',
		data: {
			labels: countries.labels,
			datasets: countries.datas
		},
		options: {
			plugins: {
				colorschemes: {
					scheme: 'brewer.Paired12'
				}
			},
			animation: {
			  duration: 1000,
			},
			legend: {
				display: false,
			},			
		}
	});

	chartCategories = new Chart("chartCanvas2", {
		type: 'bar',
		data: {
			labels: categories.labels,
			datasets: categories.datas
		},
		options: {
			plugins: {
				colorschemes: {
					scheme: 'brewer.Paired12'
				}
			},
			animation: {
			  duration: 1000,
			},
			legend: {
				display: false,
			},
		}
	});

};
