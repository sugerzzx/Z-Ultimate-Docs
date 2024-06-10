# Bcrpyt

👉 [node.bcrypt.js](https://www.npmjs.com/package/bcrypt)

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

## node.bcrypt.js 和 bcrypt.js 这两个库有什么区别？

Node.js 生态系统中有两个常用的 bcrypt 库：`node.bcrypt.js`和`bcrypt.js`。虽然它们都用于加密和解密密码，但它们在实现方式、性能和使用场景上存在一些区别。以下是详细的比较和解释：

### **1. node.bcrypt.js**

`node.bcrypt.js`是一个基于 C++实现的 bcrypt 库，它利用了 Node.js 的原生扩展来提升性能。以下是它的一些特点：

#### **实现方式**

- **C++绑定**：`node.bcrypt.js`使用 C++绑定实现，它依赖于 Node.js 的原生扩展。通过 C++的性能优势，它在处理 bcrypt 算法时更高效。

#### **性能**

- **高性能**：由于采用了 C++实现，`node.bcrypt.js`在加密和解密操作上具有较高的性能，特别是在需要大量处理的场景下，比如高并发的服务器应用。

#### **依赖**

- **需要编译工具**：因为使用了 C++代码，安装`node.bcrypt.js`需要编译工具链（如`node-gyp`、`make`、`gcc`等）。这意味着你需要在系统上安装这些工具，可能会在安装过程中遇到编译问题，尤其是在不同的操作系统上。

#### **使用场景**

- **适合高性能需求**：如果你的应用对性能要求较高，或者你需要处理大量的密码哈希，`node.bcrypt.js`是一个不错的选择。

#### **安装命令**

```bash
npm install bcrypt
```

### **2. bcrypt.js**

`bcrypt.js`是一个纯 JavaScript 实现的 bcrypt 库，它没有任何原生依赖，因此更容易安装和使用。以下是它的一些特点：

#### **实现方式**

- **纯 JavaScript 实现**：`bcrypt.js`完全使用 JavaScript 编写，没有依赖任何原生扩展或 C++代码。

#### **性能**

- **较低性能**：相比于`node.bcrypt.js`，由于完全使用 JavaScript 实现，`bcrypt.js`在性能上不如`node.bcrypt.js`。不过，对于大多数应用场景而言，它的性能仍然是足够的。

#### **依赖**

- **无编译需求**：因为没有使用任何原生代码，`bcrypt.js`不需要编译工具链。它的安装过程非常简单，适合在各种操作系统和环境中使用，没有安装问题。

#### **使用场景**

- **适合跨平台和轻量级需求**：如果你的应用对性能要求不高，或者你希望避免在不同系统上遇到编译问题，`bcrypt.js`是一个更合适的选择。

#### **安装命令**

```bash
npm install bcryptjs
```

### **详细比较**

| 特性           | `node.bcrypt.js`                   | `bcrypt.js`                        |
| -------------- | ---------------------------------- | ---------------------------------- |
| **实现语言**   | C++和 JavaScript                   | 纯 JavaScript                      |
| **性能**       | 高性能                             | 较低性能                           |
| **编译需求**   | 需要编译工具链                     | 无需编译工具链                     |
| **安装复杂度** | 较高                               | 低                                 |
| **适用场景**   | 高性能应用、需要处理大量哈希的场景 | 跨平台应用、轻量级需求、无编译环境 |
| **依赖管理**   | 需要确保编译工具的正确配置         | 无需额外依赖                       |
| **安装命令**   | `npm install bcrypt`               | `npm install bcryptjs`             |

### **使用示例**

以下是如何在 Node.js 应用中使用这两个库的示例。

#### **node.bcrypt.js**

安装`node.bcrypt.js`：

```bash
npm install bcrypt
```

使用示例：

```javascript
const bcrypt = require("bcrypt");

const saltRounds = 10;
const myPlaintextPassword = "password123";
const someOtherPlaintextPassword = "password456";

// 加密密码
bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
  // 存储 hash
  console.log(hash);

  // 比较密码
  bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
    console.log(result); // true
  });
});
```

#### **bcrypt.js**

安装`bcrypt.js`：

```bash
npm install bcryptjs
```

使用示例：

```javascript
const bcrypt = require("bcryptjs");

const saltRounds = 10;
const myPlaintextPassword = "password123";
const someOtherPlaintextPassword = "password456";

// 加密密码
bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
  // 存储 hash
  console.log(hash);

  // 比较密码
  bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
    console.log(result); // true
  });
});
```

### **总结**

- **选择`node.bcrypt.js`**：如果你的应用需要高性能并且能够在目标系统上安装编译工具链，`node.bcrypt.js`是更好的选择。
- **选择`bcrypt.js`**：如果你需要在各种平台上快速安装和使用 bcrypt 功能，并且不希望遇到编译问题，`bcrypt.js`则是更合适的。

通过理解这些区别，你可以根据具体的应用需求选择适合的 bcrypt 库。
