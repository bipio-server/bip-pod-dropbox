/**
 *
 * The Bipio Dropbox Pod.  Dropbox Actions and Content Emitters
 *
 * @author Michael Pearson <github@m.bip.io>
 * Copyright (c) 2010-2013 Michael Pearson https://github.com/mjpearson
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
