"use strict"


const table = document.querySelector('.table');

async function fetchData() {
    const data = await fetch("https://substantive.pythonanywhere.com/");
    const resp = await data.json();
    const user = await resp.interactions;
    return user
};

fetchData()
    .then(resp => {
        console.log(resp)
        const obj = {};
        for(let i = 1; i <= 11; i++) {
            obj[i] = {
                active: resp.filter(obj => obj.sector_id === i + ''),
                percentages: Number((resp.filter(obj => obj.sector_id === i + '').length * 100 / resp.length).toFixed(1))
            }
        };
        return obj
    }).then(obj => {


        function createTd(context, nameClass) {
            const td = document.createElement('td');
            td.textContent = context;
            td.className = nameClass;
            
            return td
        };

        for (let i = 1; i <= 11; i++) {

            const tr = document.createElement('tr');
            tr.append(createTd(obj[i].active[1].name, "table__name"));
            tr.append(createTd(obj[i].active.length, "table__count"));
            tr.append(createTd(obj[i].percentages + ' %', "table__percentages"));

            table.append(tr)
        };


        let allAcive = 0;
        for(let i = 1; i <= 11; i++) allAcive += obj[i].active.length;

        const tr = document.createElement('tr');
        tr.append(createTd("Total:", "table__name"));
        tr.append(createTd(allAcive, "table__count"));
        tr.append(createTd('100 %', "table__percentages"));

        table.append(tr);





        const pie = document.getElementById('pie-chart');
        const bar = document.getElementById('bar-chart');

        let labelsActive = [];
        let percentagesActive = []
        for(let i = 1; i <= 11; i++) {
            labelsActive.push(`${obj[i].active[0].name} ${obj[i].percentages} %`);
            percentagesActive.push(obj[i].percentages);
            
        };


        new Chart(pie, {
            type: 'pie',
            data: {
            labels: labelsActive,
            datasets: [{
                label: `%`,
                data: percentagesActive,
                borderWidth: 1,
                backgroundColor: [
                    '#f917dd', 
                    '#ff18a1', 
                    '#ff7680', 
                    '#ffb67c', 
                    '#ffdc81', 
                    '#08abc5', 
                    '#07c570', 
                    '#a6ea51', 
                    '#fffa8e', 
                    '#fffad1', 
                    '#e98597', 
                ],
              hoverOffset: 4
            }]},
            
        });


        new Chart(bar, {
            type: 'bar',
            data: {
            labels: labelsActive,
            datasets: [{
                label: `%`,
                data: percentagesActive,
                borderWidth: 1,
                backgroundColor: [
                    '#f917dd', 
                    '#ff18a1', 
                    '#ff7680', 
                    '#ffb67c', 
                    '#ffdc81', 
                    '#08abc5', 
                    '#07c570', 
                    '#a6ea51', 
                    '#fffa8e', 
                    '#fffad1', 
                    '#e98597', 
                ],
              hoverOffset: 4
            }]},
            
        });

    });
;
