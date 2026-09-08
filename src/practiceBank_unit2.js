// Static practice bank -- Unit 2: Measurement and Modeling in Two and Three Dimensions (Modules 3–4)
// Part of the free, no-API-cost Topic Practice Generator question bank.
// Combined into the full PRACTICE_BANK by practiceBank.js.

export const UNIT_2_BANK = {
  "3.1": [
    {
      "type": "multiple_choice",
      "stem": "A horizontal cross section of a cylinder is a:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "circle"
          },
          {
            "id": "B",
            "text": "rectangle"
          },
          {
            "id": "C",
            "text": "triangle"
          },
          {
            "id": "D",
            "text": "square"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "A vertical cross section through the apex of a cone is a:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "triangle"
          },
          {
            "id": "B",
            "text": "circle"
          },
          {
            "id": "C",
            "text": "rectangle"
          },
          {
            "id": "D",
            "text": "trapezoid"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Rotating a rectangle around one of its sides produces a:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "cylinder"
          },
          {
            "id": "B",
            "text": "cone"
          },
          {
            "id": "C",
            "text": "sphere"
          },
          {
            "id": "D",
            "text": "cube"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements about cross sections are true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "A cross section of a sphere is always a circle"
          },
          {
            "id": "B",
            "text": "A cross section of a cube can be a rectangle"
          },
          {
            "id": "C",
            "text": "A cross section of a cube can be a hexagon"
          },
          {
            "id": "D",
            "text": "All cross sections of a cylinder are circles"
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
      "stem": "Complete the statement.",
      "data": {
        "template": "Rotating a right triangle around one of its legs produces a ___.",
        "tiles": [
          "cone",
          "cylinder",
          "sphere"
        ],
        "correctTile": "cone"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Rotating a semicircle around its diameter produces a:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "sphere"
          },
          {
            "id": "B",
            "text": "cylinder"
          },
          {
            "id": "C",
            "text": "cone"
          },
          {
            "id": "D",
            "text": "torus"
          }
        ],
        "correctId": "A"
      }
    }
  ],
  "3.2": [
    {
      "type": "equation_numeric",
      "stem": "Find the surface area of a cylinder with radius 3 and height 5. Use SA=2πr^{2}+2πrh, and leave your answer in terms of π.",
      "data": {
        "answerLabel": "Surface area =",
        "correctAnswer": "48pi"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "The formula for the lateral surface area of a cylinder is:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "2πrh"
          },
          {
            "id": "B",
            "text": "πr^{2}h"
          },
          {
            "id": "C",
            "text": "2πr^{2}"
          },
          {
            "id": "D",
            "text": "πr^{2}"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Find the surface area of a rectangular prism with length 4, width 3, height 2. Use SA=2(lw+lh+wh).",
      "data": {
        "answerLabel": "Surface area =",
        "correctAnswer": "52"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements about surface area of prisms and cylinders are true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Surface area includes the area of all faces"
          },
          {
            "id": "B",
            "text": "A cylinder has two circular bases"
          },
          {
            "id": "C",
            "text": "A rectangular prism has 6 faces"
          },
          {
            "id": "D",
            "text": "Surface area is measured in cubic units"
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
      "stem": "Complete the surface area formula for a cylinder.",
      "data": {
        "template": "SA = 2πr^{2} + ___",
        "tiles": [
          "2πrh",
          "πr^{2}h",
          "πrh"
        ],
        "correctTile": "2πrh"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Find the surface area of a cylinder with radius 2 and height 10, in terms of π.",
      "data": {
        "answerLabel": "Surface area =",
        "correctAnswer": "48pi"
      }
    }
  ],
  "3.3": [
    {
      "type": "equation_numeric",
      "stem": "Find the surface area of a cone with radius 3 and slant height 5. Use SA=πr^{2}+πrl, in terms of π.",
      "data": {
        "answerLabel": "Surface area =",
        "correctAnswer": "24pi"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "The formula for the lateral surface area of a cone is:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "πrl, where l is the slant height"
          },
          {
            "id": "B",
            "text": "πr^{2}"
          },
          {
            "id": "C",
            "text": "2πrl"
          },
          {
            "id": "D",
            "text": "πr^{2}l"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A square pyramid has base side length 6 and slant height 5. Find the lateral surface area (4 triangular faces, each frac{1}{2}×base×slant height).",
      "data": {
        "answerLabel": "Lateral surface area =",
        "correctAnswer": "60"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements about surface area of pyramids and cones are true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "A cone has one circular base"
          },
          {
            "id": "B",
            "text": "The slant height is not the same as the height"
          },
          {
            "id": "C",
            "text": "A square pyramid has 4 triangular lateral faces"
          },
          {
            "id": "D",
            "text": "The slant height is always equal to the height"
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
      "stem": "Complete the statement.",
      "data": {
        "template": "The lateral surface area of a cone uses the slant height, not the ___.",
        "tiles": [
          "height",
          "radius",
          "diameter"
        ],
        "correctTile": "height"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Find the surface area of a cone with radius 4 and slant height 6, in terms of π.",
      "data": {
        "answerLabel": "Surface area =",
        "correctAnswer": "40pi"
      }
    }
  ],
  "3.4": [
    {
      "type": "equation_numeric",
      "stem": "Find the surface area of a sphere with radius 3. Use SA=4πr^{2}, in terms of π.",
      "data": {
        "answerLabel": "Surface area =",
        "correctAnswer": "36pi"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "The formula for the surface area of a sphere is:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "4πr^{2}"
          },
          {
            "id": "B",
            "text": "frac{4}{3}πr^{3}"
          },
          {
            "id": "C",
            "text": "2πr^{2}"
          },
          {
            "id": "D",
            "text": "πr^{2}"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Find the surface area of a sphere with radius 5, in terms of π.",
      "data": {
        "answerLabel": "Surface area =",
        "correctAnswer": "100pi"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements about the surface area of a sphere are true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Surface area is proportional to the square of the radius"
          },
          {
            "id": "B",
            "text": "Doubling the radius quadruples the surface area"
          },
          {
            "id": "C",
            "text": "The formula is 4πr^{2}"
          },
          {
            "id": "D",
            "text": "The formula is frac{4}{3}πr^{3}"
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
      "stem": "Complete the surface area formula for a sphere.",
      "data": {
        "template": "SA = ___",
        "tiles": [
          "4πr^{2}",
          "2πr^{2}",
          "frac{4}{3}πr^{3}"
        ],
        "correctTile": "4πr^{2}"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A sphere has radius 6. Find its surface area in terms of π.",
      "data": {
        "answerLabel": "Surface area =",
        "correctAnswer": "144pi"
      }
    }
  ],
  "4.1": [
    {
      "type": "multiple_choice",
      "stem": "If a figure is scaled by a factor of k, its area scales by:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "k^{2}"
          },
          {
            "id": "B",
            "text": "k"
          },
          {
            "id": "C",
            "text": "2k"
          },
          {
            "id": "D",
            "text": "k^{3}"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A model is built at a scale of 1:20. If the model height is 8 cm, find the actual height in cm.",
      "data": {
        "answerLabel": "Actual height (cm) =",
        "correctAnswer": "160"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "If a solid is scaled by a factor of k, its volume scales by:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "k^{3}"
          },
          {
            "id": "B",
            "text": "k"
          },
          {
            "id": "C",
            "text": "k^{2}"
          },
          {
            "id": "D",
            "text": "3k"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multi_select",
      "stem": "A cube with side 2 is scaled by a factor of 3. Which statements are true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "The new side length is 6"
          },
          {
            "id": "B",
            "text": "The surface area increases by a factor of 9"
          },
          {
            "id": "C",
            "text": "The volume increases by a factor of 27"
          },
          {
            "id": "D",
            "text": "The volume increases by a factor of 9"
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
      "stem": "Complete the statement.",
      "data": {
        "template": "If linear dimensions scale by k, volume scales by k to the power of ___.",
        "tiles": [
          "3",
          "2",
          "1"
        ],
        "correctTile": "3"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A scale drawing has a scale of 1 inch = 5 feet. If a wall measures 4 inches on the drawing, find the actual length in feet.",
      "data": {
        "answerLabel": "Actual length (feet) =",
        "correctAnswer": "20"
      }
    }
  ],
  "4.2": [
    {
      "type": "equation_numeric",
      "stem": "A block has mass 50 g and volume 10 cm³. Find its density in g/cm³.",
      "data": {
        "answerLabel": "Density (g/cm³) =",
        "correctAnswer": "5"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "The formula for density is:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "frac{mass}{volume}"
          },
          {
            "id": "B",
            "text": "mass × volume"
          },
          {
            "id": "C",
            "text": "frac{volume}{mass}"
          },
          {
            "id": "D",
            "text": "mass + volume"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "An object has density 2.5 g/cm³ and volume 40 cm³. Find its mass in grams.",
      "data": {
        "answerLabel": "Mass (g) =",
        "correctAnswer": "100"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements about density are true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Density = mass divided by volume"
          },
          {
            "id": "B",
            "text": "Objects with the same volume can have different densities if their masses differ"
          },
          {
            "id": "C",
            "text": "Density is independent of the amount of material for a uniform substance"
          },
          {
            "id": "D",
            "text": "Increasing volume while mass stays the same increases density"
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
      "stem": "Complete the density formula.",
      "data": {
        "template": "Density = ___",
        "tiles": [
          "frac{mass}{volume}",
          "mass×volume",
          "frac{volume}{mass}"
        ],
        "correctTile": "frac{mass}{volume}"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "An object has mass 120 g and density 4 g/cm³. Find its volume in cm³.",
      "data": {
        "answerLabel": "Volume (cm³) =",
        "correctAnswer": "30"
      }
    }
  ],
  "4.3": [
    {
      "type": "multiple_choice",
      "stem": "When solving a real-world modeling problem with constraints, such as a budget or material limit, the first step is typically to:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "identify the relevant variables and constraints"
          },
          {
            "id": "B",
            "text": "calculate the final answer immediately"
          },
          {
            "id": "C",
            "text": "ignore the constraints"
          },
          {
            "id": "D",
            "text": "assume there is no solution"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A box must have a volume of at most 60 cubic units. If the base is 5 by 4, find the maximum height.",
      "data": {
        "answerLabel": "Maximum height =",
        "correctAnswer": "3"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "In an optimization problem with area and perimeter constraints, the goal is usually to:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "maximize or minimize a quantity subject to given constraints"
          },
          {
            "id": "B",
            "text": "find any possible value"
          },
          {
            "id": "C",
            "text": "ignore units"
          },
          {
            "id": "D",
            "text": "always maximize perimeter"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which strategies are useful when solving a modeling problem with real-world constraints? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Write an equation relating the variables"
          },
          {
            "id": "B",
            "text": "Identify which quantities are fixed and which can vary"
          },
          {
            "id": "C",
            "text": "Check whether the solution makes sense in context"
          },
          {
            "id": "D",
            "text": "Ignore units since they don't matter"
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
      "stem": "Complete the statement.",
      "data": {
        "template": "A solution to a real-world modeling problem should always be checked for ___ in context.",
        "tiles": [
          "reasonableness",
          "complexity",
          "irrelevance"
        ],
        "correctTile": "reasonableness"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A cylindrical tank must hold at most 100π cubic units. If the radius is 5, find the maximum height using V=πr^{2}h.",
      "data": {
        "answerLabel": "Maximum height =",
        "correctAnswer": "4"
      }
    }
  ]
};
