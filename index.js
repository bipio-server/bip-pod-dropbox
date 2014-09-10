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
    Dropbox = new Pod({
        name : 'dropbox',
        title : 'Dropbox',
        description : 'Dropbox is a file hosting service operated by Dropbox, Inc., that offers cloud storage, file synchronization, and client software.',
        authType : 'oauth',
        passportStrategy : require('passport-dropbox').Strategy,
        config : {
            "oauth": {
                "consumerKey" : "",
                "consumerSecret" : "",
                "sandbox" : true
            }
        }
    });

Dropbox.add(require('./generate_link.js'));
Dropbox.add(require('./save_file.js'));

// -----------------------------------------------------------------------------
module.exports = Dropbox;
