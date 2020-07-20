package com.future.survey.dao;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class QuestionDao {

    int formId;
    int qstnId;
    String type;
    String content;
    List<OptionDao> options;

    @Override
    public String toString() {
        return "QuestionDao{" +
                "formId=" + formId +
                ", qstnId='" + qstnId + '\'' +
                ", type='" + type + '\'' +
                ", content='" + content + '\'' +
                ", options=" + options +
                '}';
    }

    public int getFormId() {
        return formId;
    }

    public void setFormId(int formId) {
        this.formId = formId;
    }

    public int getQstnId() {
        return qstnId;
    }

    public void setQstnId(int qstnId) {
        this.qstnId = qstnId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<OptionDao> getOptions() {
        return options;
    }

    public void setOptions(List<OptionDao> options) {
        this.options = options;
    }
}
