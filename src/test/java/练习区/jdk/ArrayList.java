package 练习区.jdk;

import java.util.Arrays;

/**
 * @param <K>
 */
public class ArrayList<K> {
    //设置arrayList默认容量
    private static final int DEFAULT_CAPACITY = 10;
    //上限
    private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;
    //arrayList的实际元素数量
    private int size=0;
    //保存数据的数组

    transient Object[] value;

    private static final Object[] EMPTY_ELEMENTDATA = {};

    public ArrayList(int initialCapacity) {
        if (initialCapacity > 0) {
            this.value = new Object[initialCapacity];
        } else if (initialCapacity == 0) {
            this.value = EMPTY_ELEMENTDATA;
        } else {
            throw new IllegalArgumentException("Illegal Capacity: " + initialCapacity);
        }
    }


    //增加
    public boolean add(K obj)
    {
        if(size==value.length){  //超出了数组可容纳的长度，需要进行动态扩展
            grow(size + 1);
        }
        value[size++]=obj;
        return true;
    }

    //获取
    public K get(int index)
    {
        if(index<0||index>=size)
            return null;
        return (K)value[index];
    }
    //修改
    public boolean set(int index,Object obj)
    {
        if(index<0||index>=size)
            return false;
        value[index]=obj;
        return true;
    }
    //删除
    public boolean remove(int index)
    {
        if(index<0||index>=size) {
            return false;
        }
        Object[] temp=new Object[value.length];//使用到数组长度的地方要由size来替代，因为size才是真实的元素个数
        for(int i=0,j=0;i<size;i++)
        {
            if(i!=index)
            {
                temp[j]=value[i];
                j++;
            }
        }
        value=temp;
        size--;
        return true;
    }


    //数据长度
    public int length()
    {
        return size;
    }

    //扩容
    private void grow(int minCapacity){
        System.out.println("数组进行扩容");
        // overflow-conscious code
        int oldCapacity = value.length;
        int newCapacity = oldCapacity + (oldCapacity >> 1); // 1.5倍扩容
        if (newCapacity - minCapacity < 0)
            newCapacity = minCapacity;
        if (newCapacity - MAX_ARRAY_SIZE > 0)
            newCapacity = hugeCapacity(minCapacity);
        value = Arrays.copyOf(value, newCapacity);
    }

    private static int hugeCapacity(int minCapacity) {
        if (minCapacity < 0) // overflow
            throw new OutOfMemoryError();
        return (minCapacity > MAX_ARRAY_SIZE) ?Integer.MAX_VALUE : MAX_ARRAY_SIZE;
    }
}