function save() {
    const taskBox = document.getElementById("task");
    const dateBox = document.getElementById("date");
    const timeBox = document.getElementById("time");

    const task = taskBox.value;
    const date = dateBox.value;
    const time = timeBox.value;

    isValid (task,date);
    if (isValid(task,date)) {
        
    const tasks = {
        taskBox: task,
        dateBox: date,
        timeBox: time
    };

    const currentJsonArray = localStorage.getItem("allTasks");
    let arr = JSON.parse(currentJsonArray);
    if (arr === null) { 
        arr = []; 
    }
    arr.push(tasks);

    const newJsonArray = JSON.stringify(arr);
    localStorage.setItem("allTasks", newJsonArray);

    loadTasks ();
    }
}

function isValid (task,date) {
    const taskErr = document.getElementById("taskError");
    const dateErr = document.getElementById("dateError");
    if (task == "") {
        taskErr.innerHTML="Error! you need to add a task!";
        return false;
    }
    if (date == "") {
        dateErr.innerHTML="Error! you need to add a date!";
        return false;
    }
    let CurrentDate = new Date ();
    let givenDate = new Date (date);
    if (givenDate < CurrentDate){
        dateErr.innerHTML="Error! the date need to be after today!";
        return false;
    }
    return true
}

function loadTasks() {
    const currentJsonArray = localStorage.getItem("allTasks");
    const arr = JSON.parse(currentJsonArray);

    if (arr === null) {
        return;
    }

    let img = ``;
    let index = 0;
    for (const tasks of arr) {
    img += `<div class="d-flex justify-content-center container2" id="${index}">
                 <div class="task"><button class="glyphicon glyphicon-remove-sign del" onclick="cleanTask(${index})"></button>${tasks.taskBox}</div>
                 <div class="timing">${tasks.dateBox} ${tasks.timeBox}</div>
                 </div>`
                 index ++;
    }
    img += `</div>`; 

    const container2 = document.getElementById("tasksList");
    container2.innerHTML = img;
}

function cleanTask(index) {
    const currentJsonArray = localStorage.getItem("allTasks");
    const arr = JSON.parse(currentJsonArray);
    arr.splice (index,1);
    
    const newJsonArray = JSON.stringify(arr);
    localStorage.setItem("allTasks", newJsonArray);
    let x = document.getElementById(index).innerHTML;
    document.getElementById(index).innerHTML = x;
    window.location.reload();
}
