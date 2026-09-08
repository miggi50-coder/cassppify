// Combines the 16 per-target specification files into the single TARGET_SPECS
// array the rest of the app expects. To fix or update one target's data (e.g.
// a parsing correction), edit and re-upload just that target's file
// (targetSpecs_X.js) -- this index file only needs to change if a target is
// added or removed entirely.

import { TARGET_A } from "./targetSpecs_A.js";
import { TARGET_B } from "./targetSpecs_B.js";
import { TARGET_C } from "./targetSpecs_C.js";
import { TARGET_D } from "./targetSpecs_D.js";
import { TARGET_E } from "./targetSpecs_E.js";
import { TARGET_F } from "./targetSpecs_F.js";
import { TARGET_G } from "./targetSpecs_G.js";
import { TARGET_H } from "./targetSpecs_H.js";
import { TARGET_I } from "./targetSpecs_I.js";
import { TARGET_J } from "./targetSpecs_J.js";
import { TARGET_K } from "./targetSpecs_K.js";
import { TARGET_L } from "./targetSpecs_L.js";
import { TARGET_M } from "./targetSpecs_M.js";
import { TARGET_N } from "./targetSpecs_N.js";
import { TARGET_O } from "./targetSpecs_O.js";
import { TARGET_P } from "./targetSpecs_P.js";

export const TARGET_SPECS = [TARGET_A, TARGET_B, TARGET_C, TARGET_D, TARGET_E, TARGET_F, TARGET_G, TARGET_H, TARGET_I, TARGET_J, TARGET_K, TARGET_L, TARGET_M, TARGET_N, TARGET_O, TARGET_P];
