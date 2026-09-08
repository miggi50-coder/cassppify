// Static practice bank -- Target I: Solve equations and inequalities in one
// variable.
// 5 variations of each allowed item type (multiple_choice, equation_numeric)
// per Evidence Required statement. 7 evidence statements for this target.

export const TARGET_BANK_I = {
  "1": [
    { type: "equation_numeric", stem: "Solve: 3x+7=22", data: { answerLabel: "x =", correctAnswer: "5" } },
    { type: "equation_numeric", stem: "Solve: 5x-3=2x+9", data: { answerLabel: "x =", correctAnswer: "4" } },
    { type: "equation_numeric", stem: "Solve: 2(x+3)=16", data: { answerLabel: "x =", correctAnswer: "5" } },
    { type: "equation_numeric", stem: "Solve: 4x-9=3x+2", data: { answerLabel: "x =", correctAnswer: "11" } },
    { type: "equation_numeric", stem: "Solve: 6-2x=10", data: { answerLabel: "x =", correctAnswer: "-2" } },
    { type: "multiple_choice", stem: "Solve: 7x-4=24", data: { options: [{id:"A",text:"x = 4"},{id:"B",text:"x = 3"},{id:"C",text:"x = 28"},{id:"D",text:"x = 20"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Solve: 3(x-2)=9", data: { options: [{id:"A",text:"x = 5"},{id:"B",text:"x = 3"},{id:"C",text:"x = 7"},{id:"D",text:"x = 1"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Solve: 8-3x=2", data: { options: [{id:"A",text:"x = 2"},{id:"B",text:"x = -2"},{id:"C",text:"x = 10"},{id:"D",text:"x = 3"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Solve: 2x+5=4x-3", data: { options: [{id:"A",text:"x = 4"},{id:"B",text:"x = -4"},{id:"C",text:"x = 1"},{id:"D",text:"x = 8"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Solve: frac{x}{3}+2=5", data: { options: [{id:"A",text:"x = 9"},{id:"B",text:"x = 15"},{id:"C",text:"x = 3"},{id:"D",text:"x = 21"}], correctId: "A" } },
  ],

  "2": [
    { type: "equation_numeric", stem: "Solve the inequality 2x-5>7 and find the boundary value of x.", data: { answerLabel: "Boundary value =", correctAnswer: "6" } },
    { type: "equation_numeric", stem: "Solve the inequality 3x+1\u226410 and find the boundary value of x.", data: { answerLabel: "Boundary value =", correctAnswer: "3" } },
    { type: "equation_numeric", stem: "Solve the inequality 5x-2<18 and find the boundary value of x.", data: { answerLabel: "Boundary value =", correctAnswer: "4" } },
    { type: "equation_numeric", stem: "Solve the inequality 4-x\u22651 and find the boundary value of x.", data: { answerLabel: "Boundary value =", correctAnswer: "3" } },
    { type: "equation_numeric", stem: "Solve the inequality 6x+3>27 and find the boundary value of x.", data: { answerLabel: "Boundary value =", correctAnswer: "4" } },
    { type: "multiple_choice", stem: "Solve: 3x-4\u22648", data: { options: [{id:"A",text:"x \u2264 4"},{id:"B",text:"x \u2265 4"},{id:"C",text:"x \u2264 12"},{id:"D",text:"x \u2264 -4"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Solve: 2-3x<11", data: { options: [{id:"A",text:"x > -3"},{id:"B",text:"x < -3"},{id:"C",text:"x > 3"},{id:"D",text:"x < 3"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Solve: 5x+2\u226527", data: { options: [{id:"A",text:"x \u2265 5"},{id:"B",text:"x \u2264 5"},{id:"C",text:"x \u2265 29"},{id:"D",text:"x \u2265 25"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Solve: -2x+6>0", data: { options: [{id:"A",text:"x < 3"},{id:"B",text:"x > 3"},{id:"C",text:"x < -3"},{id:"D",text:"x > -3"}], correctId: "A" } },
    { type: "multiple_choice", stem: "When solving an inequality, when must the inequality sign be reversed?", data: { options: [{id:"A",text:"When multiplying or dividing both sides by a negative number"},{id:"B",text:"When adding a positive number to both sides"},{id:"C",text:"Whenever the variable is on the left side"},{id:"D",text:"The sign never needs to be reversed"}], correctId: "A" } },
  ],

  "3": [
    { type: "equation_numeric", stem: "Solve ax=6 for a, given that x=2.", data: { answerLabel: "a =", correctAnswer: "3" } },
    { type: "equation_numeric", stem: "Solve ax+3=11 for a, given that x=4.", data: { answerLabel: "a =", correctAnswer: "2" } },
    { type: "equation_numeric", stem: "For what value of a does the equation ax=15 have solution x=5?", data: { answerLabel: "a =", correctAnswer: "3" } },
    { type: "equation_numeric", stem: "For what value of b does the inequality 2x>b have boundary value x=7?", data: { answerLabel: "b =", correctAnswer: "14" } },
    { type: "equation_numeric", stem: "Solve ax-4=10 for a, given that x=7.", data: { answerLabel: "a =", correctAnswer: "2" } },
    { type: "multiple_choice", stem: "Solve for x in terms of a and b: ax+b=c", data: { options: [{id:"A",text:"x = frac{c-b}{a}"},{id:"B",text:"x = frac{c+b}{a}"},{id:"C",text:"x = frac{a-b}{c}"},{id:"D",text:"x = c-b-a"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Solve for x: frac{x}{a}=b (where a\u22600)", data: { options: [{id:"A",text:"x = ab"},{id:"B",text:"x = frac{a}{b}"},{id:"C",text:"x = frac{b}{a}"},{id:"D",text:"x = a+b"}], correctId: "A" } },
    { type: "multiple_choice", stem: "For the inequality ax>b to reverse direction when solved for x, what must be true about a?", data: { options: [{id:"A",text:"a is negative"},{id:"B",text:"a is positive"},{id:"C",text:"a equals zero"},{id:"D",text:"a is greater than b"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Solve for x: a(x-2)=b", data: { options: [{id:"A",text:"x = frac{b}{a}+2"},{id:"B",text:"x = frac{b}{a}-2"},{id:"C",text:"x = ab+2"},{id:"D",text:"x = a+b+2"}], correctId: "A" } },
    { type: "multiple_choice", stem: "For what value of a does the equation ax=0 have every real number as a solution?", data: { options: [{id:"A",text:"a = 0"},{id:"B",text:"a = 1"},{id:"C",text:"a can be any nonzero number"},{id:"D",text:"No value of a makes this true"}], correctId: "A" } },
  ],

  "4": [
    { type: "equation_numeric", stem: "Solve by taking square roots: x^{2}=49. Give the positive solution.", data: { answerLabel: "Positive x =", correctAnswer: "7" } },
    { type: "equation_numeric", stem: "Solve by completing the square or factoring: x^{2}-6x+9=0.", data: { answerLabel: "x =", correctAnswer: "3" } },
    { type: "equation_numeric", stem: "Solve by factoring: x^{2}-2x-8=0. Give the larger solution.", data: { answerLabel: "Larger x =", correctAnswer: "4" } },
    { type: "equation_numeric", stem: "Solve by taking square roots: 2x^{2}-8=0. Give the positive solution.", data: { answerLabel: "Positive x =", correctAnswer: "2" } },
    { type: "equation_numeric", stem: "Solve by factoring: x^{2}+6x+5=0. Give the smaller solution.", data: { answerLabel: "Smaller x =", correctAnswer: "-5" } },
    { type: "multiple_choice", stem: "Solve using the quadratic formula: x^{2}-5x+6=0", data: { options: [{id:"A",text:"x=2 and x=3"},{id:"B",text:"x=-2 and x=-3"},{id:"C",text:"x=5 and x=6"},{id:"D",text:"x=1 and x=6"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Which method is most efficient for solving x^{2}=64?", data: { options: [{id:"A",text:"Taking square roots of both sides"},{id:"B",text:"Completing the square"},{id:"C",text:"Factoring by grouping"},{id:"D",text:"Graphing only"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Solve by factoring: x^{2}+7x+12=0", data: { options: [{id:"A",text:"x=-3 and x=-4"},{id:"B",text:"x=3 and x=4"},{id:"C",text:"x=-3 and x=4"},{id:"D",text:"x=7 and x=12"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Solve by completing the square: x^{2}+4x-5=0", data: { options: [{id:"A",text:"x=1 and x=-5"},{id:"B",text:"x=-1 and x=5"},{id:"C",text:"x=4 and x=-5"},{id:"D",text:"x=2 and x=-2"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Which is the correct first step for solving x^{2}-3x=10 by factoring?", data: { options: [{id:"A",text:"Rewrite as x^{2}-3x-10=0"},{id:"B",text:"Divide both sides by x"},{id:"C",text:"Take the square root of both sides"},{id:"D",text:"Add 10 to both sides without rearranging"}], correctId: "A" } },
  ],

  "5": [
    { type: "equation_numeric", stem: "Find the discriminant of x^{2}+2x+5=0. Does it indicate real or complex solutions? Enter the discriminant value.", data: { answerLabel: "Discriminant =", correctAnswer: "-16" } },
    { type: "equation_numeric", stem: "Find the discriminant of x^{2}-4x+4=0.", data: { answerLabel: "Discriminant =", correctAnswer: "0" } },
    { type: "equation_numeric", stem: "Find the discriminant of x^{2}-5x+6=0.", data: { answerLabel: "Discriminant =", correctAnswer: "1" } },
    { type: "equation_numeric", stem: "Find the discriminant of x^{2}+x+1=0.", data: { answerLabel: "Discriminant =", correctAnswer: "-3" } },
    { type: "equation_numeric", stem: "How many real solutions does a quadratic equation have if its discriminant is negative?", data: { answerLabel: "Number of real solutions =", correctAnswer: "0" } },
    { type: "multiple_choice", stem: "A quadratic equation has discriminant b^{2}-4ac = -16. What does this indicate?", data: { options: [{id:"A",text:"No real solutions; the solutions are complex"},{id:"B",text:"Two distinct real solutions"},{id:"C",text:"Exactly one real solution"},{id:"D",text:"Infinitely many real solutions"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Does x^{2}+x+1=0 have real solutions?", data: { options: [{id:"A",text:"No, its discriminant is negative"},{id:"B",text:"Yes, it has two real solutions"},{id:"C",text:"Yes, it has exactly one real solution"},{id:"D",text:"Cannot be determined"}], correctId: "A" } },
    { type: "multiple_choice", stem: "A discriminant of zero indicates:", data: { options: [{id:"A",text:"Exactly one real solution (a repeated root)"},{id:"B",text:"No real solutions"},{id:"C",text:"Two distinct real solutions"},{id:"D",text:"Infinitely many solutions"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Which quadratic equation has complex (non-real) solutions?", data: { options: [{id:"A",text:"x^{2}+9=0"},{id:"B",text:"x^{2}-9=0"},{id:"C",text:"x^{2}-6x+9=0"},{id:"D",text:"x^{2}-5x+6=0"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Without fully solving, how can you tell x^{2}-4x+13=0 has complex solutions?", data: { options: [{id:"A",text:"Its discriminant, 16-52=-36, is negative"},{id:"B",text:"It has an x^{2} term"},{id:"C",text:"The constant term is positive"},{id:"D",text:"It cannot be factored with integers"}], correctId: "A" } },
  ],

  "6": [
    { type: "equation_numeric", stem: "Solve x^{2}+2x+5=0. Write the solutions in the form a\u00b1bi. What is the value of a?", data: { answerLabel: "a =", correctAnswer: "-1" } },
    { type: "equation_numeric", stem: "Solve x^{2}+2x+5=0. Write the solutions in the form a\u00b1bi. What is the value of b?", data: { answerLabel: "b =", correctAnswer: "2" } },
    { type: "equation_numeric", stem: "Solve x^{2}-4x+13=0. Write the solutions as a\u00b1bi. What is the value of a?", data: { answerLabel: "a =", correctAnswer: "2" } },
    { type: "equation_numeric", stem: "Solve x^{2}-4x+13=0. Write the solutions as a\u00b1bi. What is the value of b?", data: { answerLabel: "b =", correctAnswer: "3" } },
    { type: "equation_numeric", stem: "Solve x^{2}+9=0 and write the positive solution in the form bi.", data: { answerLabel: "Solution =", correctAnswer: "3i" } },
    { type: "multiple_choice", stem: "The solutions to x^{2}+2x+5=0 are:", data: { options: [{id:"A",text:"-1 \u00b1 2i"},{id:"B",text:"1 \u00b1 2i"},{id:"C",text:"-1 \u00b1 5i"},{id:"D",text:"2 \u00b1 i"}], correctId: "A" } },
    { type: "multiple_choice", stem: "The solutions to x^{2}-4x+13=0 are:", data: { options: [{id:"A",text:"2 \u00b1 3i"},{id:"B",text:"-2 \u00b1 3i"},{id:"C",text:"4 \u00b1 3i"},{id:"D",text:"2 \u00b1 13i"}], correctId: "A" } },
    { type: "multiple_choice", stem: "The solutions to x^{2}+9=0 are:", data: { options: [{id:"A",text:"\u00b13i"},{id:"B",text:"\u00b19i"},{id:"C",text:"\u00b13"},{id:"D",text:"\u00b19"}], correctId: "A" } },
    { type: "multiple_choice", stem: "In the complex solution 3+4i, what is the real part?", data: { options: [{id:"A",text:"3"},{id:"B",text:"4"},{id:"C",text:"4i"},{id:"D",text:"3+4i"}], correctId: "A" } },
    { type: "multiple_choice", stem: "In the complex solution -2-5i, what is the imaginary part?", data: { options: [{id:"A",text:"-5"},{id:"B",text:"-2"},{id:"C",text:"5"},{id:"D",text:"-5i"}], correctId: "A" } },
  ],

  "7": [
    { type: "equation_numeric", stem: "The equation 2x+6=10 is equivalent to x+3=5 (dividing by 2). Solve x+3=5.", data: { answerLabel: "x =", correctAnswer: "2" } },
    { type: "equation_numeric", stem: "The equation 3(x-2)=12 is equivalent to x-2=4. Solve x-2=4.", data: { answerLabel: "x =", correctAnswer: "6" } },
    { type: "equation_numeric", stem: "The equation x^{2}-4=0 is equivalent to (x-2)(x+2)=0. Give the positive solution.", data: { answerLabel: "Positive x =", correctAnswer: "2" } },
    { type: "equation_numeric", stem: "The equation 4x=20 is equivalent to x=5. Confirm by solving 4x=20 directly.", data: { answerLabel: "x =", correctAnswer: "5" } },
    { type: "equation_numeric", stem: "The equation 2(x+1)=2x+2 is true for how many values of x?", data: { answerLabel: "Number of solutions =", correctAnswer: "infinite" } },
    { type: "multiple_choice", stem: "Which equation is equivalent to 2x+6=10?", data: { options: [{id:"A",text:"x+3=5"},{id:"B",text:"x+6=10"},{id:"C",text:"2x=6"},{id:"D",text:"x=6"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Which equation is equivalent to 3(x-2)=12?", data: { options: [{id:"A",text:"x-2=4"},{id:"B",text:"x-2=12"},{id:"C",text:"3x=12"},{id:"D",text:"x=2"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Which equation is equivalent to x^{2}-9=0?", data: { options: [{id:"A",text:"(x-3)(x+3)=0"},{id:"B",text:"(x-9)(x+1)=0"},{id:"C",text:"x=9"},{id:"D",text:"x^{2}=0"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Two equations are equivalent if:", data: { options: [{id:"A",text:"They have the exact same solution set"},{id:"B",text:"They both contain the variable x"},{id:"C",text:"They look the same when simplified partway"},{id:"D",text:"They both equal zero"}], correctId: "A" } },
    { type: "multiple_choice", stem: "Which equation is equivalent to 5x-10=0?", data: { options: [{id:"A",text:"x-2=0"},{id:"B",text:"x-10=0"},{id:"C",text:"5x=0"},{id:"D",text:"x=10"}], correctId: "A" } },
  ],
};
