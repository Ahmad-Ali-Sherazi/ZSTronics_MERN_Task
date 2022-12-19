module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        userName: {type: String, required: true},
        loginTime: {type: Date, required: false},
        logoutTime: {type: Date, required: false},
        invalidAttemptTime: {type: Date, required: false},
        passwordResetTime: {type: Date, required: false}
      },
      { timestamps: true }
    );
    
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const UserActivity = mongoose.model("userActivity", schema);
    return UserActivity;
};
  