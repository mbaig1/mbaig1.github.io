// Global Variables (from user)
var instagramHandle = document.getElementById('insta-handle').value;
var emailAddress = document.getElementById('email').value;
var city = document.getElementById('city').value;

var numOfLikes = [...document.getElementsByClassName('likes')];
var numOfComments = [...document.getElementsByClassName('comments')];
var categories = [...document.getElementsByClassName('category')];

// Global Variables
var numOfPosts = {};
var numOfEngagements = {};
var numOfCategoriesUsed = 0;

const AVGCOSTPERENGAGEMENT = {
  "Fitness": 0.18,
  "Food": 0.21,
  "Fashion": 0.15,
  "Photography": 0.20,
  "Kid/Family": 0.19,
  "Travel": 0.17,
  "Beauty": 0.14
};

var reportParams = {};

var methodOnePrices = {}; // holds by-category prices for each category
var methodTwoPrices = {}; // holds by-category-engagement prices for each category

function prepAcquiredData() { // for Global Variables (from user)
  for (var i = 0; i < 12; i++) {
    numOfLikes[i] = parseInt(numOfLikes[i].value);
    numOfComments[i] = parseInt(numOfComments[i].value);
    categories[i] = categories[i].value;
  }
}

function setupKnowledge() { //for Global Variables
  for (var i = 0; i < categories.length; i++) {
    var category = categories[i];

    if (!numOfEngagements[category]) {
      numOfPosts[category] = 1;
      numOfEngagements[category] = numOfLikes[i] + numOfComments[i];
      numOfCategoriesUsed++;
    } else {
      numOfPosts[category]++;
      numOfEngagements[category] += numOfLikes[i] + numOfComments[i];
    }
  }
  console.table(categories);
  console.table(numOfPosts);
  console.table(numOfEngagements);
}

function methodOne() {
  var partA = 0, partB = 0, partC = 0, result = 0;
  for (var category in numOfPosts) {
    partA = AVGCOSTPERENGAGEMENT[category] * numOfEngagements[category];
    partB = partA / numOfPosts[category];
    partC += partB;

    methodOnePrices[category] = partB;
  }

  result = partC / numOfCategoriesUsed;

  return result;
}

function methodTwo() {
  var partA = 0, partB = 0, partC = 0, partD = 0, result = 0;
  for (var category in numOfPosts) {
    partA = numOfPosts[category] / 12;
    partB = partA * AVGCOSTPERENGAGEMENT[category];
    partC = partB * numOfEngagements[category];
    partD = partC / numOfPosts[category];
    result += partD;

    methodTwoPrices[category] = partD;
  }

  return result;
}

function methodThree() {
  var partA = 0, partB = 0, partC = 0, partD = 0, result = 0;
  for (var category in numOfPosts) {
    partA = numOfPosts[category] / 12;
    partB = partA * AVGCOSTPERENGAGEMENT[category];
    partC = partB * numOfEngagements[category];
    partD += partC;
  }

  result = partD * AVGCOSTPERENGAGEMENT[category];

  return result;
}

function fillReportParams(postRatesArr, photosArr) {
  reportParams = {
    "influencerreport": {
      "instagram_handle": instagramHandle,
      "email": emailAddress,
      "city": city,
      "post_price_by_category": postRatesArr[0],
      "post_price_by_category_engagements": postRatesArr[1],
      "post_price_by_avg_engagements": postRatesArr[2],
      "fitness_ppe_method1": methodOnePrices["Fitness"],
      "fitness_ppe_method2": methodTwoPrices["Fitness"],
      "food_ppe_method1": methodOnePrices["Food"],
      "food_ppe_method2": methodTwoPrices["Food"],
      "fashion_ppe_method1": methodOnePrices["Fashion"],
      "fashion_ppe_method2": methodTwoPrices["Fashion"],
      "photography_ppe_method1": methodOnePrices["Photography"],
      "photography_ppe_method2": methodTwoPrices["Photography"],
      "kids_family_ppe_method1": methodOnePrices["Kid/Family"],
      "kids_family_ppe_method2": methodTwoPrices["Kid/Family"],
      "travel_ppe_method1": methodOnePrices["Travel"],
      "travel_ppe_method2": methodTwoPrices["Travel"],
      "beauty_ppe_method1": methodOnePrices["Beauty"],
      "beauty_ppe_method2": methodTwoPrices["Beauty"],
      "photos_attributes": photosArr
    }
  };
}

function sendRequest() {
  $.ajax();
}

function calculate(e) {
  e.preventDefault();
  prepAcquiredData();
  setupKnowledge();

  var postRates = [methodOne(), methodTwo(), methodThree()];
  var photos = [];

  for (var i = 0; i < 12; i++) {
    photos.push({
      "industry": categories[i],
      "likes": numOfLikes[i],
      "comments": numOfComments[i]
    });
  }

  fillReportParams(postRates,photos);
}

document.getElementById('calculate').addEventListener("click", calculate);
