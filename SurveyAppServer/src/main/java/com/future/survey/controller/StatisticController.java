package com.future.survey.controller;

import com.future.survey.service.impl.StatisticServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/statistics")
public class StatisticController {

    @Autowired
    StatisticServiceImpl statisticService;

    @ResponseBody
    @GetMapping( value = {"/mc/{formId}/{qstnId}", "/cb/{formId}/{qstnId}"} )
    List<Integer> getStatisticOfOptions(@PathVariable int formId, @PathVariable int qstnId){
        return statisticService.countAnswersOfOptions(formId, qstnId);
    }

    @ResponseBody
    @GetMapping( value = {"/intNum/{formId}/{qstnId}", "/realNum/{formId}/{qstnId}"} )
    Map<String, Double> getStatisticOfNumber(@PathVariable int formId, @PathVariable int qstnId){
        return statisticService.countAnswersOfNumber(formId, qstnId);
    }

    @ResponseBody
    @GetMapping("/scale/{formId}/{qstnId}")
    List<Integer> getStatisticOfScale(@PathVariable int formId, @PathVariable int qstnId){
        return statisticService.countAnswersOfScale(formId, qstnId);
    }

    @ResponseBody
    @GetMapping("/text/{formId}/{qstnId}")
    List<String> getStatisticOfText(@PathVariable int formId, @PathVariable int qstnId) {
        return statisticService.findAnswersOfText(formId, qstnId);
    }


}
