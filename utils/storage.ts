import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  private static instance: Storage;

  private constructor() {
    // 私有构造函数，防止外部直接实例化
  }

  public static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }

  /**
   * 存储数据
   * @param key 键
   * @param value 值
   */
  public async set(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Storage set error:', error);
      throw error;
    }
  }

  /**
   * 获取数据
   * @param key 键
   * @returns 存储的值，如果不存在返回null
   */
  public async get<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      throw error;
    }
  }

  /**
   * 删除指定键的数据
   * @param key 键
   */
  public async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
      throw error;
    }
  }

  /**
   * 清除所有数据
   */
  public async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
      throw error;
    }
  }

  /**
   * 获取所有存储的键
   * @returns 所有键的数组
   */
  public async getAllKeys(): Promise<readonly string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Storage getAllKeys error:', error);
      throw error;
    }
  }

  /**
   * 批量存储数据
   * @param keyValuePairs 键值对数组
   */
  public async multiSet(keyValuePairs: [string, any][]): Promise<void> {
    try {
      const pairs = keyValuePairs.map(([key, value]) => [
        key,
        JSON.stringify(value)
      ] as [string, string]);
      await AsyncStorage.multiSet(pairs);
    } catch (error) {
      console.error('Storage multiSet error:', error);
      throw error;
    }
  }

  /**
   * 批量获取数据
   * @param keys 键数组
   * @returns 键值对数组
   */
  public async multiGet(keys: string[]): Promise<[string, any][]> {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      return pairs.map(([key, value]) => [key, value ? JSON.parse(value) : null]);
    } catch (error) {
      console.error('Storage multiGet error:', error);
      throw error;
    }
  }
}

// 导出单例实例
export const storage = Storage.getInstance();