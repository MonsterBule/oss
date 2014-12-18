package com.shinowit.Md5;

import java.security.MessageDigest;

/**
 * Created by Administrator on 2014-11-11.
 */
public class MD5 {
//    public static String bytetoString(byte[] digest) {
//
//        String str = "";
//        String tempStr = "";
//        for (int i = 1; i < digest.length; i++) {
//            tempStr = (Integer.toHexString(digest[i] & 0xff));
//            if (tempStr.length() == 1) {
//                str = str + "0" + tempStr;
//            }
//            else {
//                str = str + tempStr;
//            }
//        }
//        return str.toLowerCase();
//
//    }
//
//    public static String MD5(String inStr) {
//
//        MessageDigest md = null;
//        String outStr = null;
//        try {
//
//            md = MessageDigest.getInstance("MD5");         //可以选中其他的算法如SHA
//            byte[] digest = md.digest(inStr.getBytes());
//            //返回的是byet[]，要转化为String存储比较方便
//            outStr =bytetoString(digest);
//        }
//        catch (NoSuchAlgorithmException nsae) {
//            nsae.printStackTrace();
//        }
//        return outStr;
//    }


    public static String string2MD5(String inStr) {
        MessageDigest md5 = null;
        try {
            md5 = MessageDigest.getInstance("MD5");
        } catch (Exception e) {
            System.out.println(e.toString());
            e.printStackTrace();
            return "";
        }
        char[] charArray = inStr.toCharArray();
        byte[] byteArray = new byte[charArray.length];

        for (int i = 0; i < charArray.length; i++)
            byteArray[i] = (byte) charArray[i];
        byte[] md5Bytes = md5.digest(byteArray);
        StringBuffer hexValue = new StringBuffer();
        for (int i = 0; i < md5Bytes.length; i++) {
            int val = ((int) md5Bytes[i]) & 0xff;
            if (val < 16)
                hexValue.append("0");
            hexValue.append(Integer.toHexString(val));
        }
        return hexValue.toString();

    }
}
