package com.iris.utils;

import java.io.*;
import java.net.Socket;
import java.net.UnknownHostException;


/**
 * @author carl
 * @version 1.0
 * @since 2013-04-20
 */
public class MessageToBack1 {

    public static void main(String[] args) {
        //更新数据库设置
        Short UPDATE_DB_CONFIG_TYPE = 0x0001;
        Short UPDATE_OBJ_NAME = 0;
        Short MYSQL_UPDATE_STATE = 2;
        Short num = 1;
        String uuid = "uuid";
        System.out.println(sendMesToBack(UPDATE_DB_CONFIG_TYPE, UPDATE_OBJ_NAME, MYSQL_UPDATE_STATE, num, uuid));
    }

    private static OutputStream outStream;
    private static InputStream inputStream;
    private static DataOutputStream dataOutputStream;
    private static Socket socket;
    private static String NO_SOCKET_CONNECTION = "no_socket_connection";
    public static final String FAIL = "fail";


    /**
     *
     */
    private static int delaySecond;

    /**
     * @return
     */
    public static Socket getSocket() {
        String ipAddress = "127.0.0.1";
        String port = "8188";
        delaySecond = 10000;

        try {
            socket = new Socket(ipAddress, Integer.valueOf(port));
        } catch (NumberFormatException e) {
            e.printStackTrace();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return socket;
    }


    /**
     *
     */
    public static boolean closeSocket(Socket sockets) {
        if (dataOutputStream != null) try {
            dataOutputStream.close();
            dataOutputStream = null;
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (outStream != null) {
            try {
                outStream.close();
                outStream = null;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        if (sockets != null) {
            try {
                sockets.close();
                socket = null;
                return true;
            } catch (IOException e) {
                e.printStackTrace();
                return false;
            }
        } else {
            return true;
        }
    }


    /**
     * 消息转换
     *
     * @param messageType     消息的类型
     * @param confContentType 配置内容类型
     * @param confType        操作类型（增加、删除、修改）
     * @param confNum         操作的数量（0）
     * @param uuid            通过逗号分隔开
     * @return 消息
     */
    public static byte[] getSendMessageLength(Short messageType, Short confContentType, Short confType, Short confNum, String uuid) {

Msg msg = new Msg();
        msg.setConfContentType(confContentType);
        msg.setMessageType(messageType);
        msg.setConfType(confType);
        msg.setConfNum(confNum);
        msg.setUuid(uuid);

        Integer messageTypeLen = 0;
        Integer confContentTypeLen = 0;
        Integer confTypeLen = 0;
        Integer confNumLen = 0;
        Integer uuidLen = 0;
        StringBuilder sendMessage = new StringBuilder();
        if (messageType != null) {
            messageTypeLen = messageType.BYTES;
            sendMessage.append(messageType.toString());
        }
        if (confContentType != null) {
            confContentTypeLen = confContentType.BYTES;
            sendMessage.append(confContentType.toString());
        }
        if (confType != null) {
            confTypeLen = confType.BYTES;
            sendMessage.append(confType.toString());
        }
        if (confNum != null) {
            confNumLen = confNum.BYTES;
            sendMessage.append(confNum.toString());
        }
        if (uuid != null) {
            uuidLen = uuid.length() + 1;
            sendMessage.append(uuid);
        }
        Integer length = 0;
        length = length.BYTES + messageTypeLen + confContentTypeLen + confTypeLen + confNumLen + uuidLen;
        msg.setLength(length);
        return msg.toString().getBytes();
    }


    /**
     * 给后台发送消息
     *
     * @param messageType     消息的类型
     * @param confContentType 配置内容类型
     * @param confType        操作类型（增加、删除、修改）
     * @param confNum         操作的数量（0）
     * @param uuid            通过逗号分隔开
     * @return 结果
     * @throws IOException
     */
    public static String sendMesToBack(Short messageType, Short confContentType, Short confType, Short confNum, String uuid) {
        //得到应该发送的消息内容
        byte[] msg = getSendMessageLength(messageType, confContentType, confType, confNum, uuid);
        String returnString = null;
        try {
            //发送消息得到返回结果
            returnString = sendSignalType(msg);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return returnString;
    }
    public static DataOutputStream getDataOutputStream(Socket tempSocket) {
        try {
            outStream = tempSocket.getOutputStream();
            if (dataOutputStream != null) {
                return dataOutputStream;
            } else {
                dataOutputStream = new DataOutputStream(outStream);
                return dataOutputStream;
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    private static String sendSignalType(byte[] msg) throws IOException {

        for (Byte byte1: msg) {
            System.out.println(byte1);

        }

        System.out.println( String.valueOf(msg));
        long sendTime = System.currentTimeMillis();
        long receiveTime;
        boolean received = false;
        boolean delayTooLong = false;
        StringBuffer recvString = new StringBuffer();
        String tempStr;
        Socket tempSocket = getSocket();
        DataOutputStream tempDOS;

        if (tempSocket != null) {
            tempDOS = getDataOutputStream(tempSocket);
        } else {
            return NO_SOCKET_CONNECTION;
        }

        byte[] recTextBytes = new byte[1024];
        try {
//            for (Byte byte1: msg) {
                tempDOS.write(msg);
//            }
            tempDOS.flush();
        } catch (IOException e) {
            e.printStackTrace();
            closeSocket(tempSocket);
            return FAIL;
        }

        while (!received && !delayTooLong) {
            if (tempSocket.isClosed()) {
                return "";
            }
            inputStream = tempSocket.getInputStream();
            if (inputStream.available() > 0) {
                if (inputStream.read(recTextBytes) != -1) {
                    tempStr = new String(recTextBytes);
                    recvString.append(tempStr.trim());
                }
            }
            receiveTime = System.currentTimeMillis();
            if (recvString.toString().length() != 0) {
                received = true;
            }
            if (((receiveTime - sendTime) > delaySecond)) {
                delayTooLong = true;
            }
        }
        closeSocket(tempSocket);
        return recvString.toString();
    }

    public static byte[] intToByteArray(int value) {
        byte[] b = new byte[4];
        byte[] a = new byte[4];
        for (int i = 0; i < 4; i++) {
            int offset = (b.length - 1 - i) * 8;
            b[i] = (byte) ((value >>> offset) & 0xFF);
        }
        int k = 3;
        for (int j = 0; j < 4; j++) {
            a[j] = b[k];
            k--;
        }
        return a;
    }

    private static class Msg implements  Serializable{

        private Integer length;
        private Short messageType;
        private Short confContentType;
        private Short confType;
        private Short confNum;
        private String uuid;


        public Integer getLength() {
            return length;
        }

        public void setLength(Integer length) {
            this.length = length;
        }

        public Short getMessageType() {
            return messageType;
        }

        public void setMessageType(Short messageType) {
            this.messageType = messageType;
        }

        public Short getConfContentType() {
            return confContentType;
        }

        public void setConfContentType(Short confContentType) {
            this.confContentType = confContentType;
        }

        public Short getConfType() {
            return confType;
        }

        public void setConfType(Short confType) {
            this.confType = confType;
        }

        public Short getConfNum() {
            return confNum;
        }

        public void setConfNum(Short confNum) {
            this.confNum = confNum;
        }

        public String getUuid() {
            return uuid;
        }

        public void setUuid(String uuid) {
            this.uuid = uuid;
        }

    }
}

