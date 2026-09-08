// Combines the per-target problem banks into a single flat TARGET_BANK
// object keyed like "A1", "A2", "B1", matching how teachers pick evidence
// statements in the Target Generator. To fix or expand one target's
// problems, edit and re-upload just that target's file (targetBank_X.js).

import { TARGET_BANK_A } from "./targetBank_A.js";
import { TARGET_BANK_B } from "./targetBank_B.js";
import { TARGET_BANK_C } from "./targetBank_C.js";
import { TARGET_BANK_D } from "./targetBank_D.js";
import { TARGET_BANK_E } from "./targetBank_E.js";
import { TARGET_BANK_F } from "./targetBank_F.js";
import { TARGET_BANK_G } from "./targetBank_G.js";
import { TARGET_BANK_H } from "./targetBank_H.js";
import { TARGET_BANK_I } from "./targetBank_I.js";
import { TARGET_BANK_J } from "./targetBank_J.js";
import { TARGET_BANK_K } from "./targetBank_K.js";
import { TARGET_BANK_L } from "./targetBank_L.js";
import { TARGET_BANK_M } from "./targetBank_M.js";
import { TARGET_BANK_N } from "./targetBank_N.js";
import { TARGET_BANK_O } from "./targetBank_O.js";
import { TARGET_BANK_P } from "./targetBank_P.js";

function flatten(letter, bank) {
  const out = {};
  Object.keys(bank).forEach((evNum) => {
    out[letter + evNum] = bank[evNum];
  });
  return out;
}

export const TARGET_BANK = {
  ...flatten("A", TARGET_BANK_A),
  ...flatten("B", TARGET_BANK_B),
  ...flatten("C", TARGET_BANK_C),
  ...flatten("D", TARGET_BANK_D),
  ...flatten("E", TARGET_BANK_E),
  ...flatten("F", TARGET_BANK_F),
  ...flatten("G", TARGET_BANK_G),
  ...flatten("H", TARGET_BANK_H),
  ...flatten("I", TARGET_BANK_I),
  ...flatten("J", TARGET_BANK_J),
  ...flatten("K", TARGET_BANK_K),
  ...flatten("L", TARGET_BANK_L),
  ...flatten("M", TARGET_BANK_M),
  ...flatten("N", TARGET_BANK_N),
  ...flatten("O", TARGET_BANK_O),
  ...flatten("P", TARGET_BANK_P),
};
