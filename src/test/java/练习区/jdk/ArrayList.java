package 练习区.jdk;

 public class ArrayList<K> {
     private int size= 10;
     private K  key[] ;
     transient Object[] elementData; // non-private to simplify nested class access
     private static final Object[] EMPTY_ELEMENTDATA = {};

     public ArrayList(int initialCapacity) {
         if (initialCapacity > 0) {
             this.elementData = new Object[initialCapacity];
         } else if (initialCapacity == 0) {
             this.elementData = EMPTY_ELEMENTDATA;
         } else {
             throw new IllegalArgumentException("Illegal Capacity: "+
                     initialCapacity);
         }
     }


 }