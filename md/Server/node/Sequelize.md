# Sequelize

[官网](https://www.sequelize.cn/)

Sequelize 是一个基于 Node.js 的 ORM 框架，支持 MySQL、PostgreSQL、SQLite 和 MSSQL 等多种数据库。ORM 框架可以让我们通过对象的方式操作数据库，而不是直接使用 SQL 语句。MongoDB 也有一个类似的 ORM 框架，叫做 Mongoose。

## 安装

```shell
npm install sequelize --save
npm install mysql2 --save # mysql 驱动
```

## 连接到数据库

```ts
// src/app/index.ts
import { Sequelize } from "sequelize";
import { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } from "../config/config.defult"; // 导入数据库配置

// 创建 Sequelize 实例
export const sequelize: Sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST, // 数据库地址
  dialect: "mysql", // 数据库类型
  // logging: (...msg) => console.log('output', msg), // 显示所有日志函数调用参数
  logging: false, // 不打印日志
});
```

## 定义模型

```ts
// src/model/user.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../app";

// 定义模型
export const User = sequelize.define(
  "User",
  {
    // 在这里定义模型属性
    user_name: {
      type: DataTypes.STRING, // 字段类型,String为字符串
      allowNull: false, // 是否允许为空
      unique: true, // 是否唯一
      comment: "用户名", // 注释
    },
    password: {
      type: DataTypes.CHAR(64), // 字段类型,CHAR为字符串，和String的区别是可以指定长度
      allowNull: false,
      comment: "密码",
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // 默认值
      comment: "是否为管理员,false为否,true为是,默认为false",
    },
  },
  {
    // 这是其他模型参数
    // timestamps: false, // 是否自动添加时间戳createAt，updateAt
  }
);

// User.sync({ force: true }) // 如果表已经存在,则先删除表
// USER.sync() // 如果表已经存在,则不执行任何操作
// User.sync({ alter: true }) // 如果表已经存在,则修改表结构
```
