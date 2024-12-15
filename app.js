//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector('.adding__task-input');//Add a new task.
var addButton=document.querySelector('.adding__add-button');//first button
var incompleteTaskHolder=document.querySelector('.todo__tasks');//ul of #tasks
var completedTasksHolder=document.querySelector('.completed__tasks');//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("span");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    label.innerText=taskString;
    label.className='todo__task-title';

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className="todo__toggle";
    editInput.type="text";
    editInput.className="todo__task-input";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="todo__edit-button";

    deleteButton.className="todo__delete-button";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.alt = 'Remove';
    deleteButtonImg.className = "todo__remove-image";
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.className = 'todo__row';
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted, 'todo');

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(blockName = 'todo'){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem=this.parentNode;

    var editInput=listItem.querySelector(`.${blockName}__task-input`);
    var label=listItem.querySelector(`.${blockName}__task-title`);
    var editBtn=listItem.querySelector(`.${blockName}__edit-button`);
    var containsClass=listItem.classList.contains(`${blockName}__row_edit-mode`);
    //If class of the parent is .edit-mode
    if(containsClass){
        //switch to .edit-mode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .edit-mode on the parent.
    listItem.classList.toggle(`${blockName}__row_edit-mode`);
    editInput.classList.toggle(`${blockName}__task-input_edit-mode`);
    label.classList.toggle(`${blockName}__task-title_edit-mode`);
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    const blockName = 'todo';
    const newBlockName = 'completed';
    toggleItemsIntoBlock(listItem, blockName, newBlockName);
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete, newBlockName);

}

var toggleItemsIntoBlock = function(listItem, blockName, newBlockName) {
  var editInput=listItem.querySelector(`.${blockName}__task-input`);
  var label=listItem.querySelector(`.${blockName}__task-title`);
  var editBtn=listItem.querySelector(`.${blockName}__edit-button`);
  var deleteBtn=listItem.querySelector(`.${blockName}__delete-button`);
  var deleteButtonImg=listItem.querySelector(`.${blockName}__remove-image`);
  var checkBox=listItem.querySelector(`.${blockName}__toggle`);
  var containsClass=listItem.classList.contains(`${blockName}__row_edit-mode`);
  if (containsClass) {
    listItem.classList.toggle(`${blockName}__row_edit-mode`);
    editInput.classList.toggle(`${blockName}__task-input_edit-mode`);
    label.classList.toggle(`${blockName}__task-title_edit-mode`);

    listItem.classList.toggle(`${newBlockName}__row_edit-mode`);
    editInput.classList.toggle(`${newBlockName}__task-input_edit-mode`);
    label.classList.toggle(`${newBlockName}__task-title_edit-mode`);
  }
  listItem.classList.toggle(`${blockName}__row`);
  editInput.classList.toggle(`${blockName}__task-input`);
  label.classList.toggle(`${blockName}__task-title`);
  editBtn.classList.toggle(`${blockName}__edit-button`);
  deleteBtn.classList.toggle(`${blockName}__delete-button`);
  checkBox.classList.toggle(`${blockName}__toggle`);
  deleteButtonImg.classList.toggle(`${blockName}__remove-image`);
  listItem.classList.toggle(`${newBlockName}__row`);
  editInput.classList.toggle(`${newBlockName}__task-input`);
  label.classList.toggle(`${newBlockName}__task-title`);
  editBtn.classList.toggle(`${newBlockName}__edit-button`);
  deleteBtn.classList.toggle(`${newBlockName}__delete-button`);
  checkBox.classList.toggle(`${newBlockName}__toggle`);
  deleteButtonImg.classList.toggle(`${newBlockName}__remove-image`);
}

var taskIncomplete=function(){
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #tasks.
  var listItem=this.parentNode;
  const blockName = 'completed';
  const newBlockName = 'todo';
  toggleItemsIntoBlock(listItem, blockName, newBlockName);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted, newBlockName);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.removeEventListener("click",addTask);
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler,blockName){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(`.${blockName}__toggle`);
    var editButton=taskListItem.querySelector(`.${blockName}__edit-button`);
    var deleteButton=taskListItem.querySelector(`.${blockName}__delete-button`);


    //Bind editTask to edit button.
    editButton.onclick=editTask.bind(editButton, blockName);
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted, 'todo');
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete, 'completed');
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.