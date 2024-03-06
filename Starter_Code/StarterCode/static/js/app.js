
//Module 14 Starter code calling the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// function
function init() {

    // dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // JSON
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        
        let names = data.names;

        names.forEach((name) => {
            
            dropdownMenu.append("option").text(name).property("value", name);
        });

        let name = names[0];

        // demographic bar_chart bubble_chart
        demographic(name);
        bar(name);
        bubble(name);
    });
}

// DEMOGRAPHIC
function demographic(selectedValue) {
    // JSON 
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        
        let metadata = data.metadata;
        
        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
    
        let obj = filteredData[0]
        
      
        d3.select("#sample-metadata").html("");
  
    
        let entries = Object.entries(obj);
        
       
        entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });


        console.log(entries);
    });
  }
  

// bar chart - with a purple bars
function bar(selectedValue) {
    //JSON
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

       
        let samples = data.samples;

        let filteredData = samples.filter((sample) => sample.id === selectedValue);

        let obj = filteredData[0];
        
        let trace = [{
            // Slice 
            x: obj.sample_values.slice(0,10).reverse(),
            y: obj.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: obj.otu_labels.slice(0,10).reverse(),
            type: "bar",
            marker: {
                color: "rgb(128,0,128)"
            },
            orientation: "h"
        }];
        
        //  Plotly 
        Plotly.newPlot("bar", trace);
    });
}
  
// bubble chart
function bubble(selectedValue) {
    // JSON 
    d3.json(url).then((data) => {

       
        let samples = data.samples;
    
        let filteredData = samples.filter((sample) => sample.id === selectedValue);
    
        let obj = filteredData[0];
      
        let trace = [{
            x: obj.otu_ids,
            y: obj.sample_values,
            text: obj.otu_labels,
            mode: "markers",
            marker: {
                size: obj.sample_values,
                color: obj.otu_ids,
                colorscale: "Viridis"
            }
        }];
    
        let layout = {
            xaxis: {title: "OTU ID"}
        };
    
        Plotly.newPlot("bubble", trace, layout);
    });
}



// Toggle 
function optionChanged(selectedValue) {
    demographic(selectedValue);
    bar(selectedValue);
    bubble(selectedValue)
}

init();