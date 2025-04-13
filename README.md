# Hinkedin Mono Repo

- React.js + Spring Boot 全栈项目
- 领英克隆学习项目，跟随 Youssouf Oumar 的 [视频系列](https://www.youtube.com/watch?v=sO_gvRyYkek&list=PLQRe1t1nMu7C_1wTzEIaC-uDntizskmXs) 和 [github 仓库](https://github.com/yousoumar/linkedin)。

## 与视频系列的主要不同

1. 前端的 CSS 部分使用 Tailwindcss 4.0 而不是 scss，界面基本重写，按照领英中国的网页进行模仿。
2. websocket 部分使用新版本 stompjs 建议的连接方法。
3. 使用 Postgres 而不是 MySQL 作为后端数据库。

## 前端技术栈

1. Vite - Typescript, React, react-router-dom
2. Tailwindcss 4.0
3. @stomp/stompjs

## 后端技术栈

1. 使用 Gradle 作为构建工具
2. Java Spring Boot 生态（web, data jpa, validation, mail, websocket）
3. 后端数据库使用 Postgres
4. 使用 Mailhog 进行 SMTP 测试
5. Docker 配合开发与部署

## 特性/功能

- 验证
  - 登录、注册、邮箱验证与密码重置
  - 使用 JWT 进行请求的安全验证
  - ![s1](screenshots/s1.gif)

- 信息流
  - 发文、点赞、评论、编辑/删除推文及评论（即推文和评论的 CRUD）
  - ![s2](screenshots/s2.gif)

- 实时聊天与点赞评论通知
  - 使用 WebSocket 实现实时聊天
  - 对在线用户实时通知点赞及评论
  - ![s3](screenshots/s3.gif)

## 待完成

### 前端

- 列表的分页加载（推文、评论列表）
- 对推文、评论内容字数限制
- 更详细的通知，单个推文的页面
- 个人所有的推文页面
- 聊天消息的时间显示
- ...

### 后端

- 列表的排序（推文、评论）
- 优化 JSON 发送的实体字段，提高 REST API 获取信息的细粒度
- ...

### 特性/功能

- 推文转发
- 评论的递归回复
- 用户个人信息设置（profile 页面）
- 关注（“人脉”页面功能）
- ...

## 开发事项

### 开发

#### 后端开发

1. 启动 Docker（数据库、SMTP 测试服务器）
   docker compose up
   docker compose down

2. 启动项目
   ./gradlew bootRun

3. 热重载构建但不运行测试
   ./gradlew build -t -x test

#### 前端开发

1. 启动开发服务器
   npm run dev

2. 代码的编写顺序
   - 初期更多关注功能的实现而不是样式的细节调整，先完成功能再进行样式调整

3. 代码的可读性
   - 利用 Typescript 的优点进行类型标注

4. 组件的拆分
   - 组件放在同名文件夹下，当组件代码过长时注意拆分文件，子组件放于大组件目录下
   - 注意可复用的组件，及时优化组件目录结构，避免重复编写相似的 TailwindCSS
