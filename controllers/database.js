import Sequelize from "sequelize";

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: "mysql",
		define: {
			timestamps: false,
		},
		logging: false,
		timezone: "+02:00"
	}
);

export default sequelize