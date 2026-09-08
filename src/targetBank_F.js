// Static practice bank -- Target F: Perform arithmetic operations on
// polynomials.
// 5 variations of each allowed item type (multiple_choice, equation_numeric)
// per Evidence Required statement. This target does not allow multi_select,
// matching_tables, drag_and_drop, or any of the visual item types.

export const TARGET_BANK_F = {
  "1": [
    { type: "equation_numeric", stem: "Add: (3x^{2}+2x-1) + (x^{2}-5x+4)", data: { answerLabel: "Sum =", correctAnswer: "4x^{2}-3x+3" } },
    { type: "equation_numeric", stem: "Subtract: (5x^{2}-3x) - (2x^{2}+x-6)", data: { answerLabel: "Difference =", correctAnswer: "3x^{2}-4x+6" } },
    { type: "equation_numeric", stem: "Add: (x^{2}+4x+7) + (2x^{2}-x-3)", data: { answerLabel: "Sum =", correctAnswer: "3x^{2}+3x+4" } },
    { type: "equation_numeric", stem: "Subtract: (6x^{2}+5x-2) - (3x^{2}+5x-2)", data: { answerLabel: "Difference =", correctAnswer: "3x^{2}" } },
    { type: "equation_numeric", stem: "Add: (4x^{3}-2x+1) + (x^{3}+2x-1)", data: { answerLabel: "Sum =", correctAnswer: "5x^{3}" } },
    { type: "multiple_choice", stem: "Add: (2x^{2}+x-4) + (x^{2}-3x+5)", data: { options: [{id:"A",text:"3x^{2}-2x+1"},{id:"B",text:"3x^{2}+2x+1"},{id:"C",text:"x^{2}-2x-1"},{id:"D",text:"3x^{2}-2x-1"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Subtract: (7x^{2}-4x+3) - (2x^{2}-4x+3)", data: { options: [{id:"A",text:"5x^{2}"},{id:"B",text:"5x^{2}-8x+6"},{id:"C",text:"9x^{2}"},{id:"D",text:"5x^{2}-8x"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Add: (x^{2}-6x) + (3x^{2}+2x-5)", data: { options: [{id:"A",text:"4x^{2}-4x-5"},{id:"B",text:"4x^{2}-8x-5"},{id:"C",text:"4x^{2}-4x+5"},{id:"D",text:"3x^{2}-4x-5"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Subtract: (4x^{2}+3x-2) - (x^{2}+5x+1)", data: { options: [{id:"A",text:"3x^{2}-2x-3"},{id:"B",text:"3x^{2}+8x-1"},{id:"C",text:"3x^{2}-2x+3"},{id:"D",text:"5x^{2}-2x-3"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Add: (5x^{3}-2x^{2}+x) + (-2x^{3}+2x^{2}-x)", data: { options: [{id:"A",text:"3x^{3}"},{id:"B",text:"3x^{3}-4x^{2}+2x"},{id:"C",text:"7x^{3}"},{id:"D",text:"3x^{2}"}], correctId: "A" } },
  ],

  "2": [
    { type: "equation_numeric", stem: "Multiply: (x+3)(x-2)", data: { answerLabel: "Product =", correctAnswer: "x^{2}+x-6" } },
    { type: "equation_numeric", stem: "Multiply: (2x-1)(x+4)", data: { answerLabel: "Product =", correctAnswer: "2x^{2}+7x-4" } },
    { type: "equation_numeric", stem: "Multiply: (x+5)^{2}", data: { answerLabel: "Product =", correctAnswer: "x^{2}+10x+25" } },
    { type: "equation_numeric", stem: "Multiply: (x-6)(x+6)", data: { answerLabel: "Product =", correctAnswer: "x^{2}-36" } },
    { type: "equation_numeric", stem: "Multiply: 3x(2x^{2}-5x+1)", data: { answerLabel: "Product =", correctAnswer: "6x^{3}-15x^{2}+3x" } },
    { type: "multiple_choice", stem: "Multiply: (x-4)(x+7)", data: { options: [{id:"A",text:"x^{2}+3x-28"},{id:"B",text:"x^{2}-3x-28"},{id:"C",text:"x^{2}+3x+28"},{id:"D",text:"x^{2}-11x-28"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Multiply: (3x+2)(x-5)", data: { options: [{id:"A",text:"3x^{2}-13x-10"},{id:"B",text:"3x^{2}+13x-10"},{id:"C",text:"3x^{2}-13x+10"},{id:"D",text:"3x^{2}-15x-10"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Multiply: (x-3)^{2}", data: { options: [{id:"A",text:"x^{2}-6x+9"},{id:"B",text:"x^{2}-9"},{id:"C",text:"x^{2}+6x+9"},{id:"D",text:"x^{2}-6x-9"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Multiply: (2x+3)(2x-3)", data: { options: [{id:"A",text:"4x^{2}-9"},{id:"B",text:"4x^{2}+9"},{id:"C",text:"4x^{2}-12x-9"},{id:"D",text:"2x^{2}-9"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Multiply: -2x(x^{2}+3x-4)", data: { options: [{id:"A",text:"-2x^{3}-6x^{2}+8x"},{id:"B",text:"-2x^{3}+6x^{2}-8x"},{id:"C",text:"-2x^{3}-6x^{2}-8x"},{id:"D",text:"2x^{3}-6x^{2}+8x"}], correctId: "A" } },
  ],
};
