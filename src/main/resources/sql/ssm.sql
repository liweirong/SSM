SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` varchar(11) NOT NULL,
  `user_name` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  `age` int(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `t_user` VALUES ('1', '测试名d', 'sfasgfaf', '24');
INSERT INTO `t_user` VALUES ('3', 'admin', 'admin', '22');
INSERT INTO `t_user` VALUES ('4', '事物1', 'adminadmin', '22');

-- 操作日志表
DROP TABLE IF EXISTS t_log;
CREATE TABLE t_log (
   id bigint(20) NOT NULL AUTO_INCREMENT,
   user_id varchar(30) DEFAULT NULL COMMENT '操作用户ID',
   user_name varchar(255) DEFAULT NULL COMMENT '操作人名称',
   oper_time datetime DEFAULT NULL COMMENT '操作时间(yyyy-MM-dd HH:mm:ss)',
   client_ip	 varchar(20) DEFAULT NULL COMMENT '登录IP',
   req_url varchar(100) DEFAULT NULL COMMENT '请求地址',
   method varchar(100) DEFAULT NULL COMMENT '请求方法名称',
   oper_event varchar(300) DEFAULT NULL COMMENT '操作事件（删除，新增，修改，查询，登录，退出）',
   oper_status tinyint(2) DEFAULT NULL COMMENT '操作状态（1：成功，2：失败）',
   log_desc varchar(300) DEFAULT NULL COMMENT '描述信息',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='日志表';

-- --------
-- 测试时使用
-- --------
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '测试用',
  `username` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------
-- 用户信息表
-- --------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `ID` bigint(8) unsigned NOT NULL AUTO_INCREMENT,
  `USER_NAME` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '用户名-作为唯一的区分',
  `ALIAS` varchar(300) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '昵称',
  `PASSWORD` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '密码，后续用MD5加密',
  `STATUS` varchar(20) CHARACTER SET utf8mb4DEFAULT NULL COMMENT '判断用户是否可用 0可用，1不可用',
  `ROLE_KEY` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '角色控制',
  `USR_DESC` varchar(500) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '用户描述',
  `ADDRESS` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '用户地址',
  `SEX` varchar(10) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '性别',
  `EMAIL` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '电子邮件地址',
  `MOBIL` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '手机号',
  `ONLINE_STATE` varchar(10) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '判断是否在线',
  `CREATE_DATE` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `UPDATE_DATE` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '控制密码过期时期',
  `LAST_LOG_TIME` timestamp NULL DEFAULT NULL COMMENT '最后一次登录时间',
  `LOG_COUNT` int(4) DEFAULT NULL COMMENT '登录系统次数',
  `SCORE` int(8) DEFAULT NULL COMMENT '积分系统，方便后续扩展',
  `FLAG` int(2) DEFAULT NULL COMMENT '后续考虑',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------
-- 用户信息表2 -存放登录的信息，方便对接第三方登录
-- --------
DROP TABLE IF EXISTS `user_token`;
CREATE TABLE `user_token` (
  `ID` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL COMMENT '和用户一对多',
  `IDENTITY_TYPE` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '身份类型（手机、邮箱等）',
  `CREDENTIAL` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '证书，比如微信的token',
  `VERIFIED` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '是否已验证',
  `BINDING_TIME` timestamp NULL DEFAULT NULL COMMENT '绑定时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- --------
-- 用户积分表
-- --------
DROP TABLE IF EXISTS `lev_score`;
CREATE TABLE `lev_score` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MIN_SCORE` int(40) NOT NULL COMMENT '该等级最小积分',
  `MAX_SCORE` int(40) NOT NULL COMMENT '该等级最大积分',
  `LEVEL` int(5) NOT NULL COMMENT '等级控制',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- 初始化积分规则
INSERT INTO `lev_score` (`ID`, `MIN_SCORE`, `MAX_SCORE`, `LEVEL`) VALUES ('1', '0', '80', '1');
INSERT INTO `lev_score` (`ID`, `MIN_SCORE`, `MAX_SCORE`, `LEVEL`) VALUES ('2', '101', '300', '2');
INSERT INTO `lev_score` (`ID`, `MIN_SCORE`, `MAX_SCORE`, `LEVEL`) VALUES ('3', '301', '900', '3');
INSERT INTO `lev_score` (`ID`, `MIN_SCORE`, `MAX_SCORE`, `LEVEL`) VALUES ('4', '901', '1800', '4');


-- --------
-- 用户消费细节
-- --------
DROP TABLE IF EXISTS `user_money_detail`;
CREATE TABLE `user_money_detail` (
  `ID` bigint(8) unsigned NOT NULL AUTO_INCREMENT,
  `USER_ID` bigint(8) NOT NULL COMMENT '对应的用户id',
  `GOODS_NAME` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '商品名称',
  `MONEY` double(10,0) DEFAULT NULL COMMENT '支出或收入的钱（元）',
  `TYPE` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '花费类型，后期根据此进行统计',
  `MONEY_STATUS` int(2) DEFAULT NULL COMMENT '判断是否是收入还是支出, 1支出，2 收入',
  `DES` varchar(250) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '对此条记录的备注',
  `CREATE_DATE` timestamp DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '录入系统时间',
  `MAKE_DATE` timestamp DEFAULT NULL COMMENT '实际花费或入账的时间',
  `DELETE_STATE` int(2) DEFAULT '0' COMMENT '删除数据时进行标记，0代表未删除，1代表删除',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------
-- 用户租房模块主表
-- --------
DROP TABLE IF EXISTS `rent_manage_main`;
CREATE TABLE `rent_manage_main` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `homeowner` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '房东名称',
  `rent` double(10,2) DEFAULT NULL COMMENT '房租 不含水电的费用',
  `water_electric` double(10,2) DEFAULT NULL COMMENT '水电费总和',
  `water` double(10,2) DEFAULT NULL COMMENT '水的吨数',
  `electric` double(10,2) DEFAULT NULL COMMENT '电的度数',
  `room_num` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '住宿房间信息',
  `user_id` int(20) DEFAULT NULL COMMENT '对应的用户id',
  `user_name` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '冗余的用户名',
  `describe` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '租房中的备注',
  `state` int(2) DEFAULT NULL COMMENT '租房状态 0 -不在租 1 - 在租 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------
-- 用户电影模块主表
-- --------
DROP TABLE IF EXISTS `user_movie_manager`;
CREATE TABLE `user_movie_manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(8) DEFAULT NULL,
  `order_num` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '订单号',
  `movie_name` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '电影名称',
  `movie_tye` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '冗余的电影类型',
  `movie_type_id` int(3) DEFAULT '0' COMMENT '电影类型-电影类型表的id',
  `address` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '影城地址及座位',
  `movie_ticket` double(8,2) DEFAULT NULL COMMENT '电影票的价钱',
  `movie_num` int(2) DEFAULT '1' COMMENT '电影票张数',
  `des` varchar(5000) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '电影的描描述',
  `movie_score` float(4,1) DEFAULT NULL COMMENT '电影评分（7.5）',
  `movie_image_address` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '电影票图片的位置或链接',
  `time` datetime DEFAULT NULL COMMENT '上映时间-放映时间-观看时间',
  `del_status` int(2) DEFAULT NULL COMMENT '删除状态 0 -删除 1 - 可用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------
-- 电影类型映射表 MOVIE_TYPE_ID
-- --------
DROP TABLE IF EXISTS `movie_type`;
CREATE TABLE `movie_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_type` varchar(50) CHARACTER SET utf8mb4 DEFAULT '' COMMENT '电影类型，可扩展',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `movie_type` (`id`, `movie_type`) VALUES ('1', '科幻');
INSERT INTO `movie_type` (`id`, `movie_type`) VALUES ('2', '剧情');
INSERT INTO `movie_type` (`id`, `movie_type`) VALUES ('3', '战争');




