use crate::state::BLOCK_SIZE;
use schemars::JsonSchema;
use secret_toolkit::utils::InitCallback;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct InstantiateMsg {}

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    Increment {contract: String},
   
}

impl InitCallback for ExecuteMsg {
    const BLOCK_SIZE: usize = BLOCK_SIZE;
}


