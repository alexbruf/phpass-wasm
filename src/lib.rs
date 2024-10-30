mod utils;

use std::convert::TryFrom;

pub mod phpass;
use phpass::PhPass;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, phpass-wasm!");
}

pub fn hass(password: &str) -> String {
    PhPass::new(password).to_string()
}

pub fn verify<'a>(password: &str, hash: &'a str) -> Result<(), phpass::error::Error> {
    PhPass::try_from(hash)?.verify(password)
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(tag = "type")]
pub enum Error {
    OldWPFormat,
    VerificationError,
    Other { message: String },
}
impl From<phpass::error::Error> for Error {
    fn from(value: phpass::error::Error) -> Self {
        match value {
            phpass::error::Error::OldWPFormat => Error::OldWPFormat,
            phpass::error::Error::VerificationError => Error::VerificationError,
            other => Error::Other {
                message: other.to_string(),
            },
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CheckResult(pub bool, pub Option<Error>);

impl From<CheckResult> for JsValue {
    fn from(value: CheckResult) -> Self {
        serde_wasm_bindgen::to_value(&value).unwrap()
    }
}

#[wasm_bindgen]
pub fn hash_password(password: &str) -> String {
    PhPass::new(password).to_string()
}

#[wasm_bindgen]
pub fn check_password(password: &str, hash: &str) -> JsValue {
    match verify(password, hash) {
        Ok(_) => CheckResult(true, None),
        Err(e) => {
            let e: Error = e.into();
            CheckResult(false, Some(e))
        }
    }.into()
}
