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
    var podConfig = this.getConfig();

    var client = new dbox.Client({
        key: sysImports.auth.oauth.consumerKey || podConfig.oauth.consumerKey,
        secret: sysImports.auth.oauth.consumerSecret || podConfig.oauth.consumerSecret,
        sandbox: sysImports.auth.oauth.sandbox || podConfig.oauth.sandbox
    });

    client.setCredentials({
        token : sysImports.auth.oauth.token,
        tokenSecret : sysImports.auth.oauth.secret
    });

    return client;
}

// -----------------------------------------------------------------------------
module.exports = Dropbox;
