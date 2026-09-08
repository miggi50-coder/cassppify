// Static practice bank -- Unit 5: Radical Functions, Expressions, and Equations (Modules 10–11)
// Part of the free, no-API-cost Topic Practice Generator question bank.
// Combined into the full PRACTICE_BANK by practiceBank.js.

export const UNIT_5_BANK = {
  "10.1": [
    {
      "type": "equation_numeric",
      "stem": "Find the inverse of f(x) = x^{3}.",
      "data": {
        "answerLabel": "f^{-1}(x) =",
        "correctAnswer": "sqrt[3]{x}"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "What is the inverse of f(x) = x^{2} for x ≥ 0?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "f^{-1}(x) = sqrt{x}"
          },
          {
            "id": "B",
            "text": "f^{-1}(x) = -sqrt{x}"
          },
          {
            "id": "C",
            "text": "f^{-1}(x) = x^{2}"
          },
          {
            "id": "D",
            "text": "f^{-1}(x) = frac{1}{x^{2}}"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "If f(x) = x^{3} + 2, find f^{-1}(x).",
      "data": {
        "answerLabel": "f^{-1}(x) =",
        "correctAnswer": "sqrt[3]{x-2}"
      }
    },
    {
      "type": "matching_tables",
      "stem": "Match each function to its inverse.",
      "data": {
        "rows": [
          "f(x) = x^{3} - 1",
          "f(x) = (x-4)^{3}",
          "f(x) = 2x^{3}"
        ],
        "columns": [
          "f^{-1}(x) = sqrt[3]{x} + 4",
          "f^{-1}(x) = sqrt[3]{frac{x}{2}}",
          "f^{-1}(x) = sqrt[3]{x+1}"
        ],
        "correct": [
          2,
          0,
          1
        ]
      }
    },
    {
      "type": "multi_select",
      "stem": "Which of the following pairs of functions are inverses of each other? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "f(x)=x^{3} and g(x)=sqrt[3]{x}"
          },
          {
            "id": "B",
            "text": "f(x)=x^{2} (x≥0) and g(x)=sqrt{x}"
          },
          {
            "id": "C",
            "text": "f(x)=x^{3}+5 and g(x)=sqrt[3]{x}+5"
          },
          {
            "id": "D",
            "text": "f(x)=(x+1)^{3} and g(x)=sqrt[3]{x}-1"
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
      "stem": "If f(x) = sqrt[3]{x}, find f^{-1}(x).",
      "data": {
        "answerLabel": "f^{-1}(x) =",
        "correctAnswer": "x^{3}"
      }
    }
  ],
  "10.2": [
    {
      "type": "equation_numeric",
      "stem": "What is the domain of f(x) = sqrt{x-3}?",
      "data": {
        "answerLabel": "Domain: x ≥",
        "correctAnswer": "3"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "What is the range of f(x) = sqrt{x} + 4?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "y ≥ 4"
          },
          {
            "id": "B",
            "text": "y ≥ 0"
          },
          {
            "id": "C",
            "text": "x ≥ 4"
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
      "stem": "Find f(9) if f(x) = sqrt{x-5}.",
      "data": {
        "answerLabel": "f(9) =",
        "correctAnswer": "2"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements are true about the graph of f(x) = -sqrt{x} + 2? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "The domain is x ≥ 0"
          },
          {
            "id": "B",
            "text": "The range is y ≤ 2"
          },
          {
            "id": "C",
            "text": "The graph starts at the point (0, 2)"
          },
          {
            "id": "D",
            "text": "The graph increases as x increases"
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
      "stem": "Match each square root function to its domain.",
      "data": {
        "rows": [
          "f(x) = sqrt{x+5}",
          "f(x) = sqrt{x-2}",
          "f(x) = sqrt{x}"
        ],
        "columns": [
          "x ≥ -5",
          "x ≥ 2",
          "x ≥ 0"
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
      "stem": "Complete the transformation description.",
      "data": {
        "template": "The graph of f(x) = sqrt{x-3} + 1 is the graph of y = sqrt{x} shifted right 3 units and up ___ unit(s).",
        "tiles": [
          "1",
          "3",
          "-1"
        ],
        "correctTile": "1"
      }
    }
  ],
  "10.3": [
    {
      "type": "multiple_choice",
      "stem": "What is the domain of f(x) = sqrt[3]{x-2}?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "All real numbers"
          },
          {
            "id": "B",
            "text": "x ≥ 2"
          },
          {
            "id": "C",
            "text": "x > 0"
          },
          {
            "id": "D",
            "text": "x ≠ 2"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Find f(-6) if f(x) = sqrt[3]{x+7}.",
      "data": {
        "answerLabel": "f(-6) =",
        "correctAnswer": "1"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "What is the range of f(x) = sqrt[3]{x}?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "All real numbers"
          },
          {
            "id": "B",
            "text": "y ≥ 0"
          },
          {
            "id": "C",
            "text": "y > 0"
          },
          {
            "id": "D",
            "text": "x ≥ 0"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements are true about the graph of f(x) = sqrt[3]{x-1} - 2? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "The domain is all real numbers"
          },
          {
            "id": "B",
            "text": "The graph passes through the point (1, -2)"
          },
          {
            "id": "C",
            "text": "The range is y ≥ -2"
          },
          {
            "id": "D",
            "text": "The graph is the parent cube root function shifted right 1 and down 2"
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
      "stem": "Match each cube root function to the point it passes through.",
      "data": {
        "rows": [
          "f(x) = sqrt[3]{x}",
          "f(x) = sqrt[3]{x-8}",
          "f(x) = sqrt[3]{x+1} + 3"
        ],
        "columns": [
          "(0,0)",
          "(8,0)",
          "(-1,3)"
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
      "stem": "Complete the statement about symmetry.",
      "data": {
        "template": "The graph of f(x) = sqrt[3]{x} is symmetric about the ___.",
        "tiles": [
          "origin",
          "y-axis",
          "x-axis"
        ],
        "correctTile": "origin"
      }
    }
  ],
  "11.1": [
    {
      "type": "equation_numeric",
      "stem": "Write sqrt{x} using a rational exponent: x^{___}. What is the exponent?",
      "data": {
        "answerLabel": "Exponent =",
        "correctAnswer": "frac{1}{2}"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Which expression is equivalent to x^{frac{2}{3}}?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "sqrt[3]{x^{2}}"
          },
          {
            "id": "B",
            "text": "sqrt{x^{3}}"
          },
          {
            "id": "C",
            "text": "sqrt[3]{x} × 2"
          },
          {
            "id": "D",
            "text": "2sqrt[3]{x}"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Evaluate: 8^{frac{2}{3}}",
      "data": {
        "answerLabel": "Value =",
        "correctAnswer": "4"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which expressions are equivalent to sqrt[4]{x^{3}}? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "x^{frac{3}{4}}"
          },
          {
            "id": "B",
            "text": "(sqrt[4]{x})^{3}"
          },
          {
            "id": "C",
            "text": "x^{frac{4}{3}}"
          },
          {
            "id": "D",
            "text": "(x^{3})^{frac{1}{4}}"
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
      "stem": "Match each radical expression to its equivalent rational exponent form.",
      "data": {
        "rows": [
          "sqrt{x}",
          "sqrt[3]{x}",
          "sqrt[5]{x^{2}}"
        ],
        "columns": [
          "x^{frac{1}{2}}",
          "x^{frac{1}{3}}",
          "x^{frac{2}{5}}"
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
      "stem": "Evaluate: 16^{frac{1}{4}}",
      "data": {
        "answerLabel": "Value =",
        "correctAnswer": "2"
      }
    }
  ],
  "11.2": [
    {
      "type": "equation_numeric",
      "stem": "Simplify: sqrt{50}",
      "data": {
        "answerLabel": "Simplified form =",
        "correctAnswer": "5sqrt{2}"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Simplify: sqrt{12} × sqrt{3}",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "6"
          },
          {
            "id": "B",
            "text": "2sqrt{3}"
          },
          {
            "id": "C",
            "text": "sqrt{15}"
          },
          {
            "id": "D",
            "text": "6sqrt{3}"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Simplify: sqrt[3]{24}",
      "data": {
        "answerLabel": "Simplified form =",
        "correctAnswer": "2sqrt[3]{3}"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which of the following are equivalent to sqrt{72}? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "6sqrt{2}"
          },
          {
            "id": "B",
            "text": "2sqrt{18}"
          },
          {
            "id": "C",
            "text": "3sqrt{8}"
          },
          {
            "id": "D",
            "text": "4sqrt{3}"
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
      "stem": "Match each radical to its simplified form.",
      "data": {
        "rows": [
          "sqrt{45}",
          "sqrt{80}",
          "sqrt{18}"
        ],
        "columns": [
          "3sqrt{5}",
          "4sqrt{5}",
          "3sqrt{2}"
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
      "stem": "Complete the simplification.",
      "data": {
        "template": "frac{sqrt{6}}{sqrt{2}} = sqrt{___}",
        "tiles": [
          "3",
          "4",
          "12"
        ],
        "correctTile": "3"
      }
    }
  ],
  "11.3": [
    {
      "type": "equation_numeric",
      "stem": "Solve: sqrt{x} = 7",
      "data": {
        "answerLabel": "x =",
        "correctAnswer": "49"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Solve: sqrt{x+3} = 5",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "x = 22"
          },
          {
            "id": "B",
            "text": "x = 2"
          },
          {
            "id": "C",
            "text": "x = 25"
          },
          {
            "id": "D",
            "text": "x = 28"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Solve: sqrt{2x+1} = sqrt{x+7}. Find x.",
      "data": {
        "answerLabel": "x =",
        "correctAnswer": "6"
      }
    },
    {
      "type": "multi_select",
      "stem": "Solve sqrt{x+2} = x - 4. Which statements are true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "x = 7 is a valid solution"
          },
          {
            "id": "B",
            "text": "x = 2 is an extraneous solution"
          },
          {
            "id": "C",
            "text": "x = 2 is a valid solution"
          },
          {
            "id": "D",
            "text": "The equation has exactly one valid solution"
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
      "stem": "Complete the first step of solving.",
      "data": {
        "template": "To solve sqrt{x-1} = 4, first square both sides to get x - 1 = ___.",
        "tiles": [
          "16",
          "8",
          "4"
        ],
        "correctTile": "16"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Solve: sqrt{3x-2} = 4. Find x.",
      "data": {
        "answerLabel": "x =",
        "correctAnswer": "6"
      }
    }
  ]
};
