module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        userName: {type: String, required: true},
        password: {type: String, required: true},
        isLoggedIn: {type: Boolean, required: false}
      },
      { timestamps: true }
    );
    
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User = mongoose.model("user", schema);
    return User;
};
  