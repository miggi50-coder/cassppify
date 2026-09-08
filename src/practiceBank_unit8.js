// Static practice bank -- Unit 8: Statistics and Decision Making (Modules 20–23)
// Part of the free, no-API-cost Topic Practice Generator question bank.
// Combined into the full PRACTICE_BANK by practiceBank.js.

export const UNIT_8_BANK = {
  "20.1": [
    {
      "type": "multiple_choice",
      "stem": "A researcher surveys every student in a school. This is an example of:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "A census"
          },
          {
            "id": "B",
            "text": "A sample"
          },
          {
            "id": "C",
            "text": "An experiment"
          },
          {
            "id": "D",
            "text": "A simulation"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Which sampling method involves dividing the population into groups and randomly selecting entire groups?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Cluster sampling"
          },
          {
            "id": "B",
            "text": "Simple random sampling"
          },
          {
            "id": "C",
            "text": "Stratified sampling"
          },
          {
            "id": "D",
            "text": "Systematic sampling"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "A poll only surveys people who call in to a radio show. This sampling method is likely to have:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Selection bias"
          },
          {
            "id": "B",
            "text": "No bias"
          },
          {
            "id": "C",
            "text": "Random assignment"
          },
          {
            "id": "D",
            "text": "A census"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which of the following are examples of random sampling methods? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Simple random sampling"
          },
          {
            "id": "B",
            "text": "Stratified sampling"
          },
          {
            "id": "C",
            "text": "Convenience sampling"
          },
          {
            "id": "D",
            "text": "Systematic sampling"
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
      "stem": "Match each sampling method to its description.",
      "data": {
        "rows": [
          "Simple random sampling",
          "Stratified sampling",
          "Systematic sampling"
        ],
        "columns": [
          "Every member has an equal chance of selection",
          "Population divided into subgroups, then randomly sampled from each",
          "Every nth member is selected"
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
      "stem": "Complete the statement.",
      "data": {
        "template": "A sample that does not accurately represent the population is said to have ___.",
        "tiles": [
          "bias",
          "variance",
          "randomness"
        ],
        "correctTile": "bias"
      }
    }
  ],
  "20.2": [
    {
      "type": "equation_numeric",
      "stem": "Find the mean of the data set: 4, 8, 6, 5, 3, 7, 9",
      "data": {
        "answerLabel": "Mean =",
        "correctAnswer": "6"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Find the median of the data set: 4, 8, 6, 5, 3, 7, 9",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "6"
          },
          {
            "id": "B",
            "text": "5"
          },
          {
            "id": "C",
            "text": "7"
          },
          {
            "id": "D",
            "text": "8"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "Find the range of the data set: 4, 8, 6, 5, 3, 7, 9",
      "data": {
        "answerLabel": "Range =",
        "correctAnswer": "6"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements describe measures of spread (variability)? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Range"
          },
          {
            "id": "B",
            "text": "Standard deviation"
          },
          {
            "id": "C",
            "text": "Mean"
          },
          {
            "id": "D",
            "text": "Interquartile range"
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
      "stem": "Match each statistic to its category.",
      "data": {
        "rows": [
          "Mean",
          "Standard deviation",
          "Median"
        ],
        "columns": [
          "Measure of center",
          "Measure of spread"
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
      "stem": "Complete the statement.",
      "data": {
        "template": "A data distribution that is not symmetric, with a longer tail on one side, is said to be ___.",
        "tiles": [
          "skewed",
          "normal",
          "uniform"
        ],
        "correctTile": "skewed"
      }
    }
  ],
  "21.1": [
    {
      "type": "equation_numeric",
      "stem": "What is the probability of rolling a 4 on a fair six-sided die? Give your answer as a fraction.",
      "data": {
        "answerLabel": "P =",
        "correctAnswer": "frac{1}{6}"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "What is the probability of drawing a heart from a standard 52-card deck?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "frac{1}{4}"
          },
          {
            "id": "B",
            "text": "frac{1}{13}"
          },
          {
            "id": "C",
            "text": "frac{1}{52}"
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
      "stem": "Find the expected value of rolling a fair six-sided die.",
      "data": {
        "answerLabel": "Expected value =",
        "correctAnswer": "3.5"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements about probability distributions are true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "The sum of all probabilities in a distribution equals 1"
          },
          {
            "id": "B",
            "text": "All probabilities must be between 0 and 1"
          },
          {
            "id": "C",
            "text": "A probability can be negative"
          },
          {
            "id": "D",
            "text": "Expected value represents a long-run average"
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
      "stem": "Complete the statement.",
      "data": {
        "template": "A distribution that assigns probabilities to each possible outcome of a random variable is called a probability ___.",
        "tiles": [
          "distribution",
          "sample",
          "population"
        ],
        "correctTile": "distribution"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A bag has 3 red and 2 blue marbles. What is the probability of drawing a red marble? Give your answer as a fraction.",
      "data": {
        "answerLabel": "P(red) =",
        "correctAnswer": "frac{3}{5}"
      }
    }
  ],
  "21.2": [
    {
      "type": "equation_numeric",
      "stem": "A normal distribution has mean 100 and standard deviation 15. Find the z-score for x=130.",
      "data": {
        "answerLabel": "z =",
        "correctAnswer": "2"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "In a normal distribution, approximately what percent of data falls within 1 standard deviation of the mean?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "68%"
          },
          {
            "id": "B",
            "text": "95%"
          },
          {
            "id": "C",
            "text": "99.7%"
          },
          {
            "id": "D",
            "text": "50%"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A normal distribution has mean 100 and standard deviation 15. Find the z-score for x=70.",
      "data": {
        "answerLabel": "z =",
        "correctAnswer": "-2"
      }
    },
    {
      "type": "multi_select",
      "stem": "According to the Empirical Rule, which statements are true for a normal distribution? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "About 68% of data falls within 1 standard deviation of the mean"
          },
          {
            "id": "B",
            "text": "About 95% of data falls within 2 standard deviations of the mean"
          },
          {
            "id": "C",
            "text": "About 99.7% of data falls within 3 standard deviations of the mean"
          },
          {
            "id": "D",
            "text": "About 50% of data falls within 1 standard deviation of the mean"
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
        "template": "A normal distribution is symmetric about its ___.",
        "tiles": [
          "mean",
          "range",
          "interquartile range"
        ],
        "correctTile": "mean"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A normal distribution has mean 50 and standard deviation 5. Find the z-score for x=60.",
      "data": {
        "answerLabel": "z =",
        "correctAnswer": "2"
      }
    }
  ],
  "21.3": [
    {
      "type": "multiple_choice",
      "stem": "A sampling distribution describes the distribution of:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "A sample statistic across many samples"
          },
          {
            "id": "B",
            "text": "Individual data points in one sample"
          },
          {
            "id": "C",
            "text": "The entire population"
          },
          {
            "id": "D",
            "text": "A single random variable"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "As sample size increases, the variability of the sampling distribution of the mean:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "decreases"
          },
          {
            "id": "B",
            "text": "increases"
          },
          {
            "id": "C",
            "text": "stays the same"
          },
          {
            "id": "D",
            "text": "becomes unpredictable"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "The Central Limit Theorem states that the sampling distribution of the sample mean approaches which shape as sample size increases?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Normal"
          },
          {
            "id": "B",
            "text": "Uniform"
          },
          {
            "id": "C",
            "text": "Skewed"
          },
          {
            "id": "D",
            "text": "Bimodal"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements about sampling distributions are true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Larger samples produce sampling distributions with less variability"
          },
          {
            "id": "B",
            "text": "The mean of the sampling distribution equals the population mean"
          },
          {
            "id": "C",
            "text": "Sampling distributions are always skewed"
          },
          {
            "id": "D",
            "text": "The Central Limit Theorem applies as sample size increases"
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
      "stem": "Complete the statement.",
      "data": {
        "template": "The standard deviation of a sampling distribution is called the standard ___.",
        "tiles": [
          "error",
          "deviation",
          "variance"
        ],
        "correctTile": "error"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Which of the following increases the accuracy of an estimate based on a sampling distribution?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Increasing the sample size"
          },
          {
            "id": "B",
            "text": "Decreasing the sample size"
          },
          {
            "id": "C",
            "text": "Using a biased sample"
          },
          {
            "id": "D",
            "text": "Ignoring variability"
          }
        ],
        "correctId": "A"
      }
    }
  ],
  "22.1": [
    {
      "type": "equation_numeric",
      "stem": "A poll finds 50% support with a margin of error of 3%. Find the lower bound of the confidence interval.",
      "data": {
        "answerLabel": "Lower bound =",
        "correctAnswer": "47%"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "A poll finds 50% support with a margin of error of 3%. What is the upper bound of the confidence interval?",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "53%"
          },
          {
            "id": "B",
            "text": "47%"
          },
          {
            "id": "C",
            "text": "50%"
          },
          {
            "id": "D",
            "text": "56%"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "As sample size increases, the margin of error typically:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "decreases"
          },
          {
            "id": "B",
            "text": "increases"
          },
          {
            "id": "C",
            "text": "stays the same"
          },
          {
            "id": "D",
            "text": "becomes negative"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements about margin of error are true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "A larger sample size generally reduces the margin of error"
          },
          {
            "id": "B",
            "text": "The margin of error creates a range of plausible values for the true population parameter"
          },
          {
            "id": "C",
            "text": "A smaller margin of error indicates more precision"
          },
          {
            "id": "D",
            "text": "The margin of error is unrelated to sample size"
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
        "template": "A confidence interval provides a range of plausible values for a population ___.",
        "tiles": [
          "parameter",
          "sample",
          "bias"
        ],
        "correctTile": "parameter"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A poll finds 62% support with a margin of error of 4%. Find the upper bound of the confidence interval.",
      "data": {
        "answerLabel": "Upper bound =",
        "correctAnswer": "66%"
      }
    }
  ],
  "22.2": [
    {
      "type": "multiple_choice",
      "stem": "A study that randomly assigns subjects to treatment groups and manipulates a variable is called:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "An experiment"
          },
          {
            "id": "B",
            "text": "An observational study"
          },
          {
            "id": "C",
            "text": "A census"
          },
          {
            "id": "D",
            "text": "A survey"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "A study that observes subjects without assigning treatments is called:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "An observational study"
          },
          {
            "id": "B",
            "text": "An experiment"
          },
          {
            "id": "C",
            "text": "A controlled trial"
          },
          {
            "id": "D",
            "text": "A census"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Only an experiment, not an observational study, can establish:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Cause and effect"
          },
          {
            "id": "B",
            "text": "Correlation"
          },
          {
            "id": "C",
            "text": "A sample mean"
          },
          {
            "id": "D",
            "text": "A confidence interval"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which are key features of a well-designed experiment? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Random assignment to treatment groups"
          },
          {
            "id": "B",
            "text": "A control group"
          },
          {
            "id": "C",
            "text": "Manipulation of the independent variable"
          },
          {
            "id": "D",
            "text": "Observing subjects without intervention"
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
      "stem": "Match each study type to its key characteristic.",
      "data": {
        "rows": [
          "Experiment",
          "Observational study",
          "Survey"
        ],
        "columns": [
          "Random assignment and manipulation of a variable",
          "Observation without intervention",
          "Self-reported data collection"
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
      "stem": "Complete the statement.",
      "data": {
        "template": "In an experiment, the group that does not receive the treatment is called the ___ group.",
        "tiles": [
          "control",
          "sample",
          "treatment"
        ],
        "correctTile": "control"
      }
    }
  ],
  "22.3": [
    {
      "type": "multiple_choice",
      "stem": "A result is considered statistically significant if it is:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "unlikely to have occurred by random chance alone"
          },
          {
            "id": "B",
            "text": "always true for the population"
          },
          {
            "id": "C",
            "text": "based on a small sample"
          },
          {
            "id": "D",
            "text": "the same as the null hypothesis"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "A p-value of 0.02 compared to a significance level of 0.05 would lead to:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "rejecting the null hypothesis"
          },
          {
            "id": "B",
            "text": "accepting the null hypothesis as certainly true"
          },
          {
            "id": "C",
            "text": "increasing the sample size"
          },
          {
            "id": "D",
            "text": "ignoring the result"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "If two treatment groups show a difference, but the difference could easily occur by random chance, the result is:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "not statistically significant"
          },
          {
            "id": "B",
            "text": "statistically significant"
          },
          {
            "id": "C",
            "text": "biased"
          },
          {
            "id": "D",
            "text": "a census"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements about statistical significance are true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "A smaller p-value provides stronger evidence against the null hypothesis"
          },
          {
            "id": "B",
            "text": "Statistical significance does not always imply practical importance"
          },
          {
            "id": "C",
            "text": "A statistically significant result proves the null hypothesis is true"
          },
          {
            "id": "D",
            "text": "Randomization helps rule out chance as the sole explanation for a difference"
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
      "stem": "Complete the statement.",
      "data": {
        "template": "The hypothesis that there is no real effect or difference is called the ___ hypothesis.",
        "tiles": [
          "null",
          "alternative",
          "significant"
        ],
        "correctTile": "null"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "A simulation is often used in statistics to:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "estimate how likely a result is due to chance"
          },
          {
            "id": "B",
            "text": "eliminate the need for a sample"
          },
          {
            "id": "C",
            "text": "guarantee statistical significance"
          },
          {
            "id": "D",
            "text": "replace random assignment"
          }
        ],
        "correctId": "A"
      }
    }
  ],
  "23.1": [
    {
      "type": "multiple_choice",
      "stem": "A method for making a fair decision between two people is:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "flipping a fair coin"
          },
          {
            "id": "B",
            "text": "choosing based on age"
          },
          {
            "id": "C",
            "text": "letting one person always decide"
          },
          {
            "id": "D",
            "text": "using a biased spinner"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A carnival game costs $2 to play. You win $10 with probability 0.1, and win nothing otherwise. Find the expected net gain (expected winnings minus cost).",
      "data": {
        "answerLabel": "Expected net gain = $",
        "correctAnswer": "-1"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "A lottery ticket has an expected value of -$0.50. This means:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "on average, a player loses 50 cents per ticket"
          },
          {
            "id": "B",
            "text": "every player loses exactly 50 cents"
          },
          {
            "id": "C",
            "text": "the lottery is a fair game"
          },
          {
            "id": "D",
            "text": "the ticket always wins"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which decision methods use probability to ensure fairness? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "Flipping a coin"
          },
          {
            "id": "B",
            "text": "Rolling a die"
          },
          {
            "id": "C",
            "text": "Random number generation"
          },
          {
            "id": "D",
            "text": "Choosing the tallest person"
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
        "template": "A decision is considered fair when each outcome has an ___ chance of occurring, for equally likely outcomes.",
        "tiles": [
          "equal",
          "unequal",
          "increasing"
        ],
        "correctTile": "equal"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "A game costs $5 to play. You win $20 with probability 0.2 and nothing otherwise. Find the expected net gain.",
      "data": {
        "answerLabel": "Expected net gain = $",
        "correctAnswer": "-1"
      }
    }
  ],
  "23.2": [
    {
      "type": "multiple_choice",
      "stem": "A two-way frequency table is used to analyze the relationship between:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "two categorical variables"
          },
          {
            "id": "B",
            "text": "two continuous variables"
          },
          {
            "id": "C",
            "text": "a single variable over time"
          },
          {
            "id": "D",
            "text": "sample size and bias"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "In a two-way table, 40 out of 100 students are boys who play sports. What is the relative frequency, as a decimal, of boys who play sports?",
      "data": {
        "answerLabel": "Relative frequency =",
        "correctAnswer": "0.4"
      }
    },
    {
      "type": "multiple_choice",
      "stem": "Two events A and B are independent if:",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "P(A and B) = P(A) × P(B)"
          },
          {
            "id": "B",
            "text": "P(A and B) = P(A) + P(B)"
          },
          {
            "id": "C",
            "text": "P(A)=P(B)"
          },
          {
            "id": "D",
            "text": "A and B cannot both occur"
          }
        ],
        "correctId": "A"
      }
    },
    {
      "type": "multi_select",
      "stem": "Which statements about conditional probability are true? Select all that apply.",
      "data": {
        "options": [
          {
            "id": "A",
            "text": "P(A|B) means the probability of A given that B has occurred"
          },
          {
            "id": "B",
            "text": "If A and B are independent, P(A|B) = P(A)"
          },
          {
            "id": "C",
            "text": "Conditional probability can be found from a two-way table"
          },
          {
            "id": "D",
            "text": "P(A|B) always equals P(B|A)"
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
        "template": "Two events are ___ if the occurrence of one does not affect the probability of the other.",
        "tiles": [
          "independent",
          "dependent",
          "conditional"
        ],
        "correctTile": "independent"
      }
    },
    {
      "type": "equation_numeric",
      "stem": "In a two-way table, 25 out of 50 total students prefer math. What is the relative frequency, as a decimal?",
      "data": {
        "answerLabel": "Relative frequency =",
        "correctAnswer": "0.5"
      }
    }
  ]
};
