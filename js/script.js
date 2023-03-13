var draw = false;

init();

/**
 * FUNCTIONS
 */

function init() {
  // initialize DataTables
  var table = $("#table").DataTable();
  // get table data
  var tableData = getTableData(table);
  // create Highcharts
  createHighcharts(tableData);
  // table events
  setTableEvents(table);
}

function getTableData(table) {
  var dataArray = [],
    countryArray = [],
    populationArray = [],
    densityArray = [];
  ageArray = [];

  // loop table rows
  table.rows({
    search: "applied"
  }).every(function() {
    var data = this.data();
    countryArray.push(data[0]);
    populationArray.push(parseInt(data[1].replace(/\,/g, "")));
    densityArray.push(parseInt(data[2].replace(/\,/g, "")));
    ageArray.push(parseInt(data[3].replace(/\,/g, "")));
  });

  // store all data in dataArray
  dataArray.push(countryArray, populationArray, densityArray, ageArray);

  return dataArray;
}

function createHighcharts(data) {
  Highcharts.setOptions({
    lang: {
      thousandsSep: ","
    }
  });



  Highcharts.chart("chart", {
    title: {
      text: "Data Chart"
    },

    subtitle: {
      text: "fsvfsvvs svsdv"
    },

    xAxis: [{
      categories: data[0],
      labels: {
        rotation: -45
      }
    }],



    yAxis: [{
        // first yaxis
        title: {
          text: "Population (2017)"
        }
      },


      {
        // secondary yaxis
        title: {
          text: "Density (P/Km²)"
        },

        min: 0,
        opposite: true
      }
    ],


    series: [{
        name: "Population (2017)",
        color: "#0071A7",
        type: "column",
        data: data[1],
        tooltip: {
          valueSuffix: " M"
        }
      },
      {
        name: "Med Age",
        color: "#68cc72",
        type: "spline",
        data: data[3]
        // ,
        // tooltip: {
        //   valueSuffix: " M"
        //  } 
      },

      {
        name: "Density (P/Km²)",
        color: "#FF404E",
        type: "spline",
        data: data[2],
        yAxis: 1
      }
    ],


    tooltip: {
      shared: true
    },

    legend: {
      backgroundColor: "#ececec",
      shadow: true
    },

    credits: {
      enabled: false
    },

    noData: {
      style: {
        fontSize: "16px"
      }
    }
  });

