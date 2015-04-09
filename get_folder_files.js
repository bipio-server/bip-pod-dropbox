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
function GetFolderFiles() {}

GetFolderFiles.prototype = {};
 
/**
 * Invokes (runs) the action.
 */
GetFolderFiles.prototype.invoke = function(imports, channel, sysImports, contentParts, next) {
    var $resource = this.$resource;
    var client = this.pod.getClient(sysImports);
    
    var config = channel.getConfig();
    var options = { readDir: true };
    var path = "/";
    if(config.directory){
    	path = path + config.directory;
    }
    client.stat(path, options, function(error, stat, entries) {
  	  if (error) {
  		  next(error);
  	  }
      if (entries  && entries.length > 0) {
          for (var i = 0; i < entries.length; i++) {
       	    if(entries[i].isFile) {
	       	     $resource.dupFilter(entries[i], 'path', channel, sysImports, function(err, entries) {
	                 next(err, entries);
	             });
       	    }
           }
       }
  	
	})
}

// -----------------------------------------------------------------------------
module.exports = GetFolderFiles;