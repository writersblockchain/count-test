use schemars::JsonSchema;
use secret_toolkit::utils::HandleCallback;
use serde::{Deserialize, Serialize};

use crate::state::BLOCK_SIZE;

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum CounterExecuteMsg {
    Increment {contract: String},
   
}

impl HandleCallback for CounterExecuteMsg {
    const BLOCK_SIZE: usize = BLOCK_SIZE;
}

