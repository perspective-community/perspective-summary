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

pub fn merge_siblings(css: &mut Css) {
    let mut res = vec![];
    let reduced = css.iter().cloned().reduce(|x, y| match (x, y) {
        (Ruleset::QualRule(x), Ruleset::QualRule(y)) if x == y => Ruleset::QualRule(x),
        (Ruleset::SelectorRuleset(x), Ruleset::SelectorRuleset(y)) if x.0 == y.0 => {
            let mut tail = x.1.clone();
            tail.extend(y.1);
            Ruleset::SelectorRuleset(SelectorRuleset(x.0.clone(), tail))
        }
        x => {
            res.push(x.0);
            x.1
        }
    });

    if let Some(reduced) = reduced {
        res.push(reduced.clone());
    }

    let mut seen: HashSet<&Ruleset<'_, Rule<'_>>> = HashSet::default();
    let res = res.iter().filter(|x| seen.insert(*x)).cloned().collect();
    *css = crate::ast::Css(res)
}
