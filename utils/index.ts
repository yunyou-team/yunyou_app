import { globalScreen } from "@/style/layout";

/** 适配宽度 */
export const adaptScreenWidth = (width: number) => {
  return (width * globalScreen.width) / 414;
};

/** 适配高度 */
export const adaptScreenHight = (height: number) => {
    return (height * globalScreen.height) / 896;
  };