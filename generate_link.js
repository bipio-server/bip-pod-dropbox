/**
 *
 * @author Michael Pearson <github@m.bip.io>
 * Copyright (c) 2010-2014 Michael Pearson https://github.com/mjpearson
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
function GenerateLink() {}

GenerateLink.prototype = {};

/**
 * Invokes (runs) the action.
 */
GenerateLink.prototype.invoke = function(imports, channel, sysImports, contentParts, next) {
    var client = this.pod.getClient(sysImports);
    var opts = {
            'direct_link' : false
        },
        config = channel.getConfig();

    opts['download'] = config['direct_link'];
    opts['long'] = !config['short'];

    client.makeUrl(imports.path, opts, function(err, url) {
        var exports = {};
        if (!err) {
            exports.url = url.url;
            exports.expires_at = url.expiresAt;
            exports.is_direct = url.isDirect;
            exports.is_preview = url.isPreview
        }
        next(err, exports);
    });

}

// -----------------------------------------------------------------------------
module.exports = GenerateLink;