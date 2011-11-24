var id = 0;

function User(name){
    this.values = {};
    
    this.set('name', name);
    this.set('id', id++);
}

User.prototype.set = function(key, value){
    this.values[key] = value;
};

User.prototype.get = function(key) {
    return this.values[key];
};

module.exports = User;