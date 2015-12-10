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
function OnNewFile() {}

OnNewFile.prototype = {};

OnNewFile.prototype.trigger = function(imports, channel, sysImports, contentParts, next) {
  var $resource = this.$resource,
    dataDir = this.pod.getDataDir(channel, this.name),
    client = this.pod.getClient(sysImports);

  this.invoke(imports, channel, sysImports, contentParts, function(err, file) {
    if (err) {
      next(err);
    } else {
      $resource.dupFilter(file, 'path', channel, sysImports, function(err, file) {
        var outFile = dataDir + '/' + file.name;

        // GAAAH!!! A BUFFER, REALLY!?!?!?!??
        client.readFile(file.path, { buffer : true }, function(err, data) {
          if (err) {
            next(err);
          } else {
            $resource.file.save(outFile, data, { encoding : 'binary' }, function(err, fileStruct) {
              if (err) {
                next(err);
              } else {
                var contentParts = {
                  _files : [ fileStruct ]
                }

                next(false, file, contentParts, fileStruct.size);
              }
            });
          }
        });
      });
    }
  });
}

OnNewFile.prototype.discoverFiles = function(client, rootPath, next) {
  var self = this;
  client.stat(rootPath, { readDir: true }, function(error, stat, entries) {
    if (error) {
      next(error);
    } else {
      for (var i = 0; i < entries.length; i++) {
        if ( entries[i].isFile ) {
          next(false, entries[i]);
        } else {
          self.discoverFiles(client, entries[i].path, next);
        }
      }
    }
  });
}

/**
 * Invokes (runs) the action.
 */
OnNewFile.prototype.invoke = function(imports, channel, sysImports, contentParts, next) {
    var $resource = this.$resource;
    var client = this.pod.getClient(sysImports);

    var config = channel.getConfig();

    var path = "/";

    if(config.directory){
    	path = path + config.directory;
    }

    this.discoverFiles(client, path, next);
}

// -----------------------------------------------------------------------------
module.exports = OnNewFile;