
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let textarea = document.getElementById("desc");
let theDate = document.getElementById("theDate");
let all_counter = document.getElementById("all_counter");
let completed_counter = document.getElementById("completed_counter");
let active_counter = document.getElementById("active_counter");
let deleteIndex;
let editItem;
let filteredArray = []
form.addEventListener('submit',(e) => {
    e.preventDefault();
    formValidation();
})


//form validation
function formValidation() {
    if(textInput.value ===""){
        console.log("failure");
        alert("please enter Title");
    }
    else{
        console.log("success");
        acceptData();
    }
};


//collecting datas
let data = {}
let dataArray =[]
dataArray = JSON.parse(localStorage.getItem("TodoArray")) || []
function acceptData(){
    var data={
        textobj:textInput.value,
        descriptionobj:textarea.value,
        dateobj:theDate.value,
        checkstatus:"active"
    }
    dataArray.push(data)
    console.log(dataArray)
    localStorage.setItem("TodoArray",JSON.stringify(dataArray))
    createTask();
};


//display on screen
function createTask(){
    let taskone = document.querySelector("#activeTasks")
    taskone.innerHTML = "";
    for(i=0;i<dataArray.length;i++){
        if(dataArray[i].checkstatus == "active"){
            taskone.innerHTML +=`
            <div class="task-1 d-flex align-items-center p-4 justify-content-between my-4">
                <div class="checkbox-title d-flex align-items-center gap-3 ">
                    <input class="checkBox form-check-input rounded-circle " type="checkbox" value="" id=${i} onclick="statusChecking(this.id)">
                    <div>
                        <span class="title-of-task m-0">${dataArray[i].textobj}  <img src="images/Ellipse 1.png" alt=""></span><br>
                        <span class="descrip d-none">${dataArray[i].descriptionobj}</span>
                        <span class="date-time m-0 d-flex align-items-center gap-2 pt-2"><img src="images/Vector (5).png" alt=""> By ${dataArray[i].dateobj}</span>
                    </div>
                </div>
                <span class="options d-flex gap-4">
                    <button data-bs-toggle="modal" data-bs-target="#editForm" data-bs-whatever="@mdo" class="delete-bttn" onclick = "editTask(${i})" style="border:none; ">
                        <img src="images/Group 820.png" alt="">
                    </button>
                    <button class="delete-bttn" style="border:none;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "deleteTask(${i})">
                        <img src="images/Vector (6).png" alt="">
                    </button>
                </span>
            </div>
            `;
        }
    }
    resetForm();
    counting() 
};

function createTaskCompleted(){
    let completedtaskContainer = document.querySelector("#completedtaskContainer")
    completedtaskContainer.innerHTML = "";
    for(i=0;i<dataArray.length;i++){
        if(dataArray[i].checkstatus == "completed"){
            completedtaskContainer.innerHTML +=`
            <div class="task-1 d-flex align-items-center p-4 justify-content-between my-4">
                <div class="checkbox-title d-flex align-items-center gap-3 ">
                    <input class="checkBox form-check-input rounded-circle" type="checkbox" checked id=${i} onclick="statusChecking(this.id)">
                    <div>
                        <span class="title-of-task m-0">${dataArray[i].textobj}  <img src="images/Ellipse 1 (1).png" alt=""></span><br>
                        <span class="descrip d-none">${dataArray[i].descriptionobj}</span>
                        <span class="date-time m-0 d-flex align-items-center gap-2 pt-2"><img src="images/Vector (5).png" alt=""> By ${dataArray[i].dateobj}</span>
                    </div>
                </div>
                <span class="options d-flex gap-4">
                    <button data-bs-toggle="modal" data-bs-target="#editForm" data-bs-whatever="@mdo" class="delete-bttn" onclick = "editTask(${i})" style="border:none; ">
                        <img src="images/Group 820.png" alt="">
                    </button>
                    <button class="delete-bttn" style="border:none;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "deleteTask(${i})">
                        <img src="images/Vector (6).png" alt="">
                    </button>
                </span>
            </div>
            `;
        }
    }
    counting()
    resetForm();
};


//delete funtion
function deleteTask(index){
    deleteIndex = index
};

function Delete(){
    dataArray.splice(deleteIndex,1)
    console.log(dataArray)
    createTask()
    createTaskCompleted()
    localStorage.setItem("TodoArray",JSON.stringify(dataArray))
    counting()
}


//edit
function editTask(editIndex){
    editItem=editIndex
    document.querySelector("#editTextInput").value=dataArray[editIndex].textobj;
    document.querySelector("#editDesc").value=dataArray[editIndex].descriptionobj;
    document.querySelector("#editTheDate").value=dataArray[editIndex].dateobj;
}

function Edit(){
    dataArray[editItem].textobj = document.getElementById("editTextInput").value;
    dataArray[editItem].descriptionobj = document.getElementById("editDesc").value;
    dataArray[editItem].dateobj = document.getElementById("editTheDate").value;
    createTask()
    createTaskCompleted()
    localStorage.setItem("TodoArray",JSON.stringify(dataArray))
}


// sorting
document.querySelector(".form-select").addEventListener("change",function(){
    if(this.value == 2){
        sortByTitle();
        createTask();
    }
    else if(this.value ==3){
        sortByDate();
        createTask();
    }
})

// using title
function sortByTitle(){
    dataArray.sort(function(a,b){
        if(a.textobj.toLowerCase() < b.textobj.toLowerCase()){
            return-1;
        }
        
        if(a.textobj.toLowerCase() > b.textobj.toLowerCase()){
            return 1;
        }
        return 0;
    })
    localStorage.setItem("TodoArray",JSON.stringify(dataArray))
};

//sort using date
function sortByDate(){
    dataArray.sort((x, y) => {
        if( x.dateobj < y.dateobj){
            return -1;
        }
        if(x.dateobj > y.dateobj){
            return 0;
        }
        return 0;
    });
    localStorage.setItem("TodoArray",JSON.stringify(dataArray))
};


//status checking
function statusChecking(indexofcheck){
    var checkIndex = document.getElementById(indexofcheck);
    if(checkIndex.checked == true){
        dataArray[indexofcheck].checkstatus = "completed"
    }
    else{
        dataArray[indexofcheck].checkstatus = "active"
    }
    createTask()
    createTaskCompleted()  
    counting()
}


//clearing all completed tasks
function clearCompletedTask(){
    for(j=0; j<dataArray.length;j++){
        if(dataArray[j].checkstatus == "completed"){
            dataArray.splice(j,1)
            j--
        }
        createTask()
        createTaskCompleted()  
        console.log(dataArray)
    }
    localStorage.setItem("TodoArray",JSON.stringify(dataArray))
    console.log("clearCompletedTask")
}



//reseting Form
function resetForm(){
    textInput.value = "";
    textarea.value = "";
    theDate.value = "";
};


//display active only
function displyActive(){
    document.querySelector("#completedtaskContainer").style.display="none";
    document.querySelector(".cmTask").style.display="none";
    document.querySelector("#activeTasks").style.display="block";
    document.querySelector(".actTask").style.display="block";
}

//display complete only
function displayComplete(){
    document.querySelector("#activeTasks").style.display="none";
    document.querySelector(".actTask").style.display="none";
    document.querySelector("#completedtaskContainer").style.display="block";
    document.querySelector(".cmTask").style.display="block";
}

//display all only
function displayALL(){
    document.querySelector("#completedtaskContainer").style.display="block";
    document.querySelector(".cmTask").style.display="block";
    document.querySelector("#activeTasks").style.display="block";
    document.querySelector(".actTask").style.display="block";
}

//counters
function counting() {
    all_counter.innerHTML = "0"
    active_counter.innerHTML = "0"
    completed_counter.innerHTML = "0"
    for(i=0; i<dataArray.length; i++) {
        all_counter.innerHTML++;
        if(dataArray[i].checkstatus == "active") {
            active_counter.innerHTML++;
        }
        if(dataArray[i].checkstatus == "completed") {
            completed_counter.innerHTML++;
        }
    }
}



// for searching
function searchTask(){
    let searchInput = document.getElementById("exampleDataList").value;
    console.log(searchInput)
 
    result = dataArray.filter(function(x,index) {
    ind = (x.textobj.toLowerCase().includes(searchInput))
    if(ind){
        filteredArray.push(index)
    }
    })
 
    document.querySelector('#activeTasks').innerHTML = ""
    document.querySelector('#completedtaskContainer').innerHTML = ""
    for(i=0;i<filteredArray.length;i++){
    activeSearch()
    completedSearch()
      
    }
    filteredArray = []
 
}

//searched active 
function activeSearch(){ 
     if(dataArray[filteredArray[i]].checkstatus == "active"){
        document.querySelector('#activeTasks').innerHTML += `
            <div class="task-1 d-flex align-items-center p-4 justify-content-between my-4">
                <div class="checkbox-title d-flex align-items-center gap-3 ">
                    <input class="checkBox form-check-input rounded-circle " type="checkbox" value="" id=${filteredArray[i]} onclick="statusChecking(this.id)">
                    <div>
                        <span class="title-of-task m-0">${dataArray[filteredArray[i]].textobj}  <img src="/images/Ellipse 1.png" alt=""></span><br>
                        <span class="descrip d-none">${dataArray[filteredArray[i]].descriptionobj}</span>
                        <span class="date-time m-0 d-flex align-items-center gap-2 pt-2"><img src="/images/Vector (5).png" alt=""> By ${dataArray[filteredArray[i]].dateobj}</span>
                    </div>
                </div>
                <span class="options d-flex gap-4">
                    <button data-bs-toggle="modal" data-bs-target="#editForm" data-bs-whatever="@mdo" class="delete-bttn" onclick = "editTask(${filteredArray[i]})" style="border:none; ">
                        <img src="/images/Group 820.png" alt="">
                    </button>
                    <button class="delete-bttn" style="border:none;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "deleteTask(${filteredArray[i]})">
                        <img src="/images/Vector (6).png" alt="">
                    </button>
                </span>
            </div>`
        }
}
 
//searched completed
function completedSearch(){
    if(dataArray[filteredArray[i]].checkstatus == "completed"){
        document.querySelector('#completedtaskContainer').innerHTML += `

            <div class="task-1 d-flex align-items-center p-4 justify-content-between my-4">
                <div class="checkbox-title d-flex align-items-center gap-3 ">
                    <input class="checkBox form-check-input rounded-circle" type="checkbox" checked id=${filteredArray[i]} onclick="statusChecking(this.id)">
                    <div>
                        <span class="title-of-task m-0">${dataArray[filteredArray[i]].textobj}  <img src="/images/Ellipse 1 (1).png" alt=""></span><br>
                        <span class="descrip d-none">${dataArray[filteredArray[i]].descriptionobj}</span>
                        <span class="date-time m-0 d-flex align-items-center gap-2 pt-2"><img src="/images/Vector (5).png" alt=""> By ${dataArray[filteredArray[i]].dateobj}</span>
                    </div>
                </div>
                <span class="options d-flex gap-4">
                    <button data-bs-toggle="modal" data-bs-target="#editForm" data-bs-whatever="@mdo" class="delete-bttn" onclick = "editTask(${filteredArray[i]})" style="border:none; ">
                        <img src="/images/Group 820.png" alt="">
                    </button>
                    <button class="delete-bttn" style="border:none;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "deleteTask(${filteredArray[i]})">
                        <img src="/images/Vector (6).png" alt="">
                    </button>
                </span>
            </div>
         `
    }
}

counting()
createTask()
createTaskCompleted()
