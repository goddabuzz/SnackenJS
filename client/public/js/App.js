var SnackenJS = function(){
    var self = this;
    $(document).ready(function(){
        self.init.call(self);
    });
};

SnackenJS.prototype.init = function () {
    var self = this;
    
    this.menu = new Menu('#list', '#dropbox', 'list');
    this.orderList = new OrderList('#ordered', this.menu);
    
    $('button').on('click', function(){
        new Order(self.orderList).show();
    });
};

new SnackenJS();