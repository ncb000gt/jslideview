function list_slider() {
    this.height = 0;
    this.width = 200;
    this.current = [];
    this.data = null;
    this.list_element = null;
    this.label_element = null;
    this.init = function(element, options) {
	this.element = element;
	this.height = (options.height || 500);
	this.width = (options.width || 200);
	this.data = (options.data || {});

	/* setup elements for data*/
	this.list_element = this.element;
	this.label_element = options.label_element;

	this.update(this.data);
    };

    this.getData = function() {
	var d = this.data;
	var idx = 0;
	var len = this.current.length;
	for (idx; idx < len; idx++) {
	    if (idx > 0) {
		d = d.children;
	    }
	    d = d[this.current[idx]];
	}
	return d;
    };

    this.slideForward = function(key) {
	this.current.push(key);

	var cur_data = this.getData();
	this.update(cur_data.children);
    };

    this.slideBackward = function(times) {
	if (!times) {
	    times = 1;
	}
	var i = 0;
	for (i; i < times; i++) {
	    this.current.pop();
	}

	if (this.current.length == 0) {
	    this.update(this.data);
	} else {
	    this.update(this.getData().children);
	}
    };

    this.update = function(data) {
	if (this.current){
	    this.label_element.html(this.current[this.current.length - 1]);
	}
	var html = "";
	var key;
	for (key in data) {
	    var item = data[key];
	    var event = "";
	    if (item.children) {
		event = ' onClick="lslider.slideForward(\'' + key + '\');"';
	    }
	    html += ['<li',event,'><span '/*,href="',item.href,'"'*/,'>',item.label,'</span></li>'].join("");
	}

	this.list_element.html(html);
    };

    return this;
};