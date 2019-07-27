-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2019 年 07 月 27 日 02:41
-- 伺服器版本: 10.1.37-MariaDB
-- PHP 版本： 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `47`
--

-- --------------------------------------------------------

--
-- 資料表結構 `meal`
--

CREATE TABLE `meal` (
  `id` int(11) NOT NULL,
  `mealid` text COLLATE utf8_unicode_ci NOT NULL,
  `date` text COLLATE utf8_unicode_ci NOT NULL,
  `time` text COLLATE utf8_unicode_ci NOT NULL,
  `mealname` text COLLATE utf8_unicode_ci NOT NULL,
  `mealnum` text COLLATE utf8_unicode_ci NOT NULL,
  `desk` text COLLATE utf8_unicode_ci NOT NULL,
  `tablenum` text COLLATE utf8_unicode_ci NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `phone` text COLLATE utf8_unicode_ci NOT NULL,
  `email` text COLLATE utf8_unicode_ci NOT NULL,
  `mean` text COLLATE utf8_unicode_ci NOT NULL,
  `allmoney` int(11) NOT NULL,
  `deposit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的匯出資料 `meal`
--

INSERT INTO `meal` (`id`, `mealid`, `date`, `time`, `mealname`, `mealnum`, `desk`, `tablenum`, `name`, `phone`, `email`, `mean`, `allmoney`, `deposit`) VALUES
(1, '201907220001', '1563724800000', '中午', 'food03', '22客', '5桌', '1,7,4,9,5', '林小明', '0966852454', 'qwertioo@gmail.com', '訂餐中', 11000, 1100),
(2, '201907230001', '1563811200000', '下午', 'doof04', '19客', '7桌', '1,2,3,4,5,6,7', '陳曉明', '0985626355', 'zxcvbm@gmail.com', '訂餐中', 9500, 950),
(3, '201907260001', '1564070400000', '晚上', 'food08', '20客', '3桌', '1,2,3', '測試人員', '0955623852', 'uiopjklm@gmail.com', '訂餐中', 10000, 1000),
(4, '201907250001', '1563984000000', '下午', 'food87', '53客', '3桌', '2,8,4', '黃曉明', '0955322285', 'wjgiohae@gmail.com', '測試中', 26500, 2650),
(6, '201907250003', '1563984000000', '下午', 'food78', '1客', '4桌', '2,4,6,7', 'dasd', 'as', 'dasd', 'asdasd', 500, 50),
(7, '201907160001', '1563206400000', '下午', 'food67', '14客', '4桌', '3,8,2,7', '測試人員', '0955385858', 'giwnqior@gmail.com', '最終測試', 7000, 700);

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `meal`
--
ALTER TABLE `meal`
  ADD PRIMARY KEY (`id`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `meal`
--
ALTER TABLE `meal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
