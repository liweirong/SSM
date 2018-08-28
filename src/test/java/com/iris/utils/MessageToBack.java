package com.iris.utils;



import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.net.UnknownHostException;


/**
 * @author carl
 * @version 1.0
 * @since 2013-04-20
 */
public class MessageToBack {
    private static OutputStream outStream;
    private static InputStream inputStream;
    private static DataOutputStream dataOutputStream;
    private static Socket socket;
    private static String NO_SOCKET_CONNECTION = "no_socket_connection";
    public static final String FAIL = "fail";

    public static void main(String args[]) {
        Short UPDATE_DB_CONFIG_TYPE = 0x0001;
        Short UPDATE_OBJ_NAME = 0;
        Short MYSQL_UPDATE_STATE = 2;
        Short l2 = 1;
        System.out.println(sendMesToBack(UPDATE_DB_CONFIG_TYPE, UPDATE_OBJ_NAME, MYSQL_UPDATE_STATE, l2, "1"));
    }

    /**
     *
     */
    private static int delaySecond;

    public static void dealLock(String singl) {
        try {
            String resultFlag = MessageToBack.sendMesToBack(singl);
            if (NO_SOCKET_CONNECTION.equals(resultFlag) || FAIL.equals(resultFlag)) {
                System.out.println("自动清理覆盖，与后台通讯异常，请手动重启后台");
                return;
            }
        } catch (IOException e1) {
            System.out.println("自动清理覆盖，与后台通讯异常，请手动重启后台");
            return;
        }
    }

    /**
     * @return
     */
    public static Socket getSocket() {


        try {
            socket = new Socket("127.0.0.1", 8188);
        } catch (NumberFormatException e) {
            e.printStackTrace();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return socket;
    }

    public static Socket getSocket(String ip, int port) {
        delaySecond = 10000;
        try {
            socket = new Socket("127.0.0.1", 8188);
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

    /**
     * @param signalType
     * @return
     * @throws IOException
     */
    public static String sendMesToBack(String signalType) throws IOException {
        return sendSignalType(signalType);
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
    public static String getSendMessage(Short messageType, Short confContentType, Short confType, Short confNum, String uuid) {
        StringBuilder sendMessage = new StringBuilder();
        sendMessage.append("|").append(messageType).append("|");
        sendMessage.append(confContentType.toString()).append("|");
        sendMessage.append(confType.toString()).append("|");
        sendMessage.append(confNum.toString()).append("|");
        if (uuid != null && uuid != "") {
            sendMessage.append(uuid);
        }
        Integer length = sendMessage.toString().length();
        length = String.valueOf(length).length() + length;
        return length + sendMessage.toString();
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
        String signalType = getSendMessage(messageType, confContentType, confType, confNum, uuid);
        String returnString = null;
        try {
            //发送消息得到返回结果
            returnString = sendSignalType(signalType);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return returnString;
    }

    private static String sendSignalType(String signalType) throws IOException {
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
            System.out.println(signalType);

            tempDOS.write(intToByteArray(signalType.length()));
            tempDOS.write(signalType.getBytes());
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

    public static String sendMesToBack(String signalType, String ip, int port) throws IOException {
        long sendTime = System.currentTimeMillis();
        long receiveTime;

        boolean received = false;
        boolean delayTooLong = false;
        StringBuffer recvString = new StringBuffer();
        int recLen;
        String tempStr;
        Socket tempSocket = getSocket(ip, port);
        DataOutputStream tempDOS;

        if (tempSocket != null) {
            tempDOS = getDataOutputStream(tempSocket);
        } else {
            return NO_SOCKET_CONNECTION;
        }

        byte[] recTextBytes = new byte[1024];
        try {
            tempDOS.write(signalType.getBytes());
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
                if ((recLen = inputStream.read(recTextBytes)) != -1) {
                    tempStr = new String(recTextBytes, 0, recLen);
                    recvString.append(tempStr);
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


}

