/**
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