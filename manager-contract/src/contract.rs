use cosmwasm_std::{
    entry_point,  DepsMut, Env, MessageInfo, Response,  StdResult, Reply, SubMsg, SubMsgResult
};
use secret_toolkit::utils::HandleCallback;

use crate::{
    counter::CounterExecuteMsg, msg::{ ExecuteMsg, InstantiateMsg, }, state::EXECUTE_INCREMENT_REPLY_ID
};

use crate::error::ContractError;

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
        ExecuteMsg::Increment {contract} => try_increment(deps, env, contract),
       
    }
}

#[entry_point]
pub fn reply (
    deps: DepsMut,
    _env: Env,
    msg: Reply,
) -> Result<Response, ContractError> {
    match msg.id {
        EXECUTE_INCREMENT_REPLY_ID => handle_increment_reply(deps, msg),
        id => Err(ContractError::UnexpectedReplyId { id }),
       
    }
}

pub fn handle_increment_reply(_deps: DepsMut, msg: Reply) -> Result<Response, ContractError> {
  match msg.result {
    SubMsgResult::Ok(_) => Ok(Response::new().add_attribute("action", "increment")),
    SubMsgResult::Err(e) => Err(ContractError::CustomError { val: e }),
  }
}


pub fn try_increment(_deps: DepsMut, _env: Env, contract: String) -> StdResult<Response> {

    let exec_msg = CounterExecuteMsg::Increment { contract };

    let sub_msg = SubMsg::reply_always(
        exec_msg.to_cosmos_msg("e674683faafc8e2ace08e9c62d0c1a9e0ea96727926859753837b3c2095b92d5".to_string(), "secret14590efcwwxlm32wggzz7h644ukgv9ty6x7l37d".to_string(), None)?,
        EXECUTE_INCREMENT_REPLY_ID,
    );

    Ok(Response::new().add_submessage(sub_msg))
}




