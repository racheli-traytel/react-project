import express from 'express';
import fs from 'fs';
import path from 'path';
import authMiddleware from '../middleware/authMiddleware.js';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../db/db.json');

// שליפת כל המתכונים
router.get('/', (req, res) => {
    const db = JSON.parse(fs.readFileSync(dbPath));
    res.json(db.recipes);
});

// הוספת מתכון (רק למשתמש מחובר)
router.post('/', authMiddleware, (req, res) => {
    const {
        title,
        description,
        products,
        ingredients,
        instructions
    } = req.body;
    const db = JSON.parse(fs.readFileSync(dbPath));

    const newRecipe = {
        id: Date.now(),
        title,
        products,
        description,
        authorId: req.header('user-id'),
        ingredients,
        instructions,
    };

    db.recipes.push(newRecipe);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.status(201).json({ message: "Recipe added", recipe: newRecipe });
});
router.delete('/', authMiddleware, (req, res) => {
    console.log('DELETE request received!'); // בדיקה ראשונית

    try {
        const id = parseInt(req.body.id);

        if (isNaN(id)) {
            console.log('Invalid recipe ID:', req.body.id); 
            return res.status(400).json({ message: "Invalid recipe ID" });
        }

        const db = JSON.parse(fs.readFileSync(dbPath));
        
        const recipe = db.recipes.find(recipe => recipe.id === id);
        if (!recipe) {
            console.log('Recipe not found:', id); 
            return res.status(404).json({ message: "Recipe not found" });
        }


        const userId = Number(req.header('user-id'));
        const authorId = Number(recipe.authorId);


        if (userId !== authorId) {
            console.log('Unauthorized access attempt:', userId, authorId); 
            return res.status(403).json({ message: "Unauthorized" });
        }

        db.recipes = db.recipes.filter(recipe => recipe.id !== id);

        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        res.json({ message: "Recipe deleted" });
    } catch (error) {
        console.error('Error during deletion:', error);
        res.status(500).json({ message: "Internal server error" });
    }
});
export default router;
