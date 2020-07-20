drop schema future_survey;
create schema future_survey;
use future_survey;

create table accounts
(	user_id int auto_increment,
	mail varchar(30),
    password varchar(30),
	username varchar(35),
    user_type varchar(1),
	primary key (user_id));

create table forms
(	form_id int auto_increment,
	user_id int,
    permission varchar(1),
	description varchar(200),
	title varchar(80),
    date varchar(20),
    primary key(form_id));
    
create table questions
(	form_id int,
	qstn_id int,
    type varchar(8),
    content varchar(300),
    primary key(qstn_id, form_id),
    foreign key (form_id) references forms(form_id));
    
create table `options`
(	
	form_id int,
    qstn_id int,
    opt_id int,
    content varchar(300),
    cascade_qstn_id int,
    primary key (opt_id, qstn_id, form_id),
    foreign key (form_id) references forms(form_id));
    
create table responses
(	resp_id int auto_increment,
    form_id int,
    submit_time varchar(40),
    mail varchar(30),
    primary key (resp_id, form_id),
    foreign key (form_id) references forms(form_id));
    
create table answers
(	resp_id int,
    form_id int,
    qstn_id int,
    content varchar(200),
    primary key (resp_id, form_id, qstn_id),
    foreign key (form_id) references forms(form_id),
    foreign key (resp_id) references responses(resp_id));

insert into accounts values(null, "root@root.com", 123456, "root", 0);
insert into forms values(null, 1, 0, null, "COVID-19 Survey", "2020-06-11");
insert into forms values(null, 1, 0, null, "demo survey", "2020-06-12");
insert into questions values(1, 1, "text", "What's your name?");
insert into questions values(1, 2, "cb", "Do you have these sympotoms?");
insert into questions values(1, 3, "mc", "Are you at school?");
insert into questions values(1, 4, "text", "Any extra information to provide?");
insert into questions values(1, 5, "intNum", "How old are you?");
insert into questions values(1, 6, "realNum", "Your body temperature today: ");
insert into questions values(1, 7, "scale", "Please rate this questionnaire: ");
insert into `options` values(1, 2, 1, "cough", null);
insert into `options` values(1, 2, 2, "fever", null);
insert into `options` values(1, 2, 3, "none of these", null);
insert into `options` values(1, 3, 1, "No", 5);
insert into `options` values(1, 3, 2, "Yes", 6);
INSERT INTO `responses` VALUES (1,1,'2020-06-18','root@root.com');
INSERT INTO `responses` VALUES (2,1,'2020-06-18','root@root.com');
INSERT INTO `responses` VALUES (3,1,'2020-06-18','root@root.com');
INSERT INTO `responses` VALUES (4,1,'2020-06-18','root@root.com');
INSERT INTO `responses` VALUES (5,1,'2020-06-19','root@root.com');
INSERT INTO `answers` VALUES (1,1,1,'jianglai'),(1,1,2,'&none of these'),(1,1,3,'Yes'),(1,1,4,'boring'),(1,1,6,'36.6'), (1,1,7,'5');
INSERT INTO `answers` VALUES (2,1,1,'yujiang'),(2,1,2,'&none of these'),(2,1,3,'No'),(2,1,4,'I\'m in Shanxi!!!'),(2,1,5,'38'),(2,1,7,'4');
INSERT INTO `answers` VALUES (3,1,1,'jiaqi'),(3,1,2,'&none of these'),(3,1,3,'Yes'),(3,1,4,'tired now'),(3,1,6,'36.8'),(3,1,7,'4');
INSERT INTO `answers` VALUES (4,1,1,'pingping'),(4,1,2,'&cough&fever'),(4,1,3,'No'),(4,1,4,'I\'m the king!'),(4,1,5,'67'),(4,1,7,'2');
INSERT INTO `answers` VALUES (5,1,1,'dingtao'),(5,1,2,'&none of these'),(5,1,3,'No'),(5,1,4,'I\'m Henanese !!!'),(5,1,5,'22'),(5,1,7,'0');

