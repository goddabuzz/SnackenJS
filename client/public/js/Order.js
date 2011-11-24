function Order(orderList){
    this.orderList = orderList;
    this.init();
}
$.extend(Order.prototype, Dialog.prototype, {
    init: function(){
        this.width = 500;
        this.height = 300;
        
        // Defaults
        this.isModal = true;
        this.extraCls = '';
        
        this.initBody();
        
        this.render();
        
        this.initListeners();
    },
    
    initBody: function(){
        this.body = document.createElement('div');
        
        this.body.innerHTML = 
            '<h1>Bestelling plaatsen</h1>'+
            '<form>'+
                '<label>Naam</label>'+
                '<input type="text" name="name" id="name" placeHolder="Naam"></input>'+
                '<label>Opmerking</label>'+
                '<textarea name="extra" tabindex="40" id="extra" cols="40" rows="10" placeHolder=""></textarea>'+
                '<button type="button" id="suborder">Verzenden!</button>' +
            '</form>';
    },
    
    initListeners: function(){
        var self = this;
        var btn = $(this.body).find('button');
        btn.on('click', function(){
            self.onSubmitClick.call(self);
        });
    },
    
    onSubmitClick: function(){
        var self = this;
        
        var name = $("input#name").val();
        var extra = $("textarea#extra").val();
        var list = self.orderList.getList();
        
        $.post("order", {
            name: name,
            extra: extra,
            time: new Date().getTime(),
            order: list
        }, function(data) {
                if (data.success) {
                    self.body.innerHTML = '<h1>Bestelling geplaatst</h1>';
                } else {
                    self.body.innerHTML = '<h1>Error</h1>';
                }
            }
        );
    }
});