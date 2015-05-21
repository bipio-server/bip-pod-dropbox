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