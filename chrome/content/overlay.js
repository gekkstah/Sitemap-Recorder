var generator = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("generator-strings");
	
	generator.file = Components.classes["@mozilla.org/file/directory_service;1"].  
				getService(Components.interfaces.nsIProperties).  
				get("TmpD", Components.interfaces.nsIFile);  
	generator.file.append("sitemap.tmp");  
	generator.file.remove(false);
	generator.file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 0777); 
  },

  onMenuItemCommand: function(e) {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                                  .getService(Components.interfaces.nsIPromptService);
    promptService.alert(window, this.strings.getString("helloMessageTitle"),
                                this.strings.getString("helloMessage"));
  },

  onToolbarButtonCommand: function(e) {
    // just reuse the function above.  you can change this, obviously!
    generator.onMenuItemCommand(e);
  },
  
  onCat: function(e) {

	var istream = Components.classes["@mozilla.org/network/file-input-stream;1"].
				createInstance(Components.interfaces.nsIFileInputStream);
		istream.init(generator.file, 0x01, 0444, 0);
		istream.QueryInterface(Components.interfaces.nsILineInputStream);

	// read lines into array
	var line = {}, lines = [], hasmore;
	do {
	  hasmore = istream.readLine(line);
	  lines.push(line.value+"\n"); 
	} while(hasmore);

	istream.close();

	// do something with read data
	var ta = window.content.document.createElement("textarea");
	ta.innerHTML = lines.join("");
	ta.rows = 5;
	ta.cols = 200;
	ta.style.position = "fixed";
	ta.style.top = 0;
	ta.style.left = 0;
	ta.zIndex = 1010;
	ta.style.overflow = "visible";
	ta.disabled = "disabled";
	window.content.document.getElementsByTagName("body")[0].appendChild(ta);
  },
  
  onPush: function(e) {
 
	 //write
	var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"].
				   createInstance(Components.interfaces.nsIFileOutputStream);

	foStream.init(generator.file, 0x02 | 0x08 | 0x10, 0777, 0); 

	var converter = Components.classes["@mozilla.org/intl/converter-output-stream;1"].
					createInstance(Components.interfaces.nsIConverterOutputStream);
	converter.init(foStream, "UTF-8", 0, 0);

	converter.writeString(window.content.location.href+"\n");
	converter.close();

 
  },
  
  onDrop: function(e) {
	generator.file.remove(false);
	generator.file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 0777); 
  }

  
};

window.addEventListener("load", generator.onLoad, false);
