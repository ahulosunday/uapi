CREATE  VIEW `svsh_prod`.`additionitem` AS select distinct `svshprod`.`additional_items`.`drug_id` AS `drug_id`,`svshprod`.`additional_items`.`ai_id` AS `ai_id` from `svshprod`.`additional_items` where (`svshprod`.`additional_items`.`drug_id` is not null);

CREATE  VIEW `svsh_prod`.`prescribeddrug` AS select distinct `svshprod`.`prescribeddrugs`.`drug_id` AS `drug_id`,`svshprod`.`prescribeddrugs`.`pd_id` AS `pd_id` from `svshprod`.`prescribeddrugs` where (`svshprod`.`prescribeddrugs`.`drug_id` is not null);

CREATE  VIEW `svsh_prod`.`drug` AS select `a`.`drug_id` AS `new_id`,`svsh_prod`.`b`.`drug_id` AS `old_id` from (`svsh_prod`.`additional_item_prescriptions` `a` join `svsh_prod`.`additionitem` `b` on((`a`.`old_id` = `svsh_prod`.`b`.`ai_id`))) union all select `a`.`drug_id` AS `new_id`,`svsh_prod`.`b`.`drug_id` AS `old_id` from (`svsh_prod`.`prescribed_drugs` `a` join `svsh_prod`.`prescribeddrug` `b` on((`a`.`old_id` = `svsh_prod`.`b`.`pd_id`)));

CREATE  VIEW `svsh_prod`.`prescribedimaging` AS select distinct `svshprod`.`prescribedimagings`.`investigation_id` AS `investigation_id`,`svshprod`.`prescribedimagings`.`pi_id` AS `pi_id` from `svshprod`.`prescribedimagings` where (`svshprod`.`prescribedimagings`.`investigation_id` is not null);

CREATE  VIEW `svsh_prod`.`investigation` AS select `a`.`investigation_id` AS `new_id`,`svsh_prod`.`b`.`investigation_id` AS `old_id` from (`svsh_prod`.`prescribed_investigations` `a` join `svsh_prod`.`prescribedimaging` `b` on((`a`.`old_id` = `svsh_prod`.`b`.`pi_id`)));

CREATE  VIEW `svsh_prod`.`prescribedservice` AS select distinct `svshprod`.`prescribedservices`.`service_id` AS `service_id`,`svshprod`.`prescribedservices`.`ps_id` AS `ps_id` from `svshprod`.`prescribedservices` where (`svshprod`.`prescribedservices`.`service_id` is not null);

CREATE  VIEW `svsh_prod`.`service` AS select `a`.`service_id` AS `new_id`,`svsh_prod`.`b`.`service_id` AS `old_id` from (`svsh_prod`.`prescribed_services` `a` join `svsh_prod`.`prescribedservice` `b` on((`a`.`old_id` = `svsh_prod`.`b`.`ps_id`)));

CREATE  VIEW `svsh_prod`.`prescribedtest` AS select distinct `svshprod`.`prescribedtests`.`test_id` AS `test_id`,`svshprod`.`prescribedtests`.`pt_id` AS `pt_id` from `svshprod`.`prescribedtests` where (`svshprod`.`prescribedtests`.`test_id` is not null);

CREATE  VIEW `svsh_prod`.`test` AS select `a`.`test_id` AS `new_id`,`svsh_prod`.`b`.`test_id` AS `old_id` from (`svsh_prod`.`prescribed_tests` `a` join `svsh_prod`.`prescribedtest` `b` on((`a`.`old_id` = `svsh_prod`.`b`.`pt_id`)));



