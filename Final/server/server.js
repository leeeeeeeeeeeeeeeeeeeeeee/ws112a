const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mariadb',
  host: '127.0.0.1',
  username: 'root',
  password: '123456',
  database: 'fitness_system',
});

const pool = mariadb.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'fitness_system',
});

pool.getConnection()
  .then(conn => {
    console.log('Connected to MariaDB');
    conn.release();
  })
  .catch(err => {
    console.error('Error connecting to MariaDB:', err);
  })

const Trainer = sequelize.define('Trainer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Member = sequelize.define('Member', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Course = sequelize.define('Course', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Trainer.hasMany(Course, {
  foreignKey: 'trainerId',
});
Course.belongsTo(Trainer, {
  foreignKey: 'trainerId',
});

Member.hasMany(Course, {
  foreignKey: 'memberId',
});
Course.belongsTo(Member, {
  foreignKey: 'memberId',
});

sequelize.sync({ force: true }).then(() => {
  console.log('Tables synced');
});
