
const budgetInput = document.getElementById("budget")
const calculateSubmitBtn = document.querySelector("button[type='submit']")
const clearBtn = document.getElementById("clear")
const outputDiv = document.getElementById("output")
const allFsBtn = document.querySelectorAll("fieldset button")

allFsBtn.forEach(btn => { // addEventListener para cada inputBtn 
    btn.addEventListener("click", () =>{ 
        const parentFieldsetID = btn.closest("fieldset").id;
        addEntry(parentFieldsetID)
    })
})

calculateSubmitBtn.addEventListener("click", getCalories)
clearBtn.addEventListener("click", clearForm)


function addEntry(parentID) {
    const targetFieldset = document.querySelector(`#${parentID}`)
    const inputList = document.querySelectorAll(`#${parentID} input`)
    const inputNumber = inputList.length + 1

    if (parentID === "exercise" && inputNumber > 9){
        return alert("exercite menos")} 
    else if(parentID !== "exercise" && inputNumber> 9){
        return alert("coma menos")
    }

    const HTMLInputStr = `
        <label class="simple-txt">${inputNumber} Calories: 
        <input type="text"></label>`

targetFieldset.insertAdjacentHTML("beforeend",HTMLInputStr) 

    update_AddCleaner_AllInputs()

    
}

function update_AddCleaner_AllInputs(){                                  
    const allInputsList = document.querySelectorAll("input")
    allInputsList.forEach(input => { //em cada input...
        input.addEventListener("input", () => { //instalar eventListener 
            const cleanValue = input.value.replace(/[^0-9]/g, "");  //substituir caracteres
            input.value = cleanValue; // injetar caracteres limpos no valor do input
        })
    })
}


function getCalories (event){

    event.preventDefault();

    const budgetCalories = budgetInput.value;
    const allFsCaloriesInputs = document.querySelectorAll("fieldset input")
    const exercisesCaloriesInputs = document.querySelectorAll("#exercise input")
    const allFsCalories = calcCalories(allFsCaloriesInputs)
    const exercCalories = calcCalories(exercisesCaloriesInputs)
    const mealCalories = allFsCalories - exercCalories;
    
    const gainedCalories = mealCalories - exercCalories;
    const budgetGainedDiff = budgetCalories - gainedCalories;    

    const surplusOrDeficit = budgetGainedDiff < 0 ? "Surplus" : "Deficit";

    HTMLstrOutput = `
        <h2 class="${surplusOrDeficit.toLowerCase()}">${Math.abs(budgetGainedDiff)} ${surplusOrDeficit}</h2>
        <p>Calories gained: ${mealCalories}</p>
        <p>Calories burned: ${exercCalories}</p>`

    outputDiv.innerHTML = HTMLstrOutput;
    outputDiv.classList.add("hide")
}

function calcCalories (caloriesList){

    let caloriesSum = 0;

    for (const calorie of caloriesList){
        const cleanedCalories = calorie.value;
        caloriesSum += Number(cleanedCalories)
        
    }
return caloriesSum
}

function clearForm() {
    
   const elements = Array.from(document.querySelectorAll("#fieldset-container label"));
  
   for(const element of elements){
    element.outerHTML = "";
   }

   budgetInput.value = "";
   outputDiv.innerHTML = "";
   outputDiv.classList.add("hide")
}






// querySelectorAll()
// Array.from(querrySelctorAll())
// .classlist.add() | .remove() | .toggle()
// Math.abs()
// regex = //g | //i
// .insertAdjacenetHTML("beforeend",HTMLstr)
// prevent e.default()
// str.toLowerCase()
// Number(strNumbersFromInputs)
