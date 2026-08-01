// ┌───────────────────────────────────────────────────────────────────────────┐
// │                                                                           │
// │  ██████╗ ██████╗  ██████╗   Copyright (C) 2022, The Prospective Company   │
// │  ██╔══██╗██╔══██╗██╔═══██╗                                                │
// │  ██████╔╝██████╔╝██║   ██║  This file is part of the Procss library,      │
// │  ██╔═══╝ ██╔══██╗██║   ██║  distributed under the terms of the            │
// │  ██║     ██║  ██║╚██████╔╝  Apache License 2.0.  The full license can     │
// │  ╚═╝     ╚═╝  ╚═╝ ╚═════╝   be found in the LICENSE file.                 │
// │                                                                           │
// └───────────────────────────────────────────────────────────────────────────┘

use std::collections::HashSet;

use crate::ast::Ruleset::{self};
use crate::ast::*;

pub fn deduplicate(css: &mut Css) {
    let mut seen: HashSet<&Ruleset<'_, Rule<'_>>> = HashSet::default();
    let res = css
        .iter()
        .rev()
        .filter(|x| seen.insert(*x))
        .rev()
        .cloned()
        .collect();
    *css = crate::ast::Css(res);
}
