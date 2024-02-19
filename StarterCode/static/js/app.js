const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
//d3.json(url).then(response => console.log(response))

d3.json(url).then(function(data) {
    // Parsing the data into a variable that will be used to create our multiple graphs.
    var jsondata = data;
    // loading the data to take a peek at what's in our json file
    console.log(jsondata)
      
    // first I create an initializing function for the first id containing the 2 graphs and the Demograpich info
    // this function will then be copied and pasted then modified
    function init() {
        // BAR CHART
        let trace1 = [{
            // we use reverse to put the chart in descending order
            x: jsondata.samples[0].sample_values.slice(0,10).reverse(),
            y: jsondata.samples[0].otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            type : 'bar',
            // changing the orientation of the bar chart to horizontal
            orientation : 'h',
            // creating a hovertext
            text : jsondata.samples[0].otu_labels.slice(0,10).reverse(),
            }];
        // BUBBLE CHART
        let trace2 =[{
            x : jsondata.samples[0].otu_ids,
            y : jsondata.samples[0].sample_values,
            mode : 'markers',
            marker : {
                size : jsondata.samples[0].sample_values,
                color : jsondata.samples[0].otu_ids
            },
            text : jsondata.samples[0].otu_labels
            }];
       
        // Displaying the plot
        Plotly.newPlot('bar',trace1)
        Plotly.newPlot('bubble',trace2)

        //Displaying the Demographic info A.K.A metadata
        d3.select('#sample-metadata.card-body').append().html(`id : ${jsondata.metadata[0].id}<br>`)
        d3.select('#sample-metadata.card-body').append().html(`ethnicity : ${jsondata.metadata[0].ethnicity}<br>`)
        d3.select('#sample-metadata.card-body').append().html(`gender : ${jsondata.metadata[0].gender}<br>`)
        d3.select('#sample-metadata.card-body').append().html(`age : ${jsondata.metadata[0].age}<br>`)
        d3.select('#sample-metadata.card-body').append().html(`location : ${jsondata.metadata[0].location}<br>`)
        d3.select('#sample-metadata.card-body').append().html(`bbtype : ${jsondata.metadata[0].bbtype}<br>`)
        d3.select('#sample-metadata.card-body').append().html(`wfreq : ${jsondata.metadata[0].wfreq}<br>`)
    }
    init()
   // Before creating the event shifting function, I am creating a list with all the ids using a for loop
    var list = [];
    for (i=0;i<jsondata.names.length;i++){
        list.push(jsondata.names[i])
    }
    // The code starting with the below line is from ChatGPT. It was used to create option tags and values for the dropdown button
    // in the html file. It caused me to remove the orginal function onchange="optionChanged(this.value)" that was inside de select tag.
    
    // Select the <select> element with the dropdown menu
    var select = d3.select("#selDataset");

  // Bind data and create options tag for each id
    var options = select.selectAll("option").data(list).enter().append("option").text(function(d) { return d; });

  // Set values for the options
    options.attr("value", function(d) { return d; });
  // The ChatGPT code stops here

  // Now we can use a function that goes through our dropdown.
  
  function optionChanged(){
        // first we asign a variable to our dropdown values
        let dataset = d3.select("#selDataset").property('value');
        //  The way I'm using the function is that, since the index order in my list[] is the same as the one in the json file
        // we can find that index based on the selected value and then put it in my function which is working using indexes.
        if (dataset== this.value){
            index = list.indexOf(this.value)
            //console.log(index) 
            function modify() {
                // BAR CHART
                let trace1 = [{
                    // we use reverse to put the chart in descending order
                    x: jsondata.samples[index].sample_values.slice(0,10).reverse(),
                    y: jsondata.samples[index].otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
                    type : 'bar',
                    // changing the orientation of the bar chart to horizontal
                    orientation : 'h',
                    // creating a hovertext
                    text : jsondata.samples[index].otu_labels.slice(0,10).reverse(),
                    }];
                // BUBBLE CHART
                let trace2 =[{
                    x : jsondata.samples[index].otu_ids,
                    y : jsondata.samples[index].sample_values,
                    mode : 'markers',
                    marker : {
                        size : jsondata.samples[index].sample_values,
                        color : jsondata.samples[index].otu_ids
                    },
                    text : jsondata.samples[index].otu_labels
                    }];
                let layout =[{
                    autosize : true
                }]
               
                // Displaying the plot
                Plotly.newPlot('bar',trace1)
                Plotly.newPlot('bubble',trace2, layout)
        
                //Displaying the Demographic info A.K.A metadata
                d3.select('#sample-metadata.card-body').html(`id : ${jsondata.metadata[index].id}<br>`)
                d3.select('#sample-metadata.card-body').append().html(`ethnicity : ${jsondata.metadata[index].ethnicity}<br>`)
                d3.select('#sample-metadata.card-body').append().html(`gender : ${jsondata.metadata[index].gender}<br>`)
                d3.select('#sample-metadata.card-body').append().html(`age : ${jsondata.metadata[index].age}<br>`)
                d3.select('#sample-metadata.card-body').append().html(`location : ${jsondata.metadata[index].location}<br>`)
                d3.select('#sample-metadata.card-body').append().html(`bbtype : ${jsondata.metadata[index].bbtype}<br>`)
                d3.select('#sample-metadata.card-body').append().html(`wfreq : ${jsondata.metadata[index].wfreq}<br>`)
            }
            modify()
        }
    }
    d3.select('#selDataset').on("change", optionChanged)
})
