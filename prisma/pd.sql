-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 04, 2018 at 10:43 AM
-- Server version: 5.6.38
-- PHP Version: 7.2.1
--
-- Database: `pd_db`
--

-- --------------------------------------------------------


--
-- Dumping data for table `Medicine`
--

INSERT INTO `Medicine` (`medicineID`, `name`) VALUES
(1, 'Medicine 1'),
(2, 'Medicine 2');

-- --------------------------------------------------------

--
-- Table structure for table `Note`
--


--
-- Dumping data for table `Note`
--

INSERT INTO `Note` (`noteID`, `test_Session_IDtest_session`, `note`, `user_IDmed`) VALUES
(1, 1, 'Well this is interesting.', 2),
(2, 1, 'This seams a bit weird.', 1);

-- --------------------------------------------------------


--
-- Dumping data for table ``
--

INSERT INTO `Organization` (`organizationID`, `name`) VALUES
(1, 'Hospital'),
(2, 'LNU University');

-- --------------------------------------------------------



INSERT INTO `Role` (`roleID`, `name`, `type`) VALUES
(1, 'patient', '1'),
(2, 'physician', '2'),
(3, 'researcher', '3'),
(4, 'junior researcher', '3');

-- --------------------------------------------------------


INSERT INTO `Test` (`testID`, `dateTime`, `therapy_IDtherapy`) VALUES
(1, '2009-12-01 18:00:00', 1),
(2, '2009-12-02 18:00:00', 1),
(3, '2009-12-02 18:00:00', 2);

-- --------------------------------------------------------


INSERT INTO `Test_Session` (`test_SessionID`, `test_type`, `test_IDtest`, `dataURL`) VALUES
(1, 1, 1, 'data1'),
(2, 2, 1, 'data2'),
(3, 1, 2, 'data3'),
(4, 2, 2, 'data4'),
(5, 1, 3, 'data5'),
(6, 2, 3, 'data6');

-- --------------------------------------------------------

--
-- Table structure for table `Therapy`
--

--
-- Dumping data for table `Therapy`
--

INSERT INTO `Therapy` (`therapyID`, `user_IDpatient`, `user_IDmed`, `therapyList_IDtherapylist`) VALUES
(1, 3, 1, 1),
(2, 4, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Therapy_List`
--


--
-- Dumping data for table `Therapy_List`
--

INSERT INTO `Therapy_List` (`therapy_listID`, `name`, `medicine_IDmedicine`, `dosage`) VALUES
(1, 'Therapy trials with Medicine 1', 1, '400 ml');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`userID`, `username`, `email`, `role_IDrole`, `organization_IDOrganization`, `lat`, `lng`) VALUES
(1, 'doc', 'doc@hospital.com', 2, 1, NULL, NULL),
(2, 'researcher', 'res@uni.se', 3, 2, NULL, NULL),
(3, 'patient1', 'x@gmail.com', 1, 1, 59.6567, 16.6709),
(4, 'patient2', 'y@happyemail.com', 1, 1, 57.3365, 12.5164);
