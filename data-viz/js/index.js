const margin = {
    top: 80,
    right: 0,
    bottom: 5,
    left: 0
 };
 var t = 0

 var svg = d3.select("body").append("svg")
    .attr("width", 960)
    .attr("height", 600)
    
 var tickDuration = 500;

 var top_n = 10;
 var height = 600;
 var width = 960;
 var play_var = false;

 let barPadding = (height-(margin.bottom+margin.top))/(top_n*5);

 let title = svg.append('text')
    .attr('class', 'title')
    .attr('y', 24)
    .html('Brand Value of Brands over 15 Years');


 var tooltip = d3.select("body")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("position","absolute")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white")
 
 var play = d3.select("body")
    .append("div")
    .attr("class", "play")
    .attr("id","play_id")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white")
    .html("Play")

 
 

 var showTooltip = function(d) {
    tooltip
       .transition()
       .duration(200)
    tooltip
       .style("opacity", 1)
       .html("Value: "+d.value.value + "$m")
       .style("left", (d3.mouse(this)[0]) + "px")
       .style("top", (d3.mouse(this)[1]) + "px")
 }
 var moveTooltip = function(d) {
    tooltip
       .style("left", (d3.mouse(this)[0]) + "px")
       .style("top", (d3.mouse(this)[1]) + "px")
 }
 var hideTooltip = function(d) {
    tooltip
       .transition()
       .duration(200)
       .style("opacity", 0)
 }

 $(".play" ).mouseover(()=>{
    if (play_var){
       console.log("here")
       document.getElementById("play_id").style.backgroundColor = "red"
    }
    else{
       document.getElementById("play_id").style.backgroundColor = "green"
    }
    
 })


 $(".play" ).mouseleave(()=>{
    document.getElementById("play_id").style.backgroundColor = "black"
 })


 d3.csv('./static/data/bvals.csv').then(function(data) {

    let year = 2000;
    function getRandomColor() {
       var letters = '0123456789ABCDEF';
       var color = '#';
       for (var i = 0; i < 6; i++) {
       color += letters[Math.floor(Math.random() * 16)];
       }
       return color;
    }

    var grped=  d3.group(data, d=>parseFloat(d.year),e=>e.name);
    var sorted_data = Array.from(grped.keys())
                         .sort(function(a,b) { return b - a })
                         .reverse()
                         .map( (k)=>{return {key:k,value:grped.get(k)}});
    console.log(sorted_data)


    let final_map = new Map()
    let intermediate_map
    sorted_data.forEach(e => {
       intermediate_map = new Map()
       e.value.forEach(x=>{
          if (x[0].value=="NA"){
             x[0].value=0
          }
          intermediate_map[x[0].name]= {"value": parseInt(x[0].value),"colour": getRandomColor()};
       })
       final_map[e.key] = intermediate_map
    });

    console.log(Object.values(final_map[year]))

    console.log(d3.max(Object.values(final_map[year],d=>d.value)).value)
    let x = d3.scaleLinear()
             .domain([0, d3.max(Object.values(final_map[year],d=>d.value)).value])
             .range([margin.left, width-margin.right-65]);
             
    let y = d3.scaleLinear()
       .domain([top_n, 0])
       .range([height-margin.bottom, margin.top]);

    let xAxis = d3.axisTop()
       .scale(x)
       .ticks(width > 500 ? 5:2)
       .tickSize(-(height-margin.top-margin.bottom))
       .tickFormat(d => d3.format(',')(d));

    svg.append('g')
       .attr('class', 'axis xAxis')
       .attr('transform', `translate(0, ${margin.top})`)
       .call(xAxis)
       .selectAll('.tick line')
       .classed('origin', d => d == 0);

    let yearText= svg.append('text')
       .attr('class', 'yearText')
       .attr('x', width-margin.right)
       .attr('y', height-25)
       .style('text-anchor', 'end')
       .html(~~year)
    const raceFunc = function race(year){
       //console.log(year)
       data_year = final_map[year];
       if (typeof data_year === 'undefined'){
          year = year.toFixed(1)
          data_year = final_map[year];
       }
       var sorted_data_year = Object.keys(data_year)
                                     .sort(function(a,b) { return data_year[b] - data_year[a] })
                                     .map( (k)=>{return {key:k,value:data_year[k]}});
       x.domain([0, d3.max(Object.values(data_year,d=>d.value)).value])
       let count =1;
       sorted_data_year.forEach(element => {
          element.value.rank = count;
          count ++;
       });

       svg.select(".xAxis")                
          .transition()
          .duration(tickDuration / 1.2)
          .ease(d3.easeLinear)
          .call(xAxis)

       svg.selectAll("rect")
          .data(sorted_data_year,d=>d.key)
          .enter()
          .append('rect')
          .attr('class', d=> 'bar-'+d.key)
          .attr('x', x(0))
          .attr('y', d => y(top_n+1)+5)
          .attr('width', d => x(d.value.value)-x(0))
          .attr('height', y(1)-y(0)-barPadding)
          .style('fill', d => d.value.colour)
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('y', d => y(d.value.rank)+5)

       svg.selectAll('text.label')
          .data(sorted_data_year, d => d.key)
          .enter()
          .append('text')
          .attr('class', 'label')
          .attr('x', d => x(d.value.value)-8)
          .attr('y', d => y(top_n+1)+5+((y(1)-y(0))/2))
          .style('text-anchor', 'end')
          .html(d => d.key)    
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('y', d => y(d.value.rank)+5+((y(1)-y(0))/2)+1);

       svg.selectAll("text.label")
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('x', d=>x(d.value.value)-8)
          .attr('y', d =>y(d.value.rank)+5+((y(1)-y(0))/2)+1)


       svg.selectAll("rect")
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('width', d => x(d.value.value)-x(0))
          .attr('y', d => y(d.value.rank)+5);

       d3.selectAll("rect")
         .on("mouseover", showTooltip )
         .on("mousemove", moveTooltip )
         .on("mouseleave", hideTooltip )
       
       d3.selectAll("text.label")
         .on("mouseover", showTooltip )
         .on("mousemove", moveTooltip )
         .on("mouseleave", hideTooltip )

       yearText.html(~~year)

    }

    var play_interval
    $( ".play" ).click(function() {
       console.log("in")
       if (play_var){
          play_var= false;
          document.getElementById("play_id").innerHTML="Play"
          window.clearInterval(play_interval)
          console.log("ture")
       }
       else{
          document.getElementById("play_id").innerHTML="Pause"
          play_interval = setInterval(()=>{
             if (t<=15){
                raceFunc(year+t)
                t+=0.1
             }
             else{
                play_var= false;
                document.getElementById("play_id").innerHTML="Finished"
                window.clearInterval(play_interval)
             }
          },100)
          play_var= true;
          console.log("false")
       }
    });
 });