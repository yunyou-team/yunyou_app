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

合入 release 分支后，需注意：

1. 先拉取 release 最新分支，合入你的研发分支 并解决冲突

2. 在 github 上创建 PR ，合入到 release 分支

3. 找一名研发同学 review 代码，确认无误后 审核人 合入到 release 分支

### 代码开发规范

- 开发组件

1. 通用组件

直接在 src/components 目录下创建组件

2. 业务组件

在对应页面文件夹下的 components 目录下创建组件

例如：src/home/components/xxx.tsx


- 全局颜色系统

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