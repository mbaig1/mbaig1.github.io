// Global Variables (from user)
var numOfLikes = [...document.getElementsByClassName('likes')];
var numOfComments = [...document.getElementsByClassName('comments')];
var categories = [...document.getElementsByClassName('category')];
var demographicsData = document.getElementById('demographics');

// Global Variables
var numOfPosts = {};
var numOfEngagements = {};
const AVGCOSTPERENGAGEMENT = {
  "Fitness": 0.18,
  "Food": 0.21,
  "Fashion": 0.15,
  "Photography": 0.20,
  "Kid/Family": 0.19,
  "Travel": 0.17,
  "Beauty": 0.14
};
var numOfCategoriesUsed;


setup() {
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
}

methodOne() {
  var partA, partB, numOfPartB, result;
  var partC = 0;
  for (var category in numOfPosts) {
    partA = AVGCOSTPERENGAGEMENT[category] * numOfEngagements[category];
    partB = partA / numOfPosts[category];
    partC += partB;
  }

  result = partC / numOfCategoriesUsed;

  return result;
}

methodTwo() {
  var partA, partB, partC, partD, result;
  for (var category in numOfPosts) {
    partA = numOfPosts[category] / 20;
    partB = partA * AVGCOSTPERENGAGEMENT[category];
    partC = partB * numOfEngagements[category];
    partD = partC / numOfPosts[category];
    result += partD;
  }

  return result;
}

methodThree() {
  var partA, partB, partC, partD, result;
  for (var category in numOfPosts) {
    partA = numOfPosts[category] / 20;
    partB = partA * AVGCOSTPERENGAGEMENT[category];
    partC = partB * numOfEngagements[category];
    partD += partA;
  }

  result = partD * AVGCOSTPERENGAGEMENT[category];
}

calculator() {
  setup();

  var postRates = [methodOne() * demographicsData, methodTwo() * demographicsData, methodThree() * demographicsData];
  var averagePostRate = (postRates[0] + postRates[1] + postRates[2])/3;
}
