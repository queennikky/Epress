const meals = require("../models/meals");
// get all meals get
const getAllMeals = (req, res) => {
  res.status(200).json({ numOfMeals: meals.length, meals });
};

//get a meal get
const getAMeal = (req, res) => {
  //req.params 1 4 25
  // console.log(req.params.mealId);
  const { mealId } = req.params;
  const meal = meals.find((meal) => meal.id === parseInt(mealId));
  if (!meal) {
    return res.status(404).json({
      message: `Meal with the id ${mealId} not found`,
      success: false,
    });
  }
  res.status(200).json({ success: true, meal });
};

//create post
const createMeal = (req, res) => {
  //req.body
  // console.log(req.body);
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Please Provide a meal name" });
  }
  const newMeal = { id: 7, name };
  res.status(201).json({ success: true, meals: [...meals, newMeal] });
};

//update patch
const updateMeal = (req, res) => {
  const { mealId } = req.params;
  const { name } = req.body;

  const meal = meals.find((meal) => meal.id === Number(mealId));
  if (!meal) {
    return res
      .status(404)
      .json({ message: `meal with the id ${mealId} not found` });
  }
  if (!name) {
    return res.status(400).json({ message: "Please provide a new meal name" });
  }
  const mealToBeUpdated = meals.map((meal) => {
    if (meal.id === Number(mealId)) {
      meal.name = name;
    }
    return meal;
  });
  return res.status(200).json({ success: true, meals: mealToBeUpdated });
};

//delte delte
const deleteMeal = (req, res) => {
  const { mealId } = req.params;

  const meal = meals.find((meal) => meal.id === Number(mealId));
  if (!meal) {
    return res
      .status(404)
      .json({ message: `meal with the id ${mealId} not found` });
  }

  const remainingMeals = meals.filter((meal) => meal.id !== parseInt(mealId));
  res.status(200).json({ success: true, meals: remainingMeals });
};

//get Homepage
const getHomepage = (req, res) => {
  const user = "John Doe";
  const role = "Fullstack engineer";
  res.status(200).render("index", { user, role });
};
// get about
const getAboutPage = (req, res) => {
  res.status(200).render("about");
};

module.exports = {
  getAMeal,
  getAllMeals,
  createMeal,
  deleteMeal,
  updateMeal,
  getAboutPage,
  getHomepage,
};
