//package 练习区.jdk;
//
//import com.google.gson.Gson;
//
//import java.util.Scanner;
//
///**
// * 编写一个程序，求解约瑟夫（Joseph）问题。有n个小孩围城一圈，将他们从1开始依次编号，从编号为1的小孩开始报数，数到第m个小孩出列，
// * 然后从出列的下一个小孩重新开始报数，数到第m个小孩有出列，如此反复，直到所有的小孩全部出列为止，求整个出列序列。
// * 例如n=6，m=5是出列序列是5,4,6,2,3,1.
// */
//public class Joseph {
//
//    public static void main(String[] args) {
//        System.out.println("小孩个数n：");
//        Scanner sc = new Scanner(System.in);
//        Integer total = sc.nextInt();
//        System.out.println("出圈数m：");
//        Integer m = sc.nextInt();
//        Integer[] children = getAllList(total, m);
//        System.out.println(new Gson().toJson(children));
//    }
//
//    private static Integer[] getAllList(Integer total, Integer m) {
//        ArrayList<Integer> children = new ArrayList<>(total);
//        for(int i = 0;i <= total-1;i++)
//            children[i] = 1;
//        while(leftnumber > 1)
//        {
//            if(array[index] == 1)
//            {
//                countnumber++;
//                if(countnumber == k)
//                {
//                    countnumber = 0;
//                    array[index] = 0;
//                    leftnumber--;
//                }
//            }
//            index++;
//            if(index == n)
//                index = 0;
//        }
//        for(int j = 0;j <= n-1;j++)
//        {
//            if(array[j] == 1)
//                System.out.print(j+1+" ");
//        }
//
//        return children;
//    }
////    public class children{
////        children firstChirdren;
////        Integer id ;
////        children nextChirdren;
////    }
//
//}
