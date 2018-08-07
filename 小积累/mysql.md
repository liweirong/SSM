# 时间类型选择

| 日期时间类型|	占用空间|	日期格式|	最小值|	最大值	|零值表示|
| ---- | ---|---|----| ---   | :----|
 DATETIME	| 8 bytes	| YYYY-MM-DD HH:MM:SS| 1000-01-01 00:00:00|	9999-12-31 23:59:59 |0000-00-00 00:00:00
 TIMESTAMP	| 4 bytes	| YYYY-MM-DD HH:MM:SS|	19700101080001	|2038年的某个时刻|	00000000000000
 DATE	| 4 bytes	|YYYY-MM-DD	|1000-01-01 	|9999-12-31 	|0000-00-00
 TIME	| 3 bytes	| HH:MM:SS	| -838:59:59	|838:59:59 |00:00:00
 YEAR	| 1 bytes	| YYYY	|1901 |	215``5 |	0000|
 
 # 索引分析
 ```
 mysql> EXPLAIN SELECT `birday` FROM `user` WHERE `birthday` < "1990/2/2"; 
 -- 结果： 
 id: 1
 select_type: SIMPLE -- 查询类型（简单查询,联合查询,子查询） 
 table: user -- 显示这一行的数据是关于哪张表的  
 type: range -- 区间索引（在小于1990/2/2区间的数据),这是重要的列,显示连接使用了何种类型。从最好到最差的连接类型为system > const > eq_ref > ref > fulltext > ref_or_null > index_merge > unique_subquery > index_subquery > range > index > ALL,const代表一次就命中,ALL代表扫描了全表才确定结果。一般来说,得保证查询至少达到range级别,最好能达到ref。 
 possible_keys: birthday  -- 指出MySQL能使用哪个索引在该表中找到行。如果是空的,没有相关的索引。这时要提高性能,可通过检验WHERE子句,看是否引用某些字段,或者检查字段不是适合索引。  
 key: birthday -- 实际使用到的索引。如果为NULL,则没有使用索引。如果为primary的话,表示使用了主键。 
 key_len: 4 -- 最长的索引宽度。如果键是NULL,长度就是NULL。在不损失精确性的情况下,长度越短越好 
 ref: const -- 显示哪个字段或常数与key一起被使用。  
 rows: 1 -- 这个数表示mysql要遍历多少数据才能找到,在innodb上是不准确的。 
 Extra: Using where; Using index -- 执行状态说明,这里可以看到的坏的例子是Using temporary和Using
 ```
 什么样的sql不走索引
 ````
 SELECT `sname` FROM `stu` WHERE `age`+10=30;-- 不会使用索引,因为所有索引列参与了计算 
 SELECT `sname` FROM `stu` WHERE LEFT(`date`,4) <1990; -- 不会使用索引,因为使用了函数运算,原理与上面相同 
 SELECT * FROM `houdunwang` WHERE `uname` LIKE'后盾%' -- 走索引 
 SELECT * FROM `houdunwang` WHERE `uname` LIKE "%后盾%" -- 不走索引 
 -- 正则表达式不使用索引,这应该很好理解,所以为什么在SQL中很难看到regexp关键字的原因 
 -- 字符串与数字比较不使用索引; 
 CREATE TABLE `a` (`a` char(10)); 
 EXPLAIN SELECT * FROM `a` WHERE `a`="1" -- 走索引 
 EXPLAIN SELECT * FROM `a` WHERE `a`=1 -- 不走索引 
 select * from dept where dname='xxx' or loc='xx' or deptno=45 --如果条件中有or,即使其中有条件带索引也不会使用。换言之,就是要求使用的所有字段,都必须建立索引, 我们建议大家尽量避免使用or 关键字 
 -- 如果mysql估计使用全表扫描要比使用索引快,则不使用索引 
 ````