const loadFood = (event)=>{

        const searchTxt = document.getElementById('searchInput').value.trim();
        console.log(searchTxt);

        // fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTxt}`)
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTxt}`)
        .then((res) => res.json())
        .then((data) =>{
            console.log(data);
            
            if(data.meals){
                console.log(data.meals);

                displayFood(data.meals);
            }
            else{
                const foodContainer = document.getElementById("food-container");
                foodContainer.innerHTML = "";
                const div = document.createElement("div");
                div.classList.add("meal-alert");
                
                div.innerHTML = "<h3>No meals found!</h3>";
                
                foodContainer.appendChild(div);

            }
        })
        .catch((err)=>console.log("Error: ",err));
    }


    const displayFood = (meals)=>{

        const foodContainer = document.getElementById("food-container");
        foodContainer.innerHTML = "";

        meals.forEach(meal => {

            console.log(meal.strMealThumb);

            const div = document.createElement("div");
            div.classList.add("food-card");
            div.onclick = ()=> showMealDetails(meal);            //add a flag here
            

            div.innerHTML=`
                <img class="card-img" src="${meal.strMealThumb}" alt="food picture"/>
                <h4>${meal.strMeal.slice(0,20)}</h4>
                
                
                `;
                foodContainer.appendChild(div);
                
            });
        }
        
        
    const showMealDetails = (meal)=>{
        const foodDetails = document.getElementById("food-details");
        foodDetails.innerHTML = "";
        
        
        const div = document.createElement("div");
        div.classList.add("card-details");
        
        let data=`
            <img class="card-img" src="${meal.strMealThumb}" alt="food picture"/>
            <h4>${meal.strMeal.slice(0,20)}</h4>
            <h4>Ingredients</h4>
            <ul type="disc">
        `;

        // for(let i = 1; i<= 8 ; i++){
        //     data += `<li>meal.strIngredient${i}</li>`
        // }
        for(let i = 1; i <= 8; i++){
            const ingredient = meal[`strIngredient${i}`];
            if (ingredient && ingredient.trim() !== "") {
                data += `<li>${ingredient}</li>`;
            }
        }




        data += "</ul>";

        div.innerHTML = data;


        foodDetails.appendChild(div);
    }



