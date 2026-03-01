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

pub fn remove_var(css: &mut Css) {
    let reduced = css
        .iter()
        .filter(|&ruleset| match ruleset {
            Ruleset::QualRule(QualRule(_, Some(val))) if val.strip_prefix(':').is_some() => false,
            _ => true,
        })
        .cloned();

    *css = crate::ast::Css(reduced.collect())
}
