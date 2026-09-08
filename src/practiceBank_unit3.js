// Static practice bank -- Unit 3: Polynomial Functions, Expressions, and Equations (Modules 5–7)
// Part of the free, no-API-cost Topic Practice Generator question bank.
// Combined into the full PRACTICE_BANK by practiceBank.js.

export const UNIT_3_BANK = {
  "5.1": [
    {
      "type": "multiple_choice",
      "stem": "The graph of g(x) = f(x) - 3 is obtained from the graph of f(x) by which transformation?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Shift down 3 units"
          },
          {
            "id": "B",
            "text": "Shift up 3 units"
          },
          {
            "id": "C",
            "text": "Shift left 3 units"
          },
          {
            "id": "D",
            "text": "Shift right 3 units"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "The graph of g(x) = f(x+2) is obtained from the graph of f(x) by which transformation?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Shift left 2 units"
          },
          {
            "id": "B",
            "text": "Shift right 2 units"
          },
          {
            "id": "C",
            "text": "Shift up 2 units"
          },
          {
            "id": "D",
            "text": "Shift down 2 units"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "matching_tables",
      "stem": "Match each function to the transformation applied to the parent function f(x).",
      "data": {
        "rows": [
          "g(x) = f(x) + 4",
          "g(x) = f(x - 5)",
          "g(x) = -f(x)"
        ],
        "columns": [
          "Shift up 4",
          "Shift right 5",
          "Reflect over x-axis"
        ],
        "correct": [
          0,
          1,
          2
        ]
      }
    },
    {
      "type": "multi_select",
      "stem": "The function f has domain -5 ≤ x ≤ 5. Which of the following describe the domain of g(x) = f(x - 3)? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "-2 ≤ x ≤ 8"
          },
          {
            "id": "B",
            "text": "All x where -5 ≤ x - 3 ≤ 5"
          },
          {
            "id": "C",
            "text": "-8 ≤ x ≤ 2"
          },
          {
            "id": "D",
            "text": "-5 ≤ x ≤ 5"
          }
        ],
        "correctIds": [
          "A",
          "B"
        ]
      }
    },
    {
      "type": "drag_and_drop",
      "stem": "Complete the description of the transformation.",
      "data": {
        "template": "The graph of h(x) = 2f(x) is a vertical ___ of the graph of f(x) by a factor of 2.",
        "tiles": [
          "stretch",
          "compression",
          "shift"
        ],
        "correctTile": "stretch"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "If f(3) = 7, and g(x) = f(x) + 5, what is g(3)?",
      "data": {
        "answerLabel": "g(3) =",
        "correctAnswer": "12"
      }
    }
  ],
  "5.2": [
    {
      "type": "equation_numeric",
      "stem": "Find the inverse of f(x) = x + 7.",
      "data": {
        "answerLabel": "f^{-1}(x) =",
        "correctAnswer": "x - 7"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "What is the inverse of f(x) = 3x - 6?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "f^{-1}(x) = frac{x+6}{3}"
          },
          {
            "id": "B",
            "text": "f^{-1}(x) = frac{x-6}{3}"
          },
          {
            "id": "C",
            "text": "f^{-1}(x) = 3x+6"
          },
          {
            "id": "D",
            "text": "f^{-1}(x) = frac{x}{3}+6"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "matching_tables",
      "stem": "Match each function to its inverse.",
      "data": {
        "rows": [
          "f(x) = x - 4",
          "f(x) = 2x",
          "f(x) = frac{x}{5}"
        ],
        "columns": [
          "f^{-1}(x) = x+4",
          "f^{-1}(x) = frac{x}{2}",
          "f^{-1}(x) = 5x"
        ],
        "correct": [
          0,
          1,
          2
        ]
      }
    },
    {
      "type": "multi_select",
      "stem": "Which pairs of functions are inverses of each other? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "f(x)=x+9 and g(x)=x-9"
          },
          {
            "id": "B",
            "text": "f(x)=2x and g(x)=frac{x}{2}"
          },
          {
            "id": "C",
            "text": "f(x)=x-3 and g(x)=3-x"
          },
          {
            "id": "D",
            "text": "f(x)=4x and g(x)=4x"
          }
        ],
        "correctIds": [
          "A",
          "B"
        ]
      }
    },
    {
      "type": "drag_and_drop",
      "stem": "Complete the verification statement.",
      "data": {
        "template": "To verify that f(x) and g(x) are inverse functions, you must check that f(g(x)) = ___ and g(f(x)) = x.",
        "tiles": [
          "x",
          "0",
          "1"
        ],
        "correctTile": "x"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "If f(x) = x - 10, find f^{-1}(5).",
      "data": {
        "answerLabel": "f^{-1}(5) =",
        "correctAnswer": "15"
      }
    }
  ],
  "5.3": [
    {
      "type": "multiple_choice",
      "stem": "What is the end behavior of the graph of f(x) = x^{3}?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Falls left, rises right"
          },
          {
            "id": "B",
            "text": "Rises left, falls right"
          },
          {
            "id": "C",
            "text": "Rises both sides"
          },
          {
            "id": "D",
            "text": "Falls both sides"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "How many x-intercepts does f(x) = x^{3} - 4x have?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "3"
          },
          {
            "id": "B",
            "text": "1"
          },
          {
            "id": "C",
            "text": "2"
          },
          {
            "id": "D",
            "text": "4"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Find all real zeros of f(x) = x^{3} - x. List the smallest zero first, separated by commas.",
      "data": {
        "answerLabel": "Zeros =",
        "correctAnswer": "-1, 0, 1"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements are true about the graph of f(x) = -x^{3}? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "The graph falls to the right as x increases"
          },
          {
            "id": "B",
            "text": "The graph rises to the left as x decreases"
          },
          {
            "id": "C",
            "text": "The function has exactly one real zero, at x=0"
          },
          {
            "id": "D",
            "text": "The graph is a reflection of y=x^{3} over the y-axis"
          }
        ],
        "correctIds": [
          "A",
          "B",
          "C"
        ]
      }
    },
    {
      "type": "matching_tables",
      "stem": "Match each cubic function to its number of distinct real zeros.",
      "data": {
        "rows": [
          "f(x) = x^{3}",
          "f(x) = x^{3} - x",
          "f(x) = x^{3} + 1"
        ],
        "columns": [
          "1 real zero",
          "3 real zeros"
        ],
        "correct": [
          0,
          1,
          0
        ]
      }
    },
    {
      "type": "drag_and_drop",
      "stem": "Complete the transformation description.",
      "data": {
        "template": "The graph of f(x) = (x-2)^{3} is the graph of y = x^{3} shifted ___ units to the right.",
        "tiles": [
          "2",
          "-2",
          "3"
        ],
        "correctTile": "2"
      }
    }
  ],
  "5.4": [
    {
      "type": "multiple_choice",
      "stem": "A polynomial function has degree 4 with a positive leading coefficient. What is its end behavior?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Rises left and rises right"
          },
          {
            "id": "B",
            "text": "Falls left and falls right"
          },
          {
            "id": "C",
            "text": "Falls left, rises right"
          },
          {
            "id": "D",
            "text": "Rises left, falls right"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A polynomial function has zeros at x = -3, x = 1, and x = 4. Write a possible equation for this polynomial in factored form using leading coefficient 1.",
      "data": {
        "answerLabel": "f(x) =",
        "correctAnswer": "(x+3)(x-1)(x-4)"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "A degree 3 polynomial has zeros at x = -2 (multiplicity 2) and x = 5. What is the factored form?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "(x+2)^{2}(x-5)"
          },
          {
            "id": "B",
            "text": "(x+2)(x-5)"
          },
          {
            "id": "C",
            "text": "(x-2)^{2}(x+5)"
          },
          {
            "id": "D",
            "text": "(x+2)(x+2)(x+5)"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multi_select",
      "stem": "A polynomial graph touches the x-axis at x=3 without crossing it, and crosses the x-axis at x=-1. Which statements must be true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "The zero at x=3 has even multiplicity"
          },
          {
            "id": "B",
            "text": "The zero at x=-1 has odd multiplicity"
          },
          {
            "id": "C",
            "text": "The zero at x=3 has odd multiplicity"
          },
          {
            "id": "D",
            "text": "The polynomial has degree at least 3"
          }
        ],
        "correctIds": [
          "A",
          "B",
          "D"
        ]
      }
    },
    {
      "type": "matching_tables",
      "stem": "Match each end behavior to the correct degree and leading coefficient sign.",
      "data": {
        "rows": [
          "Rises left, rises right",
          "Falls left, falls right",
          "Falls left, rises right"
        ],
        "columns": [
          "Even degree, positive leading coefficient",
          "Even degree, negative leading coefficient",
          "Odd degree, positive leading coefficient"
        ],
        "correct": [
          0,
          1,
          2
        ]
      }
    },
    {
      "type": "equation_numeric",
      "stem": "How many turning points can a degree 5 polynomial have at most?",
      "data": {
        "answerLabel": "Maximum turning points =",
        "correctAnswer": "4"
      }
    }
  ],
  "6.1": [
    {
      "type": "equation_numeric",
      "stem": "Simplify: (3x^{2} + 5x - 2) + (2x^{2} - 3x + 7). Write the result in standard form.",
      "data": {
        "answerLabel": "Sum =",
        "correctAnswer": "5x^{2} + 2x + 5"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Subtract: (4x^{3} - 2x + 1) - (x^{3} + 5x - 6).",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "3x^{3} - 7x + 7"
          },
          {
            "id": "B",
            "text": "3x^{3} + 3x - 5"
          },
          {
            "id": "C",
            "text": "5x^{3} - 7x + 7"
          },
          {
            "id": "D",
            "text": "3x^{3} - 7x - 5"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "matching_tables",
      "stem": "Match each operation to its simplified result.",
      "data": {
        "rows": [
          "(2x^{2}+3x) + (x^{2} - x)",
          "(2x^{2}+3x) - (x^{2}-x)",
          "(x^{2}+3x) + (2x^{2}-3x)"
        ],
        "columns": [
          "3x^{2}+2x",
          "x^{2}+4x",
          "3x^{2}"
        ],
        "correct": [
          0,
          1,
          2
        ]
      }
    },
    {
      "type": "drag_and_drop",
      "stem": "Complete the subtraction.",
      "data": {
        "template": "(5x^{2} - 3x + 8) - (2x^{2} + 4x - 1) = 3x^{2} + ___ + 9",
        "tiles": [
          "-7x",
          "7x",
          "-1x"
        ],
        "correctTile": "-7x"
      }
    },
    {
      "type": "multi_select",
      "stem": "Select all expressions equivalent to (3x^{2}+5x-4) - (x^{2}-2x+6). Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "2x^{2}+7x-10"
          },
          {
            "id": "B",
            "text": "2x^{2}+3x-10"
          },
          {
            "id": "C",
            "text": "2x^{2}+7x+2"
          },
          {
            "id": "D",
            "text": "4x^{2}+7x-10"
          },
          {
            "id": "E",
            "text": "7x - 10 + 2x^{2}"
          }
        ],
        "correctIds": [
          "A",
          "E"
        ]
      }
    },
    {
      "type": "equation_numeric",
      "stem": "If P(x) = 2x^{2} - 3x + 1 and Q(x) = -x^{2} + 4x - 5, find P(x) + Q(x) in standard form.",
      "data": {
        "answerLabel": "P(x) + Q(x) =",
        "correctAnswer": "x^{2} + x - 4"
      }
    }
  ],
  "6.2": [
    {
      "type": "equation_numeric",
      "stem": "Multiply: (x+4)(x-3). Write the result in standard form.",
      "data": {
        "answerLabel": "Product =",
        "correctAnswer": "x^{2} + x - 12"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "What is the product of (2x-1)(3x+5)?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "6x^{2}+7x-5"
          },
          {
            "id": "B",
            "text": "6x^{2}-5"
          },
          {
            "id": "C",
            "text": "6x^{2}-7x-5"
          },
          {
            "id": "D",
            "text": "6x^{2}+7x+5"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "drag_and_drop",
      "stem": "Complete the product.",
      "data": {
        "template": "(x+2)^{2} = x^{2} + ___ + 4",
        "tiles": [
          "4x",
          "2x",
          "8x"
        ],
        "correctTile": "4x"
      }
    },
    {
      "type": "matching_tables",
      "stem": "Match each product to its simplified form.",
      "data": {
        "rows": [
          "(x-5)(x+5)",
          "(x-5)^{2}",
          "(x+5)^{2}"
        ],
        "columns": [
          "x^{2}-25",
          "x^{2}-10x+25",
          "x^{2}+10x+25"
        ],
        "correct": [
          0,
          1,
          2
        ]
      }
    },
    {
      "type": "multi_select",
      "stem": "Which expressions are equivalent to (3x)(2x^{2})? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "6x^{3}"
          },
          {
            "id": "B",
            "text": "5x^{3}"
          },
          {
            "id": "C",
            "text": "6x^{2}"
          },
          {
            "id": "D",
            "text": "frac{6x^{3}}{1}"
          }
        ],
        "correctIds": [
          "A",
          "D"
        ]
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Multiply (x-1)(x^{2}+x+1) and write the result in standard form.",
      "data": {
        "answerLabel": "Product =",
        "correctAnswer": "x^{3} - 1"
      }
    }
  ],
  "6.3": [
    {
      "type": "equation_numeric",
      "stem": "Use Pascal's Triangle to find the coefficient of the x^{2} term in the expansion of (x+1)^{4}.",
      "data": {
        "answerLabel": "Coefficient =",
        "correctAnswer": "6"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "What is the expansion of (x+3)^{2}?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "x^{2}+6x+9"
          },
          {
            "id": "B",
            "text": "x^{2}+9"
          },
          {
            "id": "C",
            "text": "x^{2}+3x+9"
          },
          {
            "id": "D",
            "text": "x^{2}+6x+6"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "fill_in_table",
      "stem": "Complete the row of Pascal's Triangle for exponent 4 (the binomial coefficients C(4,0) through C(4,4)).",
      "data": {
        "xValues": [
          "C(4,0)",
          "C(4,1)",
          "C(4,2)",
          "C(4,3)",
          "C(4,4)"
        ],
        "yValues": [
          "1",
          "4",
          "?",
          "4",
          "1"
        ],
        "correctYValues": [
          "1",
          "4",
          "6",
          "4",
          "1"
        ],
        "rowLabel": "Value"
      }
    },
    {
      "type": "drag_and_drop",
      "stem": "Complete the term from the expansion of (x+y)^{3}.",
      "data": {
        "template": "In the expansion of (x+y)^{3}, one term is ___ x^{2}y",
        "tiles": [
          "3",
          "2",
          "6"
        ],
        "correctTile": "3"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which of the following are terms in the expansion of (x+2)^{3}? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "x^{3}"
          },
          {
            "id": "B",
            "text": "6x^{2}"
          },
          {
            "id": "C",
            "text": "3x^{2}"
          },
          {
            "id": "D",
            "text": "12x"
          },
          {
            "id": "E",
            "text": "6x"
          }
        ],
        "correctIds": [
          "A",
          "B",
          "D"
        ]
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Find the coefficient of the x^{3}y^{2} term in the expansion of (x+y)^{5}.",
      "data": {
        "answerLabel": "Coefficient =",
        "correctAnswer": "10"
      }
    }
  ],
  "6.4": [
    {
      "type": "equation_numeric",
      "stem": "Factor completely: x^{2} - 9",
      "data": {
        "answerLabel": "Factored form =",
        "correctAnswer": "(x-3)(x+3)"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Factor: x^{2} + 7x + 12",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "(x+3)(x+4)"
          },
          {
            "id": "B",
            "text": "(x+2)(x+6)"
          },
          {
            "id": "C",
            "text": "(x-3)(x-4)"
          },
          {
            "id": "D",
            "text": "(x+1)(x+12)"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "matching_tables",
      "stem": "Match each expression to its factored form.",
      "data": {
        "rows": [
          "x^{2}-16",
          "x^{2}+8x+16",
          "x^{2}-8x+16"
        ],
        "columns": [
          "(x-4)^{2}",
          "(x+4)(x-4)",
          "(x+4)^{2}"
        ],
        "correct": [
          1,
          2,
          0
        ]
      }
    },
    {
      "type": "drag_and_drop",
      "stem": "Complete the factorization.",
      "data": {
        "template": "x^{2} - 5x - 14 = (x - 7)(___)",
        "tiles": [
          "x + 2",
          "x - 2",
          "x + 7"
        ],
        "correctTile": "x + 2"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which of the following are correct factorizations of 2x^{2} + 5x - 3? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "(2x-1)(x+3)"
          },
          {
            "id": "B",
            "text": "(2x+1)(x-3)"
          },
          {
            "id": "C",
            "text": "(x-1)(2x+3)"
          },
          {
            "id": "D",
            "text": "(x+3)(2x-1)"
          }
        ],
        "correctIds": [
          "A",
          "D"
        ]
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Factor out the greatest common factor: 6x^{3} + 9x^{2}",
      "data": {
        "answerLabel": "Factored form =",
        "correctAnswer": "3x^{2}(2x + 3)"
      }
    }
  ],
  "6.5": [
    {
      "type": "equation_numeric",
      "stem": "Divide: frac{6x^{3}}{2x}. Simplify your answer.",
      "data": {
        "answerLabel": "Quotient =",
        "correctAnswer": "3x^{2}"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Use polynomial long division to divide (x^{2}+5x+6) by (x+2).",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "x + 3"
          },
          {
            "id": "B",
            "text": "x + 2"
          },
          {
            "id": "C",
            "text": "x + 4"
          },
          {
            "id": "D",
            "text": "x^{2} + 3"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "fill_in_table",
      "stem": "Use synthetic division to divide x^{3}-2x^{2}-5x+6 by (x-1). Complete the bottom row of the synthetic division (the result of each bring-down, multiply, and add step).",
      "data": {
        "xValues": [
          "1",
          "-2",
          "-5",
          "6"
        ],
        "yValues": [
          "1",
          "?",
          "?",
          "0"
        ],
        "correctYValues": [
          "1",
          "-1",
          "-6",
          "0"
        ],
        "rowLabel": "Result"
      }
    },
    {
      "type": "drag_and_drop",
      "stem": "Complete the division.",
      "data": {
        "template": "frac{x^{2}-9}{x-3} = ___",
        "tiles": [
          "x + 3",
          "x - 3",
          "x + 9"
        ],
        "correctTile": "x + 3"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which of the following divisions result in a remainder of 0? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "(x^{2}-4) ÷ (x-2)"
          },
          {
            "id": "B",
            "text": "(x^{2}-4) ÷ (x+3)"
          },
          {
            "id": "C",
            "text": "(x^{2}+3x+2) ÷ (x+1)"
          },
          {
            "id": "D",
            "text": "(x^{2}+3x+2) ÷ (x+2)"
          },
          {
            "id": "E",
            "text": "(x^{2}+5x+6) ÷ (x+1)"
          }
        ],
        "correctIds": [
          "A",
          "C",
          "D"
        ]
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Divide (2x^{2}+7x-4) by (2x-1) and give the quotient.",
      "data": {
        "answerLabel": "Quotient =",
        "correctAnswer": "x + 4"
      }
    }
  ],
  "7.1": [
    {
      "type": "equation_numeric",
      "stem": "Use the Remainder Theorem to find the remainder when x^{3} - 4x + 5 is divided by x - 2.",
      "data": {
        "answerLabel": "Remainder =",
        "correctAnswer": "5"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "According to the Rational Root Theorem, which of the following is a possible rational root of x^{3} - 2x^{2} - 5x + 6 = 0?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "3"
          },
          {
            "id": "B",
            "text": "4"
          },
          {
            "id": "C",
            "text": "5"
          },
          {
            "id": "D",
            "text": "frac{1}{2}"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Find all rational roots of x^{3} - 6x^{2} + 11x - 6 = 0. List from smallest to largest, separated by commas.",
      "data": {
        "answerLabel": "Roots =",
        "correctAnswer": "1, 2, 3"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which of the following are actual roots of x^{3} + x^{2} - 4x - 4 = 0? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "-1"
          },
          {
            "id": "B",
            "text": "2"
          },
          {
            "id": "C",
            "text": "-2"
          },
          {
            "id": "D",
            "text": "1"
          },
          {
            "id": "E",
            "text": "4"
          }
        ],
        "correctIds": [
          "A",
          "B",
          "C"
        ]
      }
    },
    {
      "type": "matching_tables",
      "stem": "Match each equation to one of its roots.",
      "data": {
        "rows": [
          "x^{2} - 9 = 0",
          "x^{2} - 4 = 0",
          "x^{2} - 25 = 0"
        ],
        "columns": [
          "x = 3",
          "x = 2",
          "x = 5"
        ],
        "correct": [
          0,
          1,
          2
        ]
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Use the Remainder Theorem to determine f(-1) if f(x) = 2x^{3} + x^{2} - 3x + 4.",
      "data": {
        "answerLabel": "f(-1) =",
        "correctAnswer": "6"
      }
    }
  ],
  "7.2": [
    {
      "type": "equation_numeric",
      "stem": "Solve: x^{2} + 4 = 0. Write your answer using i.",
      "data": {
        "answerLabel": "x =",
        "correctAnswer": "2i, -2i"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "According to the Fundamental Theorem of Algebra, how many total roots, counting complex and repeated roots, does a degree 4 polynomial have?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "4"
          },
          {
            "id": "B",
            "text": "2"
          },
          {
            "id": "C",
            "text": "8"
          },
          {
            "id": "D",
            "text": "It depends on the polynomial"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Solve x^{2} - 2x + 5 = 0 using the quadratic formula. Write both complex solutions separated by a comma.",
      "data": {
        "answerLabel": "x =",
        "correctAnswer": "1 + 2i, 1 - 2i"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A degree 4 polynomial with real coefficients has roots 3, -1, and 2+i. What is the fourth root?",
      "data": {
        "answerLabel": "Fourth root =",
        "correctAnswer": "2 - i"
      }
    },
    {
      "type": "matching_tables",
      "stem": "Match each quadratic equation to its solution type.",
      "data": {
        "rows": [
          "x^{2}-4=0",
          "x^{2}+4=0",
          "x^{2}-4x+4=0"
        ],
        "columns": [
          "Two real solutions",
          "Two complex solutions",
          "One repeated real solution"
        ],
        "correct": [
          0,
          1,
          2
        ]
      }
    },
    {
      "type": "multi_select",
      "stem": "Which of the following equations have at least one complex, non-real solution? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "x^{2}+1=0"
          },
          {
            "id": "B",
            "text": "x^{2}-1=0"
          },
          {
            "id": "C",
            "text": "x^{2}+2x+5=0"
          },
          {
            "id": "D",
            "text": "x^{2}-6x+9=0"
          }
        ],
        "correctIds": [
          "A",
          "C"
        ]
      }
    }
  ]
};
