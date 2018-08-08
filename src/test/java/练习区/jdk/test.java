package 练习区.jdk;

public class test {
    public static void main(String args[]){
        ArrayList<String> list = new ArrayList<>(10);

        for (int i = 0 ;i<20 ;i++) {
            list.add(i+"");
            System.out.println(list.length()+list.get(i));
        }
    }

}
