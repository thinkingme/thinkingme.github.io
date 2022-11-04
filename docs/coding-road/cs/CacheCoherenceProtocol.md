# 缓存一致

MESI协议

缓存行对齐

jdk8加入了@Contended，需要加上JVM参数 -XX:-RestrictContended，表示数据独立一个缓存行，防止当保持缓存一致时，一个缓存的失效导致另外无关缓存的失效。因为这两个数据在同一个缓存行上。

示例代码：

```java
/**
 * 缓存行对齐
 */
public class T02_CacheLinePadding {
    private static class Padding {
        public volatile long p1, p2, p3, p4, p5, p6, p7;
    }

    private static class T extends Padding {
        public volatile long x = 0L;
    }

    public static T[] arr = new T[2];

    static {
        arr[0] = new T();
        arr[1] = new T();
    }

    public static void main(String[] args) throws Exception {
        Thread t1 = new Thread(()->{
            for (long i = 0; i < 1000_0000L; i++) {
                arr[0].x = i;
            }
        });

        Thread t2 = new Thread(()->{
            for (long i = 0; i < 1000_0000L; i++) {
                arr[1].x = i;
            }
        });

        final long start = System.nanoTime();
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println((System.nanoTime() - start)/100_0000);
    }
}
```