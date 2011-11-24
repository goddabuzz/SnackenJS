function Menu(el, dropEl, location){
    this.dropEl = document.querySelector(dropEl);
    this.el = document.querySelector(el);
    
    this.getData(location);
}

Menu.prototype.getData = function(location){
    var self = this;
    
    $.getJSON(location, function(res){
        var items = res.menuItems;
        self.items = items;
        self.ids = {};
        
        for (var i = 0, len = items.length; i < len; i++){
            var item = items[i];
            self.ids[item.id] = item;
        }
        self.render();
    });
};

Menu.prototype.getById = function(id){
    return this.ids[id];
};

Menu.prototype.render = function(){
    var items = this.items;
    
    for (var i = 0, len = items.length; i < len; i++){
        var item = items[i];
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#';
        
        li.appendChild(a);
        
        li.id = items[i].id;
        a.innerHTML = '' + items[i].name + '<span>&euro;' + 
            Number(item.price).toFixed(2) + '<img src="images/handdrag_icon.png" alt="" /></span>';
        
        this.el.appendChild(li);
        this.addListener(li);
    }
    
    this.initListeners();
};

Menu.prototype.initListeners = function(){
    var self = this;
    
    // Add order to the order list
    addEvent(self.dropEl, 'drop', function(e){ self.onDrop.call(self, e); });
    
    addEvent(self.dropEl, 'dragover', function (e) {
        if (e.preventDefault) e.preventDefault(); // allows us to drop
        this.className = 'orders dragontop';
        e.dataTransfer.dropEffect = 'copy';
        return false;
    });
    
    // to get IE to work
    addEvent(self.dropEl, 'dragenter', function (e) {
        this.className = 'orders dragontop';
        return false;
    });
    
    addEvent(self.dropEl, 'dragleave', function () {
        this.className = 'orders dragstart';
    });
};

Menu.prototype.onDrop = function(e){
    if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???

    var id = parseInt(e.dataTransfer.getData('Text'), 10);
    if (id && this.dropHandler !== undefined){
        this.dropHandler(id, e);
    }
    
    return false;
};

Menu.prototype.addListener = function(el){
    var self = this;
    el.setAttribute('draggable', 'true');
  
    addEvent(el, 'dragstart', function (e) {
        self.dropEl.className = 'orders dragstart';
        e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
        e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
    });
    addEvent(el, 'dragend', function () {
        self.dropEl.className = 'orders';
    });
};