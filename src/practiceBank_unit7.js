// Static practice bank -- Unit 7: Trigonometric Functions (Modules 17–19)
// Part of the free, no-API-cost Topic Practice Generator question bank.
// Combined into the full PRACTICE_BANK by practiceBank.js.

export const UNIT_7_BANK = {
  "17.1": [
    {
      "type": "equation_numeric",
      "stem": "In a right triangle, the angle is 30° and the opposite side is 8. Find the hypotenuse.",
      "data": {
        "answerLabel": "Hypotenuse =",
        "correctAnswer": "16"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "In a right triangle with hypotenuse 13 and one leg 5, what is sin of the angle opposite the leg of length 5?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "frac{5}{13}"
          },
          {
            "id": "B",
            "text": "frac{12}{13}"
          },
          {
            "id": "C",
            "text": "frac{13}{5}"
          },
          {
            "id": "D",
            "text": "frac{5}{12}"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "In a right triangle, the hypotenuse is 10 and one angle is 60°. Find the length of the side adjacent to that angle.",
      "data": {
        "answerLabel": "Adjacent side =",
        "correctAnswer": "5"
      }
    },
    {
      "type": "multi_select",
      "stem": "In a right triangle with legs 5 and 12 and hypotenuse 13, which ratios are correct for the angle opposite the leg of length 5? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "sin = frac{5}{13}"
          },
          {
            "id": "B",
            "text": "cos = frac{12}{13}"
          },
          {
            "id": "C",
            "text": "tan = frac{5}{12}"
          },
          {
            "id": "D",
            "text": "tan = frac{12}{5}"
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
      "type": "drag_and_drop",
      "stem": "Complete the trigonometric ratio definition.",
      "data": {
        "template": "In a right triangle, tangent of an angle equals the opposite side divided by the ___ side.",
        "tiles": [
          "adjacent",
          "hypotenuse",
          "opposite"
        ],
        "correctTile": "adjacent"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "In a right triangle, one leg is 9 and the angle adjacent to it is 45°. Find the other leg.",
      "data": {
        "answerLabel": "Other leg =",
        "correctAnswer": "9"
      }
    }
  ],
  "17.2": [
    {
      "type": "equation_numeric",
      "stem": "In triangle ABC, a=10, angle A=30°, angle B=90°. Use the Law of Sines to find b.",
      "data": {
        "answerLabel": "b =",
        "correctAnswer": "20"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "The Law of Sines states that in any triangle, the ratio of a side to the sine of its opposite angle is:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "the same for all three sides"
          },
          {
            "id": "B",
            "text": "always equal to 1"
          },
          {
            "id": "C",
            "text": "different for each side"
          },
          {
            "id": "D",
            "text": "equal to the triangle's perimeter"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "In triangle ABC, a=6, angle A=30°, angle C=90°. Use the Law of Sines to find c.",
      "data": {
        "answerLabel": "c =",
        "correctAnswer": "12"
      }
    },
    {
      "type": "multi_select",
      "stem": "The Law of Sines is most useful for solving a triangle when you know which combinations of parts? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Two angles and a side (AAS)"
          },
          {
            "id": "B",
            "text": "Two angles and the included side (ASA)"
          },
          {
            "id": "C",
            "text": "Three sides (SSS)"
          },
          {
            "id": "D",
            "text": "Two sides and the included angle (SAS)"
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
      "stem": "Complete the Law of Sines proportion.",
      "data": {
        "template": "frac{a}{sin(A)} = frac{b}{sin(___)}",
        "tiles": [
          "B",
          "A",
          "C"
        ],
        "correctTile": "B"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "In triangle ABC, angle A = angle B = 40° and a=10. Find b using the Law of Sines.",
      "data": {
        "answerLabel": "b =",
        "correctAnswer": "10"
      }
    }
  ],
  "17.3": [
    {
      "type": "equation_numeric",
      "stem": "In triangle ABC, a=5, b=5, and angle C=60°. Use the Law of Cosines to find c.",
      "data": {
        "answerLabel": "c =",
        "correctAnswer": "5"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "The Law of Cosines is most useful for solving a triangle when you know:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Three sides (SSS), or two sides and the included angle (SAS)"
          },
          {
            "id": "B",
            "text": "Two angles and a side (AAS)"
          },
          {
            "id": "C",
            "text": "Only one side and one angle"
          },
          {
            "id": "D",
            "text": "Two angles only"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A triangle has sides a=3, b=4, c=5. Use the Law of Cosines to find angle C, the angle opposite side c.",
      "data": {
        "answerLabel": "Angle C =",
        "correctAnswer": "90"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements about the Law of Cosines are true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "c^{2} = a^{2} + b^{2} - 2ab·cos(C)"
          },
          {
            "id": "B",
            "text": "It reduces to the Pythagorean theorem when C = 90°"
          },
          {
            "id": "C",
            "text": "It can only be used on right triangles"
          },
          {
            "id": "D",
            "text": "It can find a missing angle given three sides"
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
      "stem": "Complete the Law of Cosines formula.",
      "data": {
        "template": "c^{2} = a^{2} + b^{2} - 2ab · cos(___)",
        "tiles": [
          "C",
          "A",
          "B"
        ],
        "correctTile": "C"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A triangle has sides a=6, b=8, c=10. Use the Law of Cosines to find the angle opposite side c.",
      "data": {
        "answerLabel": "Angle =",
        "correctAnswer": "90"
      }
    }
  ],
  "18.1": [
    {
      "type": "equation_numeric",
      "stem": "Convert 180° to radians in terms of pi.",
      "data": {
        "answerLabel": "Radians =",
        "correctAnswer": "pi"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Convert 90° to radians.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "frac{pi}{2}"
          },
          {
            "id": "B",
            "text": "pi"
          },
          {
            "id": "C",
            "text": "frac{pi}{4}"
          },
          {
            "id": "D",
            "text": "2pi"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Convert frac{pi}{3} radians to degrees.",
      "data": {
        "answerLabel": "Degrees =",
        "correctAnswer": "60"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which of the following angle measures are coterminal with 0° (a full rotation)? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "360°"
          },
          {
            "id": "B",
            "text": "2pi radians"
          },
          {
            "id": "C",
            "text": "180°"
          },
          {
            "id": "D",
            "text": "-360°"
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
      "stem": "Complete the radian conversion.",
      "data": {
        "template": "270° converts to ___ radians.",
        "tiles": [
          "frac{3pi}{2}",
          "frac{pi}{2}",
          "2pi"
        ],
        "correctTile": "frac{3pi}{2}"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Convert 45° to radians in terms of pi.",
      "data": {
        "answerLabel": "Radians =",
        "correctAnswer": "frac{pi}{4}"
      }
    }
  ],
  "18.2": [
    {
      "type": "equation_numeric",
      "stem": "Evaluate: sin(30°)",
      "data": {
        "answerLabel": "sin(30°) =",
        "correctAnswer": "frac{1}{2}"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Evaluate: cos(60°)",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "frac{1}{2}"
          },
          {
            "id": "B",
            "text": "frac{sqrt{3}}{2}"
          },
          {
            "id": "C",
            "text": "1"
          },
          {
            "id": "D",
            "text": "0"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Evaluate: tan(45°)",
      "data": {
        "answerLabel": "tan(45°) =",
        "correctAnswer": "1"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which of the following are true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "sin(90°) = 1"
          },
          {
            "id": "B",
            "text": "cos(0°) = 1"
          },
          {
            "id": "C",
            "text": "cos(pi) = -1"
          },
          {
            "id": "D",
            "text": "sin(pi) = 1"
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
      "stem": "Match each angle to its sine value.",
      "data": {
        "rows": [
          "sin(0°)",
          "sin(30°)",
          "sin(90°)"
        ],
        "columns": [
          "0",
          "frac{1}{2}",
          "1"
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
      "stem": "Evaluate: sin(90°)",
      "data": {
        "answerLabel": "sin(90°) =",
        "correctAnswer": "1"
      }
    }
  ],
  "18.3": [
    {
      "type": "equation_numeric",
      "stem": "If sin(θ) = frac{3}{5} and θ is in Quadrant I, find cos(θ) using the Pythagorean identity.",
      "data": {
        "answerLabel": "cos(θ) =",
        "correctAnswer": "frac{4}{5}"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "The Pythagorean identity states that sin²(θ) + cos²(θ) equals:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "1"
          },
          {
            "id": "B",
            "text": "0"
          },
          {
            "id": "C",
            "text": "tan(θ)"
          },
          {
            "id": "D",
            "text": "2"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "If cos(θ) = frac{4}{5} and θ is in Quadrant I, find sin(θ) using the Pythagorean identity.",
      "data": {
        "answerLabel": "sin(θ) =",
        "correctAnswer": "frac{3}{5}"
      }
    },
    {
      "type": "multi_select",
      "stem": "If sin(θ) = frac{5}{13} and θ is in Quadrant I, which statements are true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "cos(θ) = frac{12}{13}"
          },
          {
            "id": "B",
            "text": "sin^{2}(θ) + cos^{2}(θ) = 1"
          },
          {
            "id": "C",
            "text": "cos(θ) = frac{5}{13}"
          },
          {
            "id": "D",
            "text": "tan(θ) = frac{5}{12}"
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
      "stem": "Complete the Pythagorean identity.",
      "data": {
        "template": "sin^{2}(θ) + cos^{2}(θ) = ___",
        "tiles": [
          "1",
          "0",
          "θ"
        ],
        "correctTile": "1"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "If sin(θ) = frac{8}{17} and θ is in Quadrant I, find cos(θ).",
      "data": {
        "answerLabel": "cos(θ) =",
        "correctAnswer": "frac{15}{17}"
      }
    }
  ],
  "19.1": [
    {
      "type": "multiple_choice",
      "stem": "What is the amplitude of f(x) = 4sin(x)?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "4"
          },
          {
            "id": "B",
            "text": "1"
          },
          {
            "id": "C",
            "text": "2pi"
          },
          {
            "id": "D",
            "text": "frac{1}{4}"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "What is the period of f(x) = sin(2x)?",
      "data": {
        "answerLabel": "Period =",
        "correctAnswer": "pi"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "The graph of f(x) = -cos(x) is the graph of y=cos(x) reflected over which axis?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "x-axis"
          },
          {
            "id": "B",
            "text": "y-axis"
          },
          {
            "id": "C",
            "text": "the line y=x"
          },
          {
            "id": "D",
            "text": "It is not reflected"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements are true about f(x) = 3sin(x)? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "The amplitude is 3"
          },
          {
            "id": "B",
            "text": "The maximum value is 3"
          },
          {
            "id": "C",
            "text": "The minimum value is -3"
          },
          {
            "id": "D",
            "text": "The period is 3"
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
      "type": "drag_and_drop",
      "stem": "Complete the description of the period.",
      "data": {
        "template": "The graph of f(x) = sin(4x) completes one full cycle over an interval of length ___.",
        "tiles": [
          "frac{pi}{2}",
          "2pi",
          "4pi"
        ],
        "correctTile": "frac{pi}{2}"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "What is the amplitude of f(x) = frac{1}{2}cos(x)?",
      "data": {
        "answerLabel": "Amplitude =",
        "correctAnswer": "frac{1}{2}"
      }
    }
  ],
  "19.2": [
    {
      "type": "equation_numeric",
      "stem": "What is the period of f(x) = tan(x)?",
      "data": {
        "answerLabel": "Period =",
        "correctAnswer": "pi"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "What is the period of f(x) = tan(2x)?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "frac{pi}{2}"
          },
          {
            "id": "B",
            "text": "pi"
          },
          {
            "id": "C",
            "text": "2pi"
          },
          {
            "id": "D",
            "text": "4pi"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Unlike sine and cosine, the tangent function has no maximum or minimum value because:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "it has vertical asymptotes and increases without bound between them"
          },
          {
            "id": "B",
            "text": "it repeats every 2pi"
          },
          {
            "id": "C",
            "text": "it is always positive"
          },
          {
            "id": "D",
            "text": "it has an amplitude of 1"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements are true about the graph of f(x) = tan(x)? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "It has vertical asymptotes"
          },
          {
            "id": "B",
            "text": "Its period is pi"
          },
          {
            "id": "C",
            "text": "It has an amplitude of 1"
          },
          {
            "id": "D",
            "text": "It passes through the origin"
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
      "stem": "Complete the description.",
      "data": {
        "template": "The graph of f(x) = tan(x) has vertical asymptotes wherever cos(x) equals ___.",
        "tiles": [
          "0",
          "1",
          "-1"
        ],
        "correctTile": "0"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "What is the period of f(x) = tan(frac{x}{2})?",
      "data": {
        "answerLabel": "Period =",
        "correctAnswer": "2pi"
      }
    }
  ],
  "19.3": [
    {
      "type": "multiple_choice",
      "stem": "The graph of f(x) = sin(x - frac{pi}{2}) is the graph of y=sin(x) shifted:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "right frac{pi}{2}"
          },
          {
            "id": "B",
            "text": "left frac{pi}{2}"
          },
          {
            "id": "C",
            "text": "up frac{pi}{2}"
          },
          {
            "id": "D",
            "text": "down frac{pi}{2}"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "The graph of f(x) = cos(x) + 3 is the graph of y=cos(x) shifted up how many units?",
      "data": {
        "answerLabel": "Units up =",
        "correctAnswer": "3"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "The graph of f(x) = sin(x + pi) is the graph of y=sin(x) shifted:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "left pi"
          },
          {
            "id": "B",
            "text": "right pi"
          },
          {
            "id": "C",
            "text": "up pi"
          },
          {
            "id": "D",
            "text": "down pi"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements are true about the graph of f(x) = cos(x - pi) - 1? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "The graph is shifted right by pi"
          },
          {
            "id": "B",
            "text": "The graph is shifted down by 1"
          },
          {
            "id": "C",
            "text": "The graph is shifted left by pi"
          },
          {
            "id": "D",
            "text": "The maximum value is 0"
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
      "stem": "Complete the description of the shift.",
      "data": {
        "template": "In f(x) = sin(x - c), the graph shifts ___ by c units.",
        "tiles": [
          "right",
          "left",
          "up"
        ],
        "correctTile": "right"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "The graph of f(x) = sin(x) - 5 is the graph of y=sin(x) shifted down how many units?",
      "data": {
        "answerLabel": "Units down =",
        "correctAnswer": "5"
      }
    }
  ],
  "19.4": [
    {
      "type": "multiple_choice",
      "stem": "A data set shows repeating, oscillating behavior over equal intervals. What type of model best fits?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Sine function"
          },
          {
            "id": "B",
            "text": "Linear function"
          },
          {
            "id": "C",
            "text": "Exponential function"
          },
          {
            "id": "D",
            "text": "Logarithmic function"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A data set oscillates between a maximum of 10 and a minimum of 2. Find the amplitude.",
      "data": {
        "answerLabel": "Amplitude =",
        "correctAnswer": "4"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A data set oscillates between a maximum of 10 and a minimum of 2. Find the midline (vertical shift).",
      "data": {
        "answerLabel": "Midline: y =",
        "correctAnswer": "6"
      }
    },
    {
      "type": "multi_select",
      "stem": "When fitting a sine function to periodic data, which values must be determined from the data? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Amplitude"
          },
          {
            "id": "B",
            "text": "Period"
          },
          {
            "id": "C",
            "text": "Midline"
          },
          {
            "id": "D",
            "text": "The number of data points collected"
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
      "type": "drag_and_drop",
      "stem": "Complete the formula for amplitude from data.",
      "data": {
        "template": "Given a maximum value M and minimum value m, the amplitude equals frac{M - m}{___}.",
        "tiles": [
          "2",
          "1",
          "M"
        ],
        "correctTile": "2"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A data set repeats its pattern every 12 hours. What is the period of the best-fit sine function?",
      "data": {
        "answerLabel": "Period =",
        "correctAnswer": "12"
      }
    }
  ]
};
