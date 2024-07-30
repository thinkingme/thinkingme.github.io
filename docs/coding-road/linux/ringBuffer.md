# ring buffer

循环数组，读写index

linux中实现为数组长度为2的幂次方

以此来通过（read & (n-1))获得到index

同时in - out 获取len来判断数组是否满了




