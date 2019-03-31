package com.java.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.java.utils.JsonDateDeserializer;

import java.util.Date;

public class Register{
    private int id;
    private String user_id;
    private Date register_time;
    private Date signback_time;
    private String diff_time;
    private long diff_time_min;

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getRegister_time() {
        return register_time;
    }

    @JsonDeserialize(using = JsonDateDeserializer.class)
    public void setRegister_time(Date register_time) {
        this.register_time = register_time;
    }

    public Date getSignback_time() {
        return signback_time;
    }

    @JsonDeserialize(using = JsonDateDeserializer.class)
    public void setSignback_time(Date signback_time) {
        this.signback_time = signback_time;
    }

    public String getDiff_time() {
        return diff_time;
    }

    public void setDiff_time(String diff_time) {
        this.diff_time = diff_time;
    }

    public long getDiff_time_min() {
        return diff_time_min;
    }

    public void setDiff_time_min(long diff_time_min) {
        this.diff_time_min = diff_time_min;
    }

}
