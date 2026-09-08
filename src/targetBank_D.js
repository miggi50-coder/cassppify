// Static practice bank -- Target D: Interpret the structure of expressions.
// Only 1 Evidence Required statement for this target.
// 5 variations of each allowed item type (multiple_choice, matching_tables,
// drag_and_drop).

export const TARGET_BANK_D = {
  "1": [
    { type: "multiple_choice", stem: "Which way of rewriting x^{2} - 9 reveals its zeros most directly?", data: { options: [{id:"A",text:"(x-3)(x+3)"},{id:"B",text:"x^{2}-9"},{id:"C",text:"x(x)-9"},{id:"D",text:"x^{2}-3^{2}, left unfactored"}], correctId: "A" } },
    { type: "multiple_choice", stem: "The expression 2x^{2} + 4x can be rewritten as 2x(x+2). What structural feature does this reveal?", data: { options: [{id:"A",text:"A common factor of 2x in every term"},{id:"B",text:"That the expression has no real zeros"},{id:"C",text:"The maximum value of the expression"},{id:"D",text:"That the expression is always positive"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Which structural feature of x^{2} + 5x + 6 lets you rewrite it as (x+2)(x+3)?", data: { options: [{id:"A",text:"Two numbers that multiply to 6 and add to 5"},{id:"B",text:"The coefficient of x^{2} being 1"},{id:"C",text:"The expression having a common factor"},{id:"D",text:"The constant term being positive"}], correctId: "A" } },
    { type: "multiple_choice", stem: "In the expression 3(x+4) - 2(x+4), what structural feature allows it to be simplified quickly?", data: { options: [{id:"A",text:"Both terms share the common factor (x+4)"},{id:"B",text:"Both terms have the same sign"},{id:"C",text:"The expression is already fully expanded"},{id:"D",text:"There is no way to simplify it"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Recognizing that x^{4} - 1 fits the pattern a^{2} - b^{2} with a=x^{2} and b=1 allows you to rewrite it as:", data: { options: [{id:"A",text:"(x^{2}-1)(x^{2}+1)"},{id:"B",text:"(x-1)^{4}"},{id:"C",text:"x^{4}-1, unfactorable"},{id:"D",text:"4x-1"}], correctId: "A" } },
    { type: "matching_tables", stem: "Match each expression to the structural feature that helps rewrite it.", data: { rows: ["x^{2}-9","2x^{2}+4x","x^{2}+5x+6"], columns: ["Difference of squares pattern","Common factor of 2x","Two numbers multiplying to 6, adding to 5"], correct: [0,1,2] } },
    { type: "matching_tables", stem: "Match each expression to its factored form.", data: { rows: ["x^{2}-9","x^{2}+5x+6","2x^{2}+4x"], columns: ["(x-3)(x+3)","(x+2)(x+3)","2x(x+2)"], correct: [0,1,2] } },
    { type: "matching_tables", stem: "Match each expression to the reasoning that reveals its structure.", data: { rows: ["x^{2}-16","3x+3y","x^{2}-6x+9"], columns: ["Difference of squares: a=x, b=4","Common factor of 3","Perfect square trinomial: (x-3)^{2}"], correct: [0,1,2] } },
    { type: "matching_tables", stem: "Match each expression to its equivalent rewritten form.", data: { rows: ["x^{2}-16","3x+3y","x^{2}-6x+9"], columns: ["(x-4)(x+4)","3(x+y)","(x-3)^{2}"], correct: [0,1,2] } },
    { type: "matching_tables", stem: "Match each expression to the pattern it fits.", data: { rows: ["4x^{2}-1","x^{2}+8x+16","5x-5"], columns: ["Difference of squares","Perfect square trinomial","Common factor"], correct: [0,1,2] } },
    { type: "drag_and_drop", stem: "Complete the structural observation.", data: { template: "x^{2} - 9 fits the pattern a^{2} - b^{2}, which factors as (a-b)(a+___).", tiles: ["b","a","9"], correctTile: "b" } },
    { type: "drag_and_drop", stem: "Complete the factorization.", data: { template: "2x^{2} + 4x has a common factor of 2x, so it factors as 2x(x + ___).", tiles: ["2","4","2x"], correctTile: "2" } },
    { type: "drag_and_drop", stem: "Complete the factorization.", data: { template: "x^{2} + 5x + 6 factors as (x+2)(x+___), since 2 and 3 multiply to 6 and add to 5.", tiles: ["3","5","6"], correctTile: "3" } },
    { type: "drag_and_drop", stem: "Complete the structural observation.", data: { template: "x^{2} - 6x + 9 is a perfect square trinomial, equivalent to (x - ___)^{2}.", tiles: ["3","6","9"], correctTile: "3" } },
    { type: "drag_and_drop", stem: "Complete the factorization.", data: { template: "3x + 3y has a common factor of 3, so it factors as 3(x + ___).", tiles: ["y","3","x"], correctTile: "y" } },
  ],
};
