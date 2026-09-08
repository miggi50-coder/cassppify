// Static practice bank -- Target M: Analyze functions using different
// representations.
// 5 variations of each allowed item type (matching_tables, hot_spot,
// graphing) per Evidence Required statement. This target does not allow
// multiple_choice, multi_select, equation_numeric, drag_and_drop, or
// fill_in_table. Evidence M2 is retired and excluded; M1, M3, M4 remain.

export const TARGET_BANK_M = {
  "1": [
    { type: "matching_tables", stem: "Match each function to a key feature of its graph.", data: { rows: ["f(x)=x^{2}-4","f(x)=2x+6","f(x)=-x^{2}+9"], columns: ["x-intercepts at x=-2, 2","x-intercept at x=-3","Maximum value of 9"], correct: [0,1,2] } },
    { type: "matching_tables", stem: "Match each function to its y-intercept.", data: { rows: ["f(x)=3x-5","f(x)=x^{2}+2","f(x)=-4x+7"], columns: ["-5","2","7"], correct: [0,1,2] } },
    { type: "matching_tables", stem: "Match each quadratic function to its vertex.", data: { rows: ["f(x)=(x-2)^{2}+3","f(x)=(x+1)^{2}-4","f(x)=x^{2}"], columns: ["(2, 3)","(-1, -4)","(0, 0)"], correct: [0,1,2] } },
    { type: "matching_tables", stem: "Match each function to whether it is increasing or decreasing for all x.", data: { rows: ["f(x)=3x+1","f(x)=-2x+5","f(x)=x+10"], columns: ["Increasing","Decreasing","Increasing"], correct: [0,1,0] } },
    { type: "matching_tables", stem: "Match each function to its end behavior.", data: { rows: ["f(x)=x^{2}","f(x)=-x^{2}","f(x)=x^{3}"], columns: ["Rises on both ends","Falls on both ends","Falls left, rises right"], correct: [0,1,2] } },
    { type: "hot_spot", stem: "For f(x)=x^{2}-4, mark one of its x-intercepts on the number line.", data: { lineMin: -5, lineMax: 5, correctValue: 2 } },
    { type: "hot_spot", stem: "For f(x)=3x-5, mark the y-intercept on the number line.", data: { lineMin: -10, lineMax: 5, correctValue: -5 } },
    { type: "hot_spot", stem: "For f(x)=(x-2)^{2}+3, mark the x-coordinate of the vertex.", data: { lineMin: -2, lineMax: 6, correctValue: 2 } },
    { type: "hot_spot", stem: "For f(x)=-x^{2}+9, mark the maximum value on the number line.", data: { lineMin: 0, lineMax: 12, correctValue: 9 } },
    { type: "hot_spot", stem: "For f(x)=(x+1)^{2}-4, mark the minimum value on the number line.", data: { lineMin: -6, lineMax: 2, correctValue: -4 } },
    { type: "graphing", stem: "Graph f(x)=x^{2}-4 for x from -3 to 3 to identify its key features.", data: { xMin: -3, xMax: 3, yMin: -5, yMax: 6, points: [{x:-3,y:5},{x:3,y:5}], lineLabel: "f(x) = x^2 - 4 (endpoints shown)" } },
    { type: "graphing", stem: "Graph f(x)=3x-5 for x from -2 to 4.", data: { xMin: -2, xMax: 4, yMin: -12, yMax: 8, points: [{x:-2,y:-11},{x:4,y:7}], lineLabel: "f(x) = 3x - 5" } },
    { type: "graphing", stem: "Graph f(x)=-2x+5 for x from -1 to 5.", data: { xMin: -1, xMax: 5, yMin: -6, yMax: 8, points: [{x:-1,y:7},{x:5,y:-5}], lineLabel: "f(x) = -2x + 5" } },
    { type: "graphing", stem: "Graph f(x)=x+10 for x from -5 to 5.", data: { xMin: -5, xMax: 5, yMin: 4, yMax: 16, points: [{x:-5,y:5},{x:5,y:15}], lineLabel: "f(x) = x + 10" } },
    { type: "graphing", stem: "Graph f(x)=-4x+7 for x from -1 to 3.", data: { xMin: -1, xMax: 3, yMin: -6, yMax: 12, points: [{x:-1,y:11},{x:3,y:-5}], lineLabel: "f(x) = -4x + 7" } },
  ],

  "3": [
    { type: "matching_tables", stem: "Match each exponential function to whether it represents growth or decay.", data: { rows: ["f(x)=100(0.9)^{x}","f(x)=50(1.2)^{x}","f(x)=20(1.5)^{x}"], columns: ["Decay","Growth"], correct: [0,1,1] } },
    { type: "matching_tables", stem: "Match each exponential function to its growth or decay rate.", data: { rows: ["f(x)=100(1.05)^{x}","f(x)=200(0.85)^{x}","f(x)=50(1.1)^{x}"], columns: ["5% growth","15% decay","10% growth"], correct: [0,1,2] } },
    { type: "matching_tables", stem: "Match each rewritten exponential expression to the original.", data: { rows: ["4^{x} rewritten as (2^{2})^{x}","9^{x} rewritten as (3^{2})^{x}","8^{x} rewritten as (2^{3})^{x}"], columns: ["2^{2x}","3^{2x}","2^{3x}"], correct: [0,1,2] } },
    { type: "matching_tables", stem: "Match each function to its initial value (value at x=0).", data: { rows: ["f(x)=100(0.9)^{x}","f(x)=50(1.2)^{x}","f(x)=75(1.03)^{x}"], columns: ["100","50","75"], correct: [0,1,2] } },
    { type: "matching_tables", stem: "Match each exponential function to whether its growth factor is greater than or less than 1.", data: { rows: ["f(x)=30(1.4)^{x}","f(x)=60(0.75)^{x}","f(x)=10(2)^{x}"], columns: ["Greater than 1","Less than 1"], correct: [0,1,0] } },
    { type: "hot_spot", stem: "For f(x)=100(1.05)^{x}, mark the growth rate as a percent on the number line.", data: { lineMin: 0, lineMax: 20, correctValue: 5 } },
    { type: "hot_spot", stem: "For f(x)=200(0.85)^{x}, mark the decay rate as a percent on the number line.", data: { lineMin: 0, lineMax: 30, correctValue: 15 } },
    { type: "hot_spot", stem: "For f(x)=50(1.2)^{x}, mark the initial value (at x=0) on the number line.", data: { lineMin: 0, lineMax: 100, correctValue: 50 } },
    { type: "hot_spot", stem: "For f(x)=100(0.9)^{x}, mark the initial value (at x=0) on the number line.", data: { lineMin: 0, lineMax: 150, correctValue: 100 } },
    { type: "hot_spot", stem: "For f(x)=50(1.1)^{x}, mark the growth rate as a percent on the number line.", data: { lineMin: 0, lineMax: 20, correctValue: 10 } },
    { type: "graphing", stem: "Graph f(x)=100(0.9)^{x} for x from 0 to 10 to show decay.", data: { xMin: 0, xMax: 10, yMin: 30, yMax: 105, points: [{x:0,y:100},{x:10,y:35}], lineLabel: "f(x) = 100(0.9)^x (approximate)" } },
    { type: "graphing", stem: "Graph f(x)=50(1.2)^{x} for x from 0 to 8 to show growth.", data: { xMin: 0, xMax: 8, yMin: 0, yMax: 220, points: [{x:0,y:50},{x:8,y:215}], lineLabel: "f(x) = 50(1.2)^x (approximate)" } },
    { type: "graphing", stem: "Graph f(x)=20(1.5)^{x} for x from 0 to 5 to show growth.", data: { xMin: 0, xMax: 5, yMin: 0, yMax: 160, points: [{x:0,y:20},{x:5,y:152}], lineLabel: "f(x) = 20(1.5)^x (approximate)" } },
    { type: "graphing", stem: "Graph f(x)=200(0.85)^{x} for x from 0 to 10 to show decay.", data: { xMin: 0, xMax: 10, yMin: 30, yMax: 210, points: [{x:0,y:200},{x:10,y:40}], lineLabel: "f(x) = 200(0.85)^x (approximate)" } },
    { type: "graphing", stem: "Graph f(x)=10(2)^{x} for x from 0 to 5 to show rapid growth.", data: { xMin: 0, xMax: 5, yMin: 0, yMax: 330, points: [{x:0,y:10},{x:5,y:320}], lineLabel: "f(x) = 10(2)^x" } },
  ],

  "4": [
    { type: "matching_tables", stem: "Match each function representation to the value of the function at x=5.", data: { rows: ["f(x)=2x+3, find f(5)","g given by the table (5,15)","h(x)=x^{2}-10, find h(5)"], columns: ["13","15","15"], correct: [0,1,2] } },
    { type: "matching_tables", stem: "Two functions are compared. Match each description to which function has the greater value at x=4.", data: { rows: ["f(x)=3x (f(4)=12) vs g(x)=2x+5 (g(4)=13)","f(x)=x^{2} (f(4)=16) vs g(x)=5x (g(4)=20)","f given by table f(4)=8 vs g(x)=x+2 (g(4)=6)"], columns: ["g is greater","g is greater","f is greater"], correct: [0,1,2] } },
    { type: "matching_tables", stem: "Match each pair of functions to which one has the greater rate of change.", data: { rows: ["f(x)=2x vs g(x)=5x","f(x)=x+1 vs g given by table showing slope 3","f(x)=10x vs g(x)=4x"], columns: ["g","g","f"], correct: [0,1,2] } },
    { type: "matching_tables", stem: "Match each function representation type to an example.", data: { rows: ["A function given as an equation","A function given as a table of values","A function given as a graph"], columns: ["f(x)=3x+2","A list of (x,y) pairs","A plotted curve or line"], correct: [0,1,2] } },
    { type: "matching_tables", stem: "Match each comparison to its correct conclusion.", data: { rows: ["f(x)=x^{2} vs g(x)=2x, comparing at x=3: f(3)=9, g(3)=6","f(x)=x^{2} vs g(x)=2x, comparing at x=1: f(1)=1, g(1)=2","f(x)=x^{2} vs g(x)=2x, comparing at x=2: f(2)=4, g(2)=4"], columns: ["f is greater","g is greater","f equals g"], correct: [0,1,2] } },
    { type: "hot_spot", stem: "For f(x)=2x+3, mark f(5) on the number line.", data: { lineMin: 0, lineMax: 20, correctValue: 13 } },
    { type: "hot_spot", stem: "For h(x)=x^{2}-10, mark h(5) on the number line.", data: { lineMin: 0, lineMax: 20, correctValue: 15 } },
    { type: "hot_spot", stem: "Comparing f(x)=x^{2} and g(x)=2x at x=3, mark f(3) on the number line.", data: { lineMin: 0, lineMax: 12, correctValue: 9 } },
    { type: "hot_spot", stem: "Comparing f(x)=x^{2} and g(x)=2x at x=3, mark g(3) on the number line.", data: { lineMin: 0, lineMax: 12, correctValue: 6 } },
    { type: "hot_spot", stem: "For f(x)=3x, mark f(4) on the number line.", data: { lineMin: 0, lineMax: 20, correctValue: 12 } },
    { type: "graphing", stem: "Graph f(x)=2x+3 for x from 0 to 5 to compare with another function given elsewhere as a table.", data: { xMin: 0, xMax: 5, yMin: 0, yMax: 15, points: [{x:0,y:3},{x:5,y:13}], lineLabel: "f(x) = 2x + 3" } },
    { type: "graphing", stem: "Graph f(x)=3x for x from 0 to 4 to compare its rate of change with g(x)=2x+5.", data: { xMin: 0, xMax: 4, yMin: 0, yMax: 13, points: [{x:0,y:0},{x:4,y:12}], lineLabel: "f(x) = 3x" } },
    { type: "graphing", stem: "Graph f(x)=x+1 for x from 0 to 4 to compare with a function given as a table.", data: { xMin: 0, xMax: 4, yMin: 0, yMax: 6, points: [{x:0,y:1},{x:4,y:5}], lineLabel: "f(x) = x + 1" } },
    { type: "graphing", stem: "Graph f(x)=10x for x from 0 to 3 to compare with g(x)=4x.", data: { xMin: 0, xMax: 3, yMin: 0, yMax: 32, points: [{x:0,y:0},{x:3,y:30}], lineLabel: "f(x) = 10x" } },
    { type: "graphing", stem: "Graph f(x)=5x for x from 0 to 4 to compare with g(x)=x^{2}.", data: { xMin: 0, xMax: 4, yMin: 0, yMax: 22, points: [{x:0,y:0},{x:4,y:20}], lineLabel: "f(x) = 5x" } },
  ],
};
