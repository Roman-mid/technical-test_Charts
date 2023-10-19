"use strict"

import getRandomColor from "./modules/randomColor.mjs";
import createChart from "./modules/createChart.mjs";
import createRowTable from "./modules/createRowTable.mjs";
import fetchData from "./modules/fetchData.mjs";

const table = document.querySelector('.table');
const pie = document.getElementById('pie-chart');
const bar = document.getElementById('bar-chart');


// take data from API
fetchData("https://substantive.pythonanywhere.com/")
    .then(userActive => {
        // data processing and sorting by categories
        const selectorIds = userActive.map(obj => obj.sector_id); 
        const maxSelectorId = Math.max(...selectorIds); // max number of categories
        
        // creating object with sorted by categories
        const userActiveSortedByCategory = {};
        for(let i = 1; i <= maxSelectorId; i++) {
            const filteredActives = userActive.filter(obj => obj.sector_id == i);

            userActiveSortedByCategory[i] = {
                active: filteredActives,
                percent: Number((filteredActives.length * 100 / userActive.length).toFixed(1))
            };
        };
        
        return {userActiveSortedByCategory, maxSelectorId};
    }).then(obj => { 
        // creating a table with data
        const { userActiveSortedByCategory, maxSelectorId } = obj;
        let allActive = 0;

        for (let i = 1; i <= maxSelectorId; i++) {
            allActive += +userActiveSortedByCategory[i].active.length // quantity active actions

            // creating a row in the table
            createRowTable(
                userActiveSortedByCategory[i].active[1].name, 
                userActiveSortedByCategory[i].active.length, 
                userActiveSortedByCategory[i].percent, 
                table
            );
        };

        // filling the table 
        createRowTable("Total:", allActive, '100 %', table);
        return obj;
    
    }).then(obj => {
        // createing charts 
        const { userActiveSortedByCategory, maxSelectorId } = obj;
        const colors = [];
        let labelsActive = [];
        let percentActive = [];

        for (let i = 1; i <= maxSelectorId; i++) {

            const color = getRandomColor();
            if(!colors.includes(color)) {
                colors.push(color)
            };

            labelsActive.push(`${userActiveSortedByCategory[i].active[0].name} ${userActiveSortedByCategory[i].percent} %`);
            percentActive.push(userActiveSortedByCategory[i].percent);

        };
        
        createChart(pie, 'pie', labelsActive, percentActive, colors);
        createChart(bar, 'bar', labelsActive, percentActive, colors);
    });

;

