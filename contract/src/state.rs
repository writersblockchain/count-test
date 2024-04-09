use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use secret_toolkit::storage::Item;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]

pub struct Count {
    pub count: u32,
}

pub static USER_COUNT: Item<Count> = Item::new(b"user count");
