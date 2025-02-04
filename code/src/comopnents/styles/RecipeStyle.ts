const RecipeStyle={
 recipeStyle:{

        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        maxWidth: 600,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,

},
reciprTittleStyle:{
        margin: 1,
        width: '100%',
        textAlign: 'center',
        borderColor: '#3f51b5',
        color: '#3f51b5',
        '&:hover': {
            borderColor: '#1e3a8a',
            backgroundColor: '#e6f0ff',
        },
},
recipeBoxStyle:{
      backgroundColor: "rgba(255, 255, 255, 0.8)",
        position: 'fixed',
        top: 83,
        right: 0,
        width: '250px',
        height: 'calc(100vh - 80px)',
        padding: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto',
        zIndex:1,
 
}
};
export default RecipeStyle;