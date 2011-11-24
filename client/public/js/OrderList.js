function OrderList(el, menu){
    // Element
    this.el = document.querySelector(el);
    
    this.price = 0;
    
    // Orderd list
    this.items = {};
    
    // Menu
    this.menu = menu;
    
    var self = this;
    // Make sure we call the addItem function with its own scope.
    menu.dropHandler = function(id, e){
        self.addItem.call(self, id, e);
    };
}

/**
 * @param {Number} id Identifier
 */
OrderList.prototype.addItem = function(id){
    var self = this;
    var item = this.items[id];
    var li;
    
    if (item) {
        // Return price to old value
        this.price = this.price - (item.menuItem.price * item.orders);
        li = item.el;
        item.orders++;
    } else {
        li = document.createElement('li');
        $(this.el).prepend(li);
        item = this.items[id] = {
            orders: 1,
            el: li,
            menuItem: this.menu.getById(id)
        };
    }
    
    var menuItem = item.menuItem;
    var price = menuItem.price * item.orders;
    
    // Update element
    li.innerHTML = '<a class="remove" id="'+id+'">' + item.orders + 'x ' + menuItem.name + 
       '<span>&euro;' + Number(price).toFixed(2) + 
       '<img src="images/delete_icon.png" alt="" /></span>' + '</a>';
    
    // Add listener
    $(li).find('img').on('click', function(){
        self.removeItem.call(self, id);
    });
       
    this.updateTotal();
};

OrderList.prototype.updateTotal = function(){
    var price = 0;
    
    for (var key in this.items) {
        if (this.items.hasOwnProperty(key)) {
            var item = this.items[key];
            price = price + (item.menuItem.price * item.orders);
        }
    }
    
    var totalEl = $('.total span')[0].innerHTML = '&euro;'+ Number(price).toFixed(2);
};

OrderList.prototype.getItem = function(id){
    return this.items[id];
};

OrderList.prototype.removeItem = function(id){
    var item = id;
    if (!isNaN(id)){
        item = this.getItem(id);
    }
    
    // Remove child
    this.el.removeChild(item.el);
    delete this.items[id];
    
    this.updateTotal();
};

OrderList.prototype.getList = function(){
    var arr = [];
    
    for (var key in this.items) {
        if (this.items.hasOwnProperty(key)) {
            arr.push({
                id: key,
                count: this.items[key].orders
            });
        }
    }
    return arr;
};