// 1. Change button text to "Submit"
document.getElementById("myButton").textContent = "Submit";

// 2. Add one new div dynamically
document.getElementById("addDivBtn").addEventListener("click", function () {
    var newDiv = document.createElement("div");
    newDiv.className = "new-div";
    newDiv.textContent = "I am a new div!";
    document.getElementById("container").appendChild(newDiv);
});

// 3. Change page background color
document.getElementById("bgColorBtn").addEventListener("click", function () {
    document.body.style.backgroundColor = "lightgreen";
});
