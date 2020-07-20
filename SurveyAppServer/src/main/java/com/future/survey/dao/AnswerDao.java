package com.future.survey.dao;

import org.springframework.stereotype.Repository;

@Repository
public class AnswerDao {

    int respId;

    int formId;

    int qstnId;

    String content;

    @Override
    public String toString() {
        return "AnswerDao{" +
                "respId=" + respId +
                ", formId=" + formId +
                ", qstnId=" + qstnId +
                ", content='" + content + '\'' +
                '}';
    }

    public int getRespId() {
        return respId;
    }

    public void setRespId(int respId) {
        this.respId = respId;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
