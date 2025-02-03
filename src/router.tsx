import { createBrowserRouter } from 'react-router'
import AppLayot from './comopnents/appLayot'
import Update from './comopnents/Update'
import RecipesList from './comopnents/recipes/recipesList'
import Home from './comopnents/home'
import ShowRecipe from './comopnents/recipes/Show-recipe'


export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayot></AppLayot>,
    children: [
      { path: 'update', element: <Update></Update> },
      { path: "recipes", element: <RecipesList />,
        children:[{path:":id",element:<ShowRecipe></ShowRecipe>}]
       },
      { path: "home", element: <Home/> },
      { index:true, element: <Home/> },

    ]
  }
])