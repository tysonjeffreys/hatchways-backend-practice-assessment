const express = require('express')
const app = new express()
const fs = require('fs')
const { json } = require('stream/consumers')

let port = 4000
app.listen(port, () => {
    console.log('App listening')
})

app.use(express.json())

//PART 1

app.get('/recipes', (req, res) => {

    const recipeNames = [];
    const getRecipes = (recipes) => {
        for(let properties in recipes) {
            recipes[properties].forEach(function(entry) {
                console.log(recipes[properties])
                recipeNames.push(entry.name)
                
            })
            let json = JSON.stringify({'recipeNames':recipeNames}, null, 4)
            return json;
        }       
    }
    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.log('There was an issue reading the file', err);
            return;
        }
        try {
            const recipes = JSON.parse(data);
            res.end(getRecipes(recipes))
        } catch (err) {
            console.log('Error parsing JSON string', err);
        }
    })
})

//PART 2

app.get('/recipes/details/:id', (req, res) => {
    const getRecipe = (recipe, recipes) => {
        let json = ''
        for(let properties in recipes) {
            recipes[properties].forEach((entry) => {
                if(entry.name == recipe){
                    json = JSON.stringify({'details':entry.ingredients, 'numsteps':entry.instructions.length}, null, 4)
                    console.log(json)                    
                }
            })
        }
        return json;
    }

    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.log('There was an issue reading the file.', err);
            return;
        }
        try {
            const recipes = JSON.parse(data);
            res.end(getRecipe(req.params.id, recipes))
        }
        catch (err) {
            console.log('Error getting recipe', err);
        }
    })
})
