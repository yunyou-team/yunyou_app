import { globalScreen } from "@/style/layout";
import { StyleSheet } from "react-native";

/** 全局适配 */
const uiWidthPx = 414;

const dp2px = (uiElementPx: number) => {
    return (uiElementPx * globalScreen.width) / uiWidthPx;
}

const AdaptStyleSheet = {
    create(style: Record<string, any>) {
        let s = { ...style };
        // 目前仅对以下的属性进行处理
        let list = [
            "width",
            "height",
            "marginTop",
            "marginBottom",
            "marginLeft",
            "marginRight",
            "paddingTop",
            "paddingRight",
            "paddingBottom",
            "paddingLeft",
            "top",
            "right",
            "bottom",
            "left",
            "fontSize",
            "lineHeight",
        ];
        for (let outKey in s) {
            for (let innerKey in s[outKey]) {
                if (
                    list.includes(innerKey) &&
                    typeof s[outKey][innerKey] == "number"
                ) {
                    s[outKey][innerKey] = dp2px(s[outKey][innerKey]);
                }
            }
        }
        return StyleSheet.create(s);
    },
};

export default AdaptStyleSheet;
