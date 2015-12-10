/**
 *
 * The Bipio Dropbox Pod.  Dropbox Actions and Content Emitters
 *
 * Copyright (c) 2017 InterDigital, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Pod = require('bip-pod'),
    Dropbox = new Pod(),
    dbox = require('dropbox');

Dropbox.getClient = function(sysImports) {
    var client = new dbox.Client({
        sandbox: sysImports.auth.oauth.sandbox,
        secret : sysImports.auth.oauth.consumerSecret,
        key : sysImports.auth.oauth.consumerKey
    });

    client.setCredentials({
        token : sysImports.auth.oauth.access_token,
        tokenSecret : sysImports.auth.oauth.secret
    });

    return client;
}

Dropbox.profileReprOAuth = function(profile) {
  return profile.display_name;
}

// -----------------------------------------------------------------------------
module.exports = Dropbox;
