// Static practice bank -- Unit 4: Rational Functions, Expressions, and Equations (Modules 8–9)
// Part of the free, no-API-cost Topic Practice Generator question bank.
// Combined into the full PRACTICE_BANK by practiceBank.js.

export const UNIT_4_BANK = {
  "8.1": [
    {
      "type": "equation_numeric",
      "stem": "What is the vertical asymptote of f(x) = frac{1}{x-4}?",
      "data": {
        "answerLabel": "Vertical asymptote: x =",
        "correctAnswer": "4"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "What is the domain of f(x) = frac{3}{x+2}?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "All real numbers except x = -2"
          },
          {
            "id": "B",
            "text": "All real numbers except x = 2"
          },
          {
            "id": "C",
            "text": "All real numbers except x = 0"
          },
          {
            "id": "D",
            "text": "All real numbers"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "What is the horizontal asymptote of f(x) = frac{5}{x} + 3?",
      "data": {
        "answerLabel": "Horizontal asymptote: y =",
        "correctAnswer": "3"
      }
    },
    {
      "type": "matching_tables",
      "stem": "Match each function to its vertical asymptote.",
      "data": {
        "rows": [
          "f(x) = frac{2}{x-3}",
          "f(x) = frac{1}{x+5}",
          "f(x) = frac{4}{x}"
        ],
        "columns": [
          "x = 3",
          "x = -5",
          "x = 0"
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
      "stem": "Which statements are true about the graph of f(x) = frac{1}{x-2} + 1? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "The vertical asymptote is x = 2"
          },
          {
            "id": "B",
            "text": "The horizontal asymptote is y = 1"
          },
          {
            "id": "C",
            "text": "The graph passes through the origin"
          },
          {
            "id": "D",
            "text": "The domain excludes x = 2"
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
      "type": "drag_and_drop",
      "stem": "Complete the transformed equation.",
      "data": {
        "template": "The graph of f(x) = frac{1}{x} shifted right 3 units and up 2 units has equation f(x) = frac{1}{x-___} + 2.",
        "tiles": [
          "3",
          "-3",
          "2"
        ],
        "correctTile": "3"
      }
    }
  ],
  "8.2": [
    {
      "type": "equation_numeric",
      "stem": "Find the vertical asymptote(s) of f(x) = frac{x+1}{(x-2)(x+4)}. List both, smallest first, separated by a comma.",
      "data": {
        "answerLabel": "Vertical asymptotes: x =",
        "correctAnswer": "-4, 2"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "The function f(x) = frac{(x-3)(x+1)}{x-3} has a hole at which x-value?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "x = 3"
          },
          {
            "id": "B",
            "text": "x = -1"
          },
          {
            "id": "C",
            "text": "x = 0"
          },
          {
            "id": "D",
            "text": "There is no hole"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which of the following rational functions have a horizontal asymptote at y = 0? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "f(x) = frac{1}{x^{2}}"
          },
          {
            "id": "B",
            "text": "f(x) = frac{x}{x^{2}+1}"
          },
          {
            "id": "C",
            "text": "f(x) = frac{x^{2}}{x+1}"
          },
          {
            "id": "D",
            "text": "f(x) = frac{3}{x-5}"
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
      "stem": "Match each rational function to its number of vertical asymptotes.",
      "data": {
        "rows": [
          "f(x) = frac{1}{(x-1)(x+2)}",
          "f(x) = frac{x}{x^{2}-9}",
          "f(x) = frac{x+1}{x^{2}+1}"
        ],
        "columns": [
          "0 vertical asymptotes",
          "2 vertical asymptotes"
        ],
        "correct": [
          1,
          1,
          0
        ]
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Find the y-intercept of f(x) = frac{x-2}{x+3}.",
      "data": {
        "answerLabel": "y-intercept =",
        "correctAnswer": "-frac{2}{3}"
      }
    },
    {
      "type": "drag_and_drop",
      "stem": "Complete the simplification.",
      "data": {
        "template": "The function f(x) = frac{x^{2}-4}{x-2} simplifies to f(x) = x + ___ (for x ≠ 2).",
        "tiles": [
          "2",
          "-2",
          "4"
        ],
        "correctTile": "2"
      }
    }
  ],
  "9.1": [
    {
      "type": "equation_numeric",
      "stem": "Add: frac{2}{x} + frac{3}{x}. Simplify your answer.",
      "data": {
        "answerLabel": "Sum =",
        "correctAnswer": "frac{5}{x}"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Simplify: frac{4}{x-1} - frac{2}{x+3}",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "frac{2x+14}{(x-1)(x+3)}"
          },
          {
            "id": "B",
            "text": "frac{2}{x^{2}+2x-3}"
          },
          {
            "id": "C",
            "text": "frac{2x+10}{(x-1)(x+3)}"
          },
          {
            "id": "D",
            "text": "frac{6}{(x-1)(x+3)}"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "matching_tables",
      "stem": "Match each expression to its simplified sum or difference.",
      "data": {
        "rows": [
          "frac{2}{x+5} + frac{3}{x-1}",
          "frac{x}{x+4} - frac{2}{x-3}",
          "frac{1}{x} + frac{1}{x+2}"
        ],
        "columns": [
          "frac{5x+13}{(x+5)(x-1)}",
          "frac{x^{2}-5x-8}{(x+4)(x-3)}",
          "frac{2x+2}{x(x+2)}"
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
      "stem": "Which of the following are equivalent to frac{3}{x} + frac{1}{2x}? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "frac{7}{2x}"
          },
          {
            "id": "B",
            "text": "frac{4}{3x}"
          },
          {
            "id": "C",
            "text": "frac{3.5}{x}"
          },
          {
            "id": "D",
            "text": "frac{4}{2x}"
          }
        ],
        "correctIds": [
          "A",
          "C"
        ]
      }
    },
    {
      "type": "drag_and_drop",
      "stem": "Complete the subtraction.",
      "data": {
        "template": "frac{5}{x-2} - frac{3}{x-2} = frac{___}{x-2}",
        "tiles": [
          "2",
          "8",
          "-2"
        ],
        "correctTile": "2"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Add: frac{x}{x+1} + frac{2}{x+1}. Simplify your answer.",
      "data": {
        "answerLabel": "Sum =",
        "correctAnswer": "frac{x+2}{x+1}"
      }
    }
  ],
  "9.2": [
    {
      "type": "equation_numeric",
      "stem": "Multiply: frac{2}{x} × frac{3}{y}. Simplify your answer.",
      "data": {
        "answerLabel": "Product =",
        "correctAnswer": "frac{6}{xy}"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Simplify: frac{x^{2}-4}{x+3} × frac{x+3}{x-2}",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "x+2"
          },
          {
            "id": "B",
            "text": "x-2"
          },
          {
            "id": "C",
            "text": "(x+2)(x+3)"
          },
          {
            "id": "D",
            "text": "frac{x+2}{x-2}"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "matching_tables",
      "stem": "Match each expression to its simplified result.",
      "data": {
        "rows": [
          "frac{x}{2} × frac{4}{x}",
          "frac{x+1}{x} ÷ frac{x+1}{2x}",
          "frac{3x}{x-1} × frac{x-1}{6}"
        ],
        "columns": [
          "2",
          "frac{x}{2}"
        ],
        "correct": [
          0,
          0,
          1
        ]
      }
    },
    {
      "type": "multi_select",
      "stem": "Which expressions are equivalent to frac{x^{2}-1}{x} ÷ (x+1)? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "frac{x-1}{x}"
          },
          {
            "id": "B",
            "text": "frac{x+1}{x}"
          },
          {
            "id": "C",
            "text": "1 - frac{1}{x}"
          },
          {
            "id": "D",
            "text": "frac{x^{2}-1}{x^{2}+x}"
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
      "type": "drag_and_drop",
      "stem": "Complete the division.",
      "data": {
        "template": "frac{6}{x} ÷ frac{2}{x} = ___",
        "tiles": [
          "3",
          "3x",
          "frac{3}{x}"
        ],
        "correctTile": "3"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Multiply frac{x+2}{3} × frac{6}{x+2} and simplify.",
      "data": {
        "answerLabel": "Product =",
        "correctAnswer": "2"
      }
    }
  ],
  "9.3": [
    {
      "type": "equation_numeric",
      "stem": "Solve for x: frac{x}{3} = frac{4}{6}",
      "data": {
        "answerLabel": "x =",
        "correctAnswer": "2"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Solve: frac{2}{x} = frac{1}{3}",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "x = 6"
          },
          {
            "id": "B",
            "text": "x = frac{2}{3}"
          },
          {
            "id": "C",
            "text": "x = 1.5"
          },
          {
            "id": "D",
            "text": "x = 3"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Solve: frac{3}{x-2} = frac{5}{x+2}. Give the value of x.",
      "data": {
        "answerLabel": "x =",
        "correctAnswer": "8"
      }
    },
    {
      "type": "multi_select",
      "stem": "Solve frac{1}{x-3} + frac{1}{x+3} = frac{6}{x^{2}-9}. Which statements are true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "x = 3 is an extraneous solution"
          },
          {
            "id": "B",
            "text": "The equation has no valid solution"
          },
          {
            "id": "C",
            "text": "x = 3 is a valid solution"
          },
          {
            "id": "D",
            "text": "x = -3 is a solution"
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
      "stem": "Complete the first step of solving.",
      "data": {
        "template": "Solve frac{x+1}{4} = frac{3}{2}: multiply both sides by 4 to get x+1 = ___",
        "tiles": [
          "6",
          "12",
          "3"
        ],
        "correctTile": "6"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Solve: frac{5}{x} + 2 = 7. Find x.",
      "data": {
        "answerLabel": "x =",
        "correctAnswer": "1"
      }
    }
  ]
};
