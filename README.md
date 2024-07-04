# 云游 客户端

# 启动流程

```
yarn install

yarn start

输入 i 打开 ios 模拟器
```

# 开发规范

### 分支开发规范

主分支 main

测试分支 release (研发完将个人分支代码合入到 release 分支)

研发个人的分支从 release 拉取分支，开发完后合入到 release 分支

### 代码开发规范

开发组件

1. 通用组件

直接在 src/components 目录下创建组件

2. 业务组件

在对应页面文件夹下的 components 目录下创建组件

例如：src/home/components/xxx.tsx

