// const input = document.getElementById('inp');
// const addbtn = document.getElementsById('Add');
// const todoList = document.getElementById('ul');

// addbtn.addEventListner('click', () =>{
//   const tasktext = input.value.trim();

//   if (tasktext!== " ")
//   {
//     const li= document.createElement('li');

//     li.innerHTML = ` <span> ${tasktext} </span>`;
 

//     li.addEventListner('click', ()=>{
//       li.classList.toggle('Completed');
//     });

//     li.QuerySelector('.Clear').addEventListner('click', (e)=> {
//        e.stopPropagation(); // Prevents triggering the 'completed' toggle
//             li.remove();
//     });

//     todoList.appendChild(li);
//     input.value="";

//  }
// });

const input = document.getElementById('inp');
const addbtn = document.getElementById('Add'); // Fixed: getElementById (singular)
const todoList = document.getElementById('ul');

addbtn.addEventListener('click', () => { // Fixed: addEventListener
    const tasktext = input.value.trim();

    if (tasktext !== "") { // Check for empty string
        const li = document.createElement('li');

        // Added a delete button specifically for this task
        li.innerHTML = `
            <span>${tasktext}</span>
            <button class="delete-btn" style="margin-left: 10px;">Delete</button>
        `;

        // Toggle completed class
        li.addEventListener('click', () => {
            li.classList.toggle('Completed');
        });

        // Delete button logic inside the LI
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            li.remove();
        });

        todoList.appendChild(li);
        input.value = ""; // Clear input
    }
});

// Global Clear Button Logic (Clears the whole list)
document.querySelector('.Clear').addEventListener('click', () => {
    todoList.innerHTML = "";
});