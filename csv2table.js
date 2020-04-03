var csv;

var countries = [];
var categories = [];
var sources = [];
var showDetails = false;


String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
      };
var processData=function(data) {
  csv = $.csv.toObjects(data);
	
	
  
  $('#datatable').bootstrapTable({
      pagination: true,
      search: true,
      pagination: true,
      toolbar: "#toolbar-table",
      showExport: true,
      exportDataType: "all",
      //showToggle: true,
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
        //cardVisible: true,
        width: '40',
        widthUnit: '%',
        //visible: true,
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
  	//console.log(d);
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

	refreshFilter();
	
};

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
	//console.log(filters);
};

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

var TotalFormatter = function(data) {
    return 'Total: ' + data.length;
};

var CountriesFormatter = function(data) {
  var currentData = $("#datatable").bootstrapTable('getData');
  var countries_f = [];
  $.each(currentData, function(i,d) { 
  	//console.log(d);
	if(! countries_f.includes(d.country)) {
	  countries_f.push(d.country);
	}
  });	
    return countries_f.length + ' countries';
 };

var CategoriesFormatter = function(data) {
    var currentData = $("#datatable").bootstrapTable('getData');
  var categories_f = [];
  $.each(currentData, function(i,d) { 
  	//console.log(d);
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
    /*$.each(cata, function(i, nb) { 
	    text += (text ? "<br />": "") + i.trunc(28) + ": " + nb;
    });*/
    i=0
	//console.log(keysSorted);
    $.each(keysSorted, function(position, key) { 
    if (i > 2) {
	    return;
    }
	    //console.log(key);
    text += "<br />" + key.toString().trunc(18) + ": " + cata[key];
	    
    i++;
    });
    return text;
 };

var descriptionFormatter  = function (value, row, index) {
	if (showDetails)
		return value;
	else
		return value.trunc(133);
};

var detailDescriptionFormatter  = function (value, row, index) {
	return row.description.replace(/(\r\n|\n|\r)/gm,"<br />");
};

$(document).ready(function() {
  $.ajax({
        type: "GET",
        url: "https://idb-lab-test.maps.arcgis.com/sharing/rest/content/items/70776ec1e2574ab88f75aad69bdabda9/data",
        dataType: "text",
        success: function(data) {
          processData(data);
        }
     });
});
