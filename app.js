// Html elements
const inputTask = document.querySelector('#inputTask');
const list= document.querySelector('ul');
const btn = document.querySelector('#submitTask')
const info = document.querySelector('small');
const completedInfo = document.querySelector('p');

// Variable
let completedCounter = 0;

// Array objects with Todo tasks
const todoArray = [];

// Function to handle change status of Object
// Takes parameter completed (bool)
function changeStatus(inputTask, completed) {

  // find index, look in object and value on "name"
  let correctIndex = todoArray.map(t => t.name).indexOf(inputTask);

  // Change status of object to correct index
  todoArray[correctIndex].status = completed;
}

// Function
btn.addEventListener('click',function() {
  // Fetch input value
  const text = inputTask.value;

  // Check that input is not empty
  if(text.length == 0){
    info.innerText = 'Input can not be empty!';
    return;
  }
  else{
    info.innerText = '';
  }

    // Add todo to todoArray
    const todoObj = {name: text, status: false};
    todoArray.push(todoObj);

  // Create a new li-element in ul
  const item = document.createElement('li');
  list.appendChild(item);

  // span-element
  const itemLabel = document.createElement('span');
  itemLabel.innerText = text;
  item.appendChild(itemLabel);
  
  // Add trashcan icon to new span element
  const trashcan = document.createElement('span');
  trashcan.setAttribute('class', 'trashcan');
  trashcan.setAttribute('class', 'fa-solid fa-trash-can-arrow-up fa-lg');
  item.appendChild(trashcan);

  // Add listener to span and change completedCounter/ True-False
  itemLabel.addEventListener('click',function(){

    // Toggle completed/uncompleted task
    if (item.getAttribute('class') == 'completed'){
      item.setAttribute('class', '');

      // Change status of object to False
      let clickedText = item.firstChild.firstChild.textContent;
      changeStatus(clickedText, false);
      completedCounter--
    }

    else {
      item.setAttribute('class', 'completed');

      // Change status of object to True
      clickedText = item.firstChild.firstChild.textContent;
      changeStatus(clickedText, true);
      completedCounter++
    }

    completedInfo.innerText = `${completedCounter} completed`;

  })

/*  Add listener to span to delete item on click.
    With conditionals for editing total completed count.
 */
  trashcan.addEventListener('click', function () {
    if (item.getAttribute('class') == 'completed'){

      // Remove object from todoArray
      let removeText = item.firstChild.firstChild.textContent;
      let indexToRemove = todoArray.map(t => t.name).indexOf(removeText);
      todoArray.splice(indexToRemove, 1);
      
      item.remove();
      completedCounter--
    }
    else {

      // Remove Object from todoArray
      removeText = item.firstChild.firstChild.textContent;
      let indexToRemove = todoArray.map(t => t.name).indexOf(removeText);
      todoArray.splice(indexToRemove, 1);

      item.remove();
    }

    completedInfo.innerText = `${completedCounter} completed`;

  });

  //Empty input field
  inputTask.value = '';
})