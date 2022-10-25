
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let textarea = document.getElementById("desc");
let theDate = document.getElementById("theDate");
let all_counter = document.getElementById("all_counter");
let completed_counter = document.getElementById("completed_counter");
let active_counter = document.getElementById("active_counter");
let deleteIndex;
let editItem;


form.addEventListener('submit',(e) => {
    e.preventDefault();
    formValidation();
})




//form validation
let formValidation = ()=> {
    if(textInput.value ===""){
        console.log("failure");
        alert("please enter value");
    }
    else{
        console.log("success");
        acceptData();

    }
};


//collecting datas
let data = {}
let dataArray =[]

let acceptData = ()=>{
    var data={
        textobj:textInput.value,
        descriptionobj:textarea.value,
        dateobj:theDate.value,
        checkstatus:"active"
    }
    dataArray.push(data)
    console.log(dataArray)
    all_counter.innerHTML++
    active_counter.innerHTML++
    localStorage.setItem("dataArray",JSON.stringify(dataArray))
    createTask();
};


//display on screen
let createTask = ()=>{
    let taskone = document.querySelector("#activeTasks")
    taskone.innerHTML = "";
    for(i=0;i<dataArray.length;i++){
        if(dataArray[i].checkstatus == "active"){
            taskone.innerHTML +=`
            <div class="task-1 d-flex align-items-center p-4 justify-content-between my-4">
                <div class="checkbox-title d-flex align-items-center gap-3 ">
                    <input class="checkBox form-check-input rounded-circle " type="checkbox" value="" id=${i} onclick="statusChecking(this.id)">
                    <div>
                        <span class="title-of-task m-0">${dataArray[i].textobj}  <img src="/images/Ellipse 1.png" alt=""></span><br>
                        <span class="descrip d-none">${dataArray[i].descriptionobj}</span>
                        <span class="date-time m-0 d-flex align-items-center gap-2 pt-2"><img src="/images/Vector (5).png" alt=""> By ${dataArray[i].dateobj}</span>
                    </div>
                </div>
                <span class="options d-flex gap-4">
                    <button data-bs-toggle="modal" data-bs-target="#editForm" data-bs-whatever="@mdo" class="delete-bttn" onclick = "editTask(${i})" style="border:none; ">
                        <img src="/images/Group 820.png" alt="">
                    </button>
                    <button class="delete-bttn" style="border:none;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "deleteTask(${i})">
                        <img src="/images/Vector (6).png" alt="">
                    </button>
                </span>
            </div>
            `;
        }
    }
    resetForm();
};

let createTaskCompleted = ()=>{
    let completedtaskContainer = document.querySelector("#completedtaskContainer")
    completedtaskContainer.innerHTML = "";
    active_counter.innerHTML--
    for(i=0;i<dataArray.length;i++){
        if(dataArray[i].checkstatus == "completed"){
            completedtaskContainer.innerHTML +=`
            <div class="task-1 d-flex align-items-center p-4 justify-content-between my-4">
                <div class="checkbox-title d-flex align-items-center gap-3 ">
                    <input class="checkBox form-check-input rounded-circle" type="checkbox" checked id=${i} onclick="statusChecking(this.id)">
                    <div>
                        <span class="title-of-task m-0">${dataArray[i].textobj}  <img src="/images/Ellipse 1 (1).png" alt=""></span><br>
                        <span class="descrip d-none">${dataArray[i].descriptionobj}</span>
                        <span class="date-time m-0 d-flex align-items-center gap-2 pt-2"><img src="/images/Vector (5).png" alt=""> By ${dataArray[i].dateobj}</span>
                    </div>
                </div>
                <span class="options d-flex gap-4">
                    <button data-bs-toggle="modal" data-bs-target="#editForm" data-bs-whatever="@mdo" class="delete-bttn" onclick = "editTask(${i})" style="border:none; ">
                        <img src="/images/Group 820.png" alt="">
                    </button>
                    <button class="delete-bttn" style="border:none;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "deleteTask(${i})">
                        <img src="/images/Vector (6).png" alt="">
                    </button>
                </span>
            </div>
            `;
        }
    }
    resetForm();
};



//delete funtion
function deleteTask(index){
    deleteIndex = index
};

function Delete(){
    dataArray.splice(deleteIndex,1)
    console.log(dataArray)
    all_counter.innerHTML--
    createTask()
    createTaskCompleted()
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
}


//clearing all completed tasks
function clearCompleted(){

}



//reseting Form
let resetForm = ()=>{
    textInput.value = "";
    textarea.value = "";
    theDate.value = "";
};



//display all only

function displyActive(){
    document.querySelector("#completedtaskContainer").style.display="none";
    document.querySelector(".cmTask").style.display="none";
    document.querySelector("#activeTasks").style.display="block";
    document.querySelector(".actTask").style.display="block";
}

function displayComplete(){
    document.querySelector("#activeTasks").style.display="none";
    document.querySelector(".actTask").style.display="none";
    document.querySelector("#completedtaskContainer").style.display="block";
    document.querySelector(".cmTask").style.display="block";
}

function displayALL(){
    document.querySelector("#completedtaskContainer").style.display="block";
    document.querySelector(".cmTask").style.display="block";
    document.querySelector("#activeTasks").style.display="block";
    document.querySelector(".actTask").style.display="block";
}

