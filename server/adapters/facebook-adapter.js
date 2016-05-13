import express from 'express';
import FB from "fb";

import grantConfig from '../../grant-config.json';
import AdapterBase from "./adapter-base";

import {User, LinkedAccount} from '../models';

export default class FacebookAdapter extends AdapterBase {

  makeCredentials(acct) {
    var credentials = super.makeCredentials('facebook', acct);

    credentials.access_token_key = credentials.access_token;
    credentials.access_token_secret = credentials.access_secret;

    return credentials;
  }

  fetchPosts(acct, res) {
    console.log("im working");
    FB.api("/me", "get", { fields: last_name }, (res => console.log(res)))
  }
  
}
