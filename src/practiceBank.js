// Combines the 9 per-unit practice bank files into the single PRACTICE_BANK
// object the rest of the app expects. To update or fix problems in one unit,
// edit and re-upload just that unit's file (practiceBank_unitN.js) -- this
// index file only needs to change if a whole new unit file is added.

import { UNIT_1_BANK } from "./practiceBank_unit1.js";
import { UNIT_2_BANK } from "./practiceBank_unit2.js";
import { UNIT_3_BANK } from "./practiceBank_unit3.js";
import { UNIT_4_BANK } from "./practiceBank_unit4.js";
import { UNIT_5_BANK } from "./practiceBank_unit5.js";
import { UNIT_6_BANK } from "./practiceBank_unit6.js";
import { UNIT_7_BANK } from "./practiceBank_unit7.js";
import { UNIT_8_BANK } from "./practiceBank_unit8.js";
import { UNIT_9_BANK } from "./practiceBank_unit9.js";

export const PRACTICE_BANK = {
  ...UNIT_1_BANK,
  ...UNIT_2_BANK,
  ...UNIT_3_BANK,
  ...UNIT_4_BANK,
  ...UNIT_5_BANK,
  ...UNIT_6_BANK,
  ...UNIT_7_BANK,
  ...UNIT_8_BANK,
  ...UNIT_9_BANK,
};
