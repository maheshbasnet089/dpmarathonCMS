module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define("user", {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull : false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull:false
      },
      photo : {
        type : DataTypes.STRING
      }
 
    });
    return Blog;
  };