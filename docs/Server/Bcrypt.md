# Bcrpyt

[bcrypt npm](https://www.npmjs.com/package/bcrypt)

一个完整的网站的登录注册加密流程通常涉及以下步骤：

1. **前端表单验证**：用户在网站前端输入用户名和密码后，首先进行一些基本的前端表单验证，例如检查用户名和密码是否符合要求（例如长度、字符类型等），以减少无效请求的数量。

2. **传输加密**：用户在提交表单时，前端应该使用加密算法（例如 SHA-256）对用户的密码进行哈希处理，并使用安全协议（例如 HTTPS）将数据加密后传输到服务器。这可以通过使用 SSL/TLS 协议来实现，确保数据在传输过程中被加密，并且无法被未经授权的第三方拦截或篡改。

3. **后端接收**：服务器接收到加密的登录或注册请求后，解析请求的数据。

4. **数据存储**：服务器通常会将用户的敏感数据（如密码）以加密形式存储在数据库中。常见的做法是对密码进行哈希处理，使用强大的哈希算法（如 bcrypt、PBKDF2、scrypt 等），并结合随机生成的盐值进行加密。这样即使数据库泄露，也难以还原用户的原始密码。

5. **用户认证**：当用户登录时，服务器会获取用户输入的用户名和密码，并与存储在数据库中的加密密码进行比对。这通常涉及**使用相同的哈希算法和盐值**来对用户输入的密码进行哈希处理，并将结果与数据库中的哈希值进行比较。如果哈希值匹配，则认为用户提供的凭据是有效的。

6. **会话管理**：一旦用户通过认证，服务器会为该用户创建一个会话（session），并为其分配一个唯一的会话标识符（session ID）。该会话标识符通常以加密形式存储在用户的浏览器 cookie 中，并在用户与网站之间的后续请求中进行传递。服务器使用会话来跟踪用户的登录状态，并提供对受限资源的访问权限。

总的来说，登录注册加密流程的目标是保护用户的敏感信息（如密码）免受未经授权的访问。通过前端传输加密和后端数据加密，以及适当的身份验证和会话管理，网站可以提供更安全的用户登录和注册体验。然而，确保网站的安全性是一个复杂的过程，需要综合考虑许多因素，并采取适当的安全措施来应对各种潜在的威胁。

## 安装 bcrypt

```bash
npm install bcrypt
```

## 使用 bcrypt

加密

```js
// src/middlewares/user.middleware.ts
// 对密码进行加密的中间件
export const encryptPassword = async (ctx: Context, next: Next) => {
  const { password } = ctx.request.body; // 获取密码
  const salt = bcrypt.genSaltSync(10); // 生成盐
  const hash = bcrypt.hashSync(password, salt); // 生成hash密码
  ctx.request.body.password = hash; // 将hash密码赋值给password
  await next();
};
```

验证

```js
// src/middlewares/user.middleware.ts
// 验证密码的中间件
export const verifyPassword = async (ctx: Context, next: Next) => {
  const { user_name, password } = ctx.request.body; // 通过koa-body中间件获取请求体
  const res = await getUserInfo({ user_name });
  const isMatch = bcrypt.compareSync(password, res.password); // 比较密码
  // ...
  await next();
};
```
