const { DataTypes } = require("sequelize");

module.exports = (sequilize) => {
  sequilize.define("Review", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    stars: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      allowNull: false,
      defaultValue: null,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // date: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   get() {
    //     return timeSince(this.getDataValue('date'));
    //   }
    // }
  },
    {
      timestamps: false,
    });
}

// const timeSince = (stringDate) => {
//   var date = new Date(stringDate);

//   var seconds = Math.floor((new Date() - date) / 1000);

//   var years = seconds / 31536000;
//   if (years === 1) return `hace ${Math.floor(years)} año`;
//   if (years > 1) return `hace ${Math.floor(years)} años`;

//   var months = seconds / 2592000;
//   if (months === 1) return `hace ${Math.floor(months)} mes`;
//   if (months > 1) return `hace ${Math.floor(months)} meses`;

//   var days = seconds / 86400;
//   if (days === 1) return `hace ${Math.floor(days)} día`;
//   if (days > 1) return `hace ${Math.floor(days)} días`;

//   var hours = seconds / 3600;
//   if (hours === 1) return `hace ${Math.floor(hours)} hora`;
//   if (hours > 1) return `hace ${Math.floor(hours)} horas`;

//   var minutes = seconds / 60;
//   if (minutes === 1) return `hace ${Math.floor(minutes)} minuto`;
//   if (minutes > 1) return `hace ${Math.floor(minutes)} minutos`;

//   if (seconds === 0) return `justo ahora`;
//   if (seconds === 1) return `hace ${Math.floor(seconds)} segundo`;
//   return `hace ${Math.floor(seconds)} segundos`;
// }