const selectElem = document.querySelector('#recipeSelect');
const title = document.querySelector('#title');
const cookTime = document.querySelector('#cookTime');
const ingredients = document.querySelector('#ingredients');
const instructions = document.querySelector('#instructions');
const image = document.querySelector('#image');
const divElem = document.querySelector('#recipeDetails');



async function getRecipes() {
    try {
        const r = await fetch('recipeAll.json');
        const t = await r.json();
        
        if (!r.ok) {
            throw new Error(`${r.status} - ${r.statusText}`);
        }
     
        t.forEach(recipe => {
            const optionElem = document.createElement('option');
            optionElem.textContent = recipe.name;
            optionElem.value = recipe.id;
            selectElem.append(optionElem);
        });

        selectElem.addEventListener('change', async elm => {
            if (!elm.target.value) {
                title.textContent = '';
                cookTime.textContent = '';
                ingredients.textContent = '';
                instructions.textContent = '';
                image.src = '';
                divElem.style.display = 'none';
                return;
            }

            const selectedRecipeObj = t.find((index) => {
                return index.id === elm.target.value;
            });
        
            const recipeResponse = await fetch(selectedRecipeObj.url);
            const recipeData = await recipeResponse.json();

            title.textContent = titleCase(recipeData.name);
            cookTime.textContent = recipeData.cookTime;
            ingredients.textContent = '';
            recipeData.ingredient.forEach(ing => {
                const listItem = document.createElement('li');
                listItem.textContent = titleCase(ing);
                ingredients.append(listItem);
            });
            instructions.textContent = recipeData.instructions;
            image.src = recipeData.imageURL;
            divElem.style.display = 'block';
        });
    } catch (e) {
    console.error(e);
    }
}

getRecipes();

function titleCase(str) {
  if (!str) return '';
  
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}