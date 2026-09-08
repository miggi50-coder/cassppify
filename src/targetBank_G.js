// Static practice bank -- Target G: Create equations that describe numbers
// or relationships.
// 5 variations of each allowed item type (equation_numeric, graphing) per
// Evidence Required statement. This target does not allow multiple_choice,
// multi_select, matching_tables, drag_and_drop, or hot_spot.

export const TARGET_BANK_G = {
  "1": [
    { type: "equation_numeric", stem: "A company charges a flat fee of $20 plus $5 per hour. The total cost is $45. Write and solve an equation to find the number of hours.", data: { answerLabel: "Hours =", correctAnswer: "5" } },
    { type: "equation_numeric", stem: "The sum of a number and 8 is 23. Write and solve an equation to find the number.", data: { answerLabel: "Number =", correctAnswer: "15" } },
    { type: "equation_numeric", stem: "Three times a number minus 4 equals 11. Write and solve an equation to find the number.", data: { answerLabel: "Number =", correctAnswer: "5" } },
    { type: "equation_numeric", stem: "A rectangle's length is 3 more than its width. If the perimeter is 26, write and solve an equation to find the width.", data: { answerLabel: "Width =", correctAnswer: "5" } },
    { type: "equation_numeric", stem: "A number squared equals 49. Write and solve an equation to find the positive value of the number.", data: { answerLabel: "Number =", correctAnswer: "7" } },
    { type: "graphing", stem: "A rental car costs $30 plus $0.50 per mile. Graph the equation y=0.5x+30, showing cost versus miles driven, for x from 0 to 100.", data: { xMin: 0, xMax: 100, yMin: 0, yMax: 100, points: [{x:0,y:30},{x:100,y:80}], lineLabel: "y = 0.5x + 30", xLabel: "miles driven", yLabel: "cost (dollars)" } },
    { type: "graphing", stem: "A phone plan costs $20 plus $0.10 per text. Graph y=0.1x+20 for x from 0 to 200 texts.", data: { xMin: 0, xMax: 200, yMin: 0, yMax: 50, points: [{x:0,y:20},{x:200,y:40}], lineLabel: "y = 0.1x + 20", xLabel: "texts sent", yLabel: "cost (dollars)" } },
    { type: "graphing", stem: "A tank starts with 50 gallons and drains at 5 gallons per minute. Graph y=50-5x for x from 0 to 10 minutes.", data: { xMin: 0, xMax: 10, yMin: 0, yMax: 55, points: [{x:0,y:50},{x:10,y:0}], lineLabel: "y = 50 - 5x", xLabel: "minutes", yLabel: "gallons remaining" } },
    { type: "graphing", stem: "A savings account starts with $100 and grows by $25 per month. Graph y=25x+100 for x from 0 to 12 months.", data: { xMin: 0, xMax: 12, yMin: 0, yMax: 420, points: [{x:0,y:100},{x:12,y:400}], lineLabel: "y = 25x + 100", xLabel: "months", yLabel: "balance (dollars)" } },
    { type: "graphing", stem: "A candle is 20 cm tall and burns at 2 cm per hour. Graph y=20-2x for x from 0 to 10 hours.", data: { xMin: 0, xMax: 10, yMin: 0, yMax: 22, points: [{x:0,y:20},{x:10,y:0}], lineLabel: "y = 20 - 2x", xLabel: "hours", yLabel: "candle height (cm)" } },
  ],

  "2": [
    { type: "equation_numeric", stem: "A budget allows spending less than $50 on supplies, with a $10 flat fee plus $5 per item. Write the inequality 10+5x<50 and find the boundary value of x.", data: { answerLabel: "Boundary value of x =", correctAnswer: "8" } },
    { type: "equation_numeric", stem: "You need to save at least $200. You have $50 saved and add $25 per week. Write 50+25x\u2265200 and find the boundary number of weeks.", data: { answerLabel: "Boundary value of x =", correctAnswer: "6" } },
    { type: "equation_numeric", stem: "A number times 4 is greater than 28. Write the inequality and find the boundary value.", data: { answerLabel: "Boundary value =", correctAnswer: "7" } },
    { type: "equation_numeric", stem: "Twice a number plus 5 is at most 21. Write the inequality and find the boundary value.", data: { answerLabel: "Boundary value =", correctAnswer: "8" } },
    { type: "equation_numeric", stem: "Three less than a number is at least 10. Write the inequality and find the boundary value.", data: { answerLabel: "Boundary value =", correctAnswer: "13" } },
    { type: "graphing", stem: "Graph the boundary line for the inequality y \u2264 2x+3, for x from -2 to 4.", data: { xMin: -2, xMax: 4, yMin: -2, yMax: 12, points: [{x:-2,y:-1},{x:4,y:11}], lineLabel: "Boundary line: y = 2x + 3" } },
    { type: "graphing", stem: "Graph the boundary line for the inequality y > -x+5, for x from 0 to 8.", data: { xMin: 0, xMax: 8, yMin: -4, yMax: 6, points: [{x:0,y:5},{x:8,y:-3}], lineLabel: "Boundary line: y = -x + 5" } },
    { type: "graphing", stem: "Graph the boundary line for the inequality y \u2265 0.5x-2, for x from -2 to 6.", data: { xMin: -2, xMax: 6, yMin: -4, yMax: 2, points: [{x:-2,y:-3},{x:6,y:1}], lineLabel: "Boundary line: y = 0.5x - 2" } },
    { type: "graphing", stem: "Graph the boundary line for the inequality y < 3x-1, for x from -1 to 3.", data: { xMin: -1, xMax: 3, yMin: -5, yMax: 9, points: [{x:-1,y:-4},{x:3,y:8}], lineLabel: "Boundary line: y = 3x - 1" } },
    { type: "graphing", stem: "Graph the boundary line for the inequality y \u2265 -2x+4, for x from -1 to 4.", data: { xMin: -1, xMax: 4, yMin: -5, yMax: 7, points: [{x:-1,y:6},{x:4,y:-4}], lineLabel: "Boundary line: y = -2x + 4" } },
  ],

  "3": [
    { type: "equation_numeric", stem: "A graph shows total cost y=2x+15 where x is the number of items purchased. What does the y-intercept represent, in dollars?", data: { answerLabel: "y-intercept represents (dollars) =", correctAnswer: "15" } },
    { type: "equation_numeric", stem: "A graph of distance y=3x+10 models distance over time x. What does the slope represent (units per unit time)?", data: { answerLabel: "Slope =", correctAnswer: "3" } },
    { type: "equation_numeric", stem: "A graph of temperature y=-4x+80 over x hours shows a starting temperature of how many degrees?", data: { answerLabel: "Starting temperature =", correctAnswer: "80" } },
    { type: "equation_numeric", stem: "For a graph of height y=6x, where x is time in seconds, find the height at x=5 seconds.", data: { answerLabel: "Height at x=5 =", correctAnswer: "30" } },
    { type: "equation_numeric", stem: "For a cost function y=1.5x+8, find the cost when x=4 items.", data: { answerLabel: "Cost at x=4 =", correctAnswer: "14" } },
    { type: "graphing", stem: "Graph y=2x+15, representing total cost based on number of items x, for x from 0 to 10.", data: { xMin: 0, xMax: 10, yMin: 0, yMax: 40, points: [{x:0,y:15},{x:10,y:35}], lineLabel: "y = 2x + 15", xLabel: "items", yLabel: "total cost (dollars)" } },
    { type: "graphing", stem: "Graph y=3x+10, representing distance over time x, for x from 0 to 8.", data: { xMin: 0, xMax: 8, yMin: 0, yMax: 40, points: [{x:0,y:10},{x:8,y:34}], lineLabel: "y = 3x + 10", xLabel: "time", yLabel: "distance" } },
    { type: "graphing", stem: "Graph y=-4x+80, representing temperature over x hours, for x from 0 to 15.", data: { xMin: 0, xMax: 15, yMin: 0, yMax: 85, points: [{x:0,y:80},{x:15,y:20}], lineLabel: "y = -4x + 80", xLabel: "hours", yLabel: "temperature" } },
    { type: "graphing", stem: "Graph y=6x, representing height over time x in seconds, for x from 0 to 10.", data: { xMin: 0, xMax: 10, yMin: 0, yMax: 65, points: [{x:0,y:0},{x:10,y:60}], lineLabel: "y = 6x", xLabel: "time (seconds)", yLabel: "height" } },
    { type: "graphing", stem: "Graph y=1.5x+8, representing cost based on x items, for x from 0 to 10.", data: { xMin: 0, xMax: 10, yMin: 0, yMax: 25, points: [{x:0,y:8},{x:10,y:23}], lineLabel: "y = 1.5x + 8", xLabel: "items", yLabel: "cost (dollars)" } },
  ],

  "4": [
    { type: "equation_numeric", stem: "The relationship between total cost y and number of items x is y=4x+12. Find y when x=6.", data: { answerLabel: "y =", correctAnswer: "36" } },
    { type: "equation_numeric", stem: "The relationship between distance y (miles) and time x (hours) is y=55x. Find y when x=3.", data: { answerLabel: "y =", correctAnswer: "165" } },
    { type: "equation_numeric", stem: "A two-variable relationship is given by y=x^{2}-4. Find y when x=5.", data: { answerLabel: "y =", correctAnswer: "21" } },
    { type: "equation_numeric", stem: "The equation 2x+3y=12 relates x and y. Find y when x=3.", data: { answerLabel: "y =", correctAnswer: "2" } },
    { type: "equation_numeric", stem: "The equation x+y=20 relates two quantities. If x=8, find y.", data: { answerLabel: "y =", correctAnswer: "12" } },
    { type: "graphing", stem: "Graph the relationship y=4x+12 for x from 0 to 8.", data: { xMin: 0, xMax: 8, yMin: 0, yMax: 50, points: [{x:0,y:12},{x:8,y:44}], lineLabel: "y = 4x + 12" } },
    { type: "graphing", stem: "Graph the relationship y=3x-6 for x from -2 to 6.", data: { xMin: -2, xMax: 6, yMin: -14, yMax: 14, points: [{x:-2,y:-12},{x:6,y:12}], lineLabel: "y = 3x - 6" } },
    { type: "graphing", stem: "Graph the relationship 2x+3y=12 for x from 0 to 6. (Solve for y first.)", data: { xMin: 0, xMax: 6, yMin: 0, yMax: 5, points: [{x:0,y:4},{x:6,y:0}], lineLabel: "2x + 3y = 12" } },
    { type: "graphing", stem: "Graph the relationship x+y=20 for x from 0 to 20.", data: { xMin: 0, xMax: 20, yMin: 0, yMax: 22, points: [{x:0,y:20},{x:20,y:0}], lineLabel: "x + y = 20" } },
    { type: "graphing", stem: "Graph the relationship y=55x for x from 0 to 5 (hours), representing distance traveled.", data: { xMin: 0, xMax: 5, yMin: 0, yMax: 300, points: [{x:0,y:0},{x:5,y:275}], lineLabel: "y = 55x", xLabel: "time (hours)", yLabel: "distance (miles)" } },
  ],
};
