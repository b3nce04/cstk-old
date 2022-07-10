import Sequelize from "sequelize";

const sequelize = new Sequelize(
	// utf8mb4 emoji-k miatt
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