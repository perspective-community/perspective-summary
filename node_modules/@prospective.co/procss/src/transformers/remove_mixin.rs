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

use crate::ast::Ruleset::{self};
use crate::ast::*;

pub fn remove_mixin(css: &mut Css) {
    let reduced = css
        .iter()
        .filter(|&x| {
            !matches!(
                x,
                Ruleset::QualRule(QualRule("mixin", _))
                    | Ruleset::QualNestedRuleset(QualNestedRuleset(QualRule("mixin", _), _))
                    | Ruleset::QualRuleset(QualRuleset(QualRule("mixin", _), _))
            )
        })
        .cloned();

    *css = crate::ast::Css(reduced.collect())
}
