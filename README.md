# 云游 客户端

# 1. 启动流程

```
yarn install

yarn start

输入 i 打开 ios 模拟器
```

# 1.2 注意事项！！

node 版本要求 20

yarn 版本要求 4.7

yarn 更新步骤如下：

```
corepack enable

yarn set version stable

yarn install
```

# 2. 开发规范

### 2.1 分支开发规范

主分支 main

测试分支 release (研发完将个人分支代码合入到 release 分支)

研发个人的分支从 release 拉取分支，开发完后合入到 release 分支

合入 release 分支后，需注意：

1. 先拉取 release 最新分支，合入你的研发分支 并解决冲突

2. 在 github 上创建 PR ，合入到 release 分支

3. 找一名研发同学 review 代码，确认无误后 审核人 合入到 release 分支

### 2.2 代码开发规范

-   2.2.1 开发组件

1. 通用组件

直接在 /components 目录下创建组件

2. 业务组件

在 /app/components 目录下对应页面文件夹下 创建组件

例如：/app/components/index/xxx.tsx

-   2.2.2 全局颜色系统

如需要使用全局的颜色变量 使用规则如下：

```
import { globalColor } from '@/style/color' // 导入颜色系统

export default function Home() {
  return (
    <View
      style={styles.viewBg}
    >
      <LinearGradient
        colors={globalColor.THEME_TWO.color} // 使用二级主题色 - 颜色
        locations={globalColor.THEME_TWO.location} // 使用二级主题色 - 渐变位置
        style={styles.viewBg}
      >
        <Text style={styles.redColor}>Home</Text>
        <Text style={styles.greenColor}>Home</Text>
      </LinearGradient>
    </View>
  );
}


const styles = StyleSheet.create({
    redColor: {
        color: globalColor.FONT_ONE, // 使用一级字体色
    },
    greenColor: {
        color: globalColor.FONT_TWO, // 使用二级字体色
    }
});

```

-   2.2.3 全局样式适配

如需要使用全局的样式适配 使用规则如下：

```
import { createAdaptStyleSheet } from '@/utils/index'  // 引入样式适配工具

const styles = createAdaptStyleSheet.create({   // 使用样式适配工具
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    marginTop: 60,
    marginBottom: 32,
    paddingHorizontal: 18,
  }
});
```

-   2.2.4 局部样式适配

如果需要局部使用适配，如组件的宽度参数，使用规则如下：

```
import { dp2px } from '@/utils/adaptScreen';

 <Carousel
    layout={'stack'}
    data={carouselItems}
    vertical={false}
    layoutCardOffset={55}
    renderItem={(item) => (
        <Card
            title={item.item.title}
            text={item.item.text}
            source={item.item.source}
        />
    )}
    sliderWidth={100}
    itemWidth={dp2px(321)}
  />
```

-   2.2.5 图片引入规范

统一在根目录 assets/images/ 下，对应页面文件夹中 如首页则在 assets/images/home 下。

图片命名规范：页面文件夹名称_图片名称.png，如首页的背景图: home_bg.png

### 2.3 请求接口

接口请求相关逻辑统一在根目录 services 下，如首页的接口请求逻辑在 services/home.ts 下

```typescript
interface IExampleInfo {
    info: string;
}

export async function fetchExampleInfo(): Promise<IExampleInfo> {
    const { data } = await request.post<IExampleInfo>('/example/info', {});
    return data;
}
```

mock 接口平台待定

# 3. 全局工具
### 3.1 全局储存工具 storage

使用如下(注意 是异步)：
```
// 在其他文件中使用
import { storage } from '@/utils/Storage';

// 存储数据
await storage.set('user', { name: 'John', age: 30 });

// 获取数据
const user = await storage.get<{ name: string; age: number }>('user');

// 删除数据
await storage.remove('user');

// 批量操作
await storage.multiSet([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);

// 获取所有键
const allKeys = await storage.getAllKeys();
```
