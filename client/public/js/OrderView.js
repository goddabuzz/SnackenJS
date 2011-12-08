function OrderView(){
    // Menu
    this.items = [];
    this.ids = {};
    
    // Orders received
    this.orders = [];
    
    this.loadMenu();
}

/**
 * Load Menu Items
 */
OrderView.prototype.loadMenu = function(){
    var self = this;
    $.getJSON('list', function(res){
        var items = res.menuItems;
        for (var i = 0, len = items.length; i < len; i++){
            var item = items[i];
            self.ids[item.id] = item;
        }
        
        self.loadOrders.call(self);
    });
};

/**
 * Load orders
 */
OrderView.prototype.loadOrders = function(){
    var self = this;
    $.getJSON('orderlist', function(res){
        self.orders = res.items;
        self.calculate.call(self);
        self.render.call(self);
    });
};

/**
 * Calculate everyhitng
 */
OrderView.prototype.calculate = function(){
    var itemsSelected = {};
    var perPersonCount = {};
    var totalPriceCount = {};

    for (var i = 0, len = this.orders.length; i < len; i++){
        var order = this.orders[i];
        var items = order.order;
        var price = 0;
        
        for (var j = 0, olen = items.length; j < olen; j++){
            var item = items[j];
            var menuItem = this.ids[item.id];
            var count = Number(item.count);
            
            if (!itemsSelected[item.id]){
                itemsSelected[item.id]=0;
            }
            itemsSelected[item.id]=itemsSelected[item.id]+count;
            
            price = price + (Number(menuItem.price)*count);
        }
        console.log('Order: ' + order.name + ' - Price: ' + Number(price).toFixed(2));
    }
    
    console.log('---------------');
    
    for (var key in itemsSelected){
        console.log(itemsSelected[key] + 'x ' + this.ids[key].name);
    }
};

/**
 * Render page
 */
OrderView.prototype.render = function(){
    
};

$(document).ready(function(){
    new OrderView();
});