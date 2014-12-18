package com.shinowit.test;

/**
 * Created by Administrator on 2014/12/4.
 */
public class Dghs {

    static int dg(int a) {
        if (a == 1 || a == 0) {
            return a;
        } else {
            return a * dg(a - 1);
        }


    }

    static int dg2(int n) {
        if (n < 5) {
            return n * dg2(n + 1);
        } else {
            return n;
        }
    }

    public static void main(String asd[]) {

        System.out.print(dg(5));
        System.out.print(dg2(1));
    }

}
