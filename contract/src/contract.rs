use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdError, StdResult,
};

use crate::{
    msg::{CountResponse, ExecuteMsg, InstantiateMsg, QueryMsg, RandomResponse},
    state::{Count, Random, USER_COUNT, USER_RANDOM},
};

#[entry_point]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> StdResult<Response> {
    Ok(Response::default())
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
    match msg {
        ExecuteMsg::Increment {} => try_increment(deps, env),
        ExecuteMsg::RequestRandom {} => try_request_random(deps, env),
    }
}

pub fn try_increment(deps: DepsMut, _env: Env) -> StdResult<Response> {
    // Try to load the existing count. If it doesn't exist, initialize it to 0.
    let mut user_count = USER_COUNT
        .may_load(deps.storage)?
        .unwrap_or(Count { count: 0 });

    // Increment the count
    user_count.count += 1;

    // Save the updated count
    USER_COUNT.save(deps.storage, &user_count)?;

    deps.api.debug("count incremented successfully");
    Ok(Response::default())
}

pub fn try_request_random(deps: DepsMut, env: Env) -> StdResult<Response> {
    let random_u8 = env.block.random.unwrap().0[0];

    let mut user_random = USER_RANDOM
        .may_load(deps.storage)?
        .unwrap_or(Random { random: random_u8 });

    // Update user_random with the new random value
    user_random.random = random_u8;

    USER_RANDOM.save(deps.storage, &user_random)?;

    deps.api.debug("randomness requested successfully");
    Ok(Response::default())
}

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetCount {} => to_binary(&query_count(deps)?),
        QueryMsg::GetRandom {} => to_binary(&query_random(deps)?),
    }
}

fn query_count(deps: Deps) -> StdResult<CountResponse> {
    let count = USER_COUNT.load(deps.storage)?.count;
    Ok(CountResponse { count })
}

fn query_random(deps: Deps) -> StdResult<RandomResponse> {
    let my_random = USER_RANDOM.load(deps.storage)?.random;
    Ok(RandomResponse { random: my_random })
}
