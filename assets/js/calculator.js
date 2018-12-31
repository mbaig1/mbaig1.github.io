// Global Variables (from user)
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
  }

  return result;
}

function methodThree() {
  var partA = 0, partB = 0, partC = 0, partD = 0, result = 0;
  for (var category in numOfPosts) {
    partA = numOfPosts[category] / 12;
    partB = partA * AVGCOSTPERENGAGEMENT[category];
    partC = partB * numOfEngagements[category];
    partD += partA;
  }

  result = partD * AVGCOSTPERENGAGEMENT[category];

  return result;
}

function calculate(e) {
  e.preventDefault();
  prepAcquiredData();
  setupKnowledge();

  var postRates = [methodOne(), methodTwo(), methodThree()];
  var averagePostRate = (postRates[0] + postRates[1] + postRates[2])/3;

  console.table(postRates);
}

document.getElementById('calculate').addEventListener("click", calculate);
