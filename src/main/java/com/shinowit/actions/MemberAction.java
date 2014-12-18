package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaMemberInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by Administrator on 2014-11-10.
 */
public class MemberAction extends ActionSupport {
    @Resource
    private BaseDAO<TBaMemberInfo> tmdao;
    private List<TBaMemberInfo> tmlist;
    private int page;
    private int limit;
    private int rowcount;
    private String name;


    public String list() {

        if ((null != name) && (name.trim().length() > 0)) {
            try {
                byte[] bb = name.getBytes("ISO-8859-1");
                name = new String(bb, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            tmlist = tmdao.queryForPage("from TBaMemberInfo u where u.userName like \'%" + name + "%\'", page, limit);
            rowcount = tmdao.queryRecordCount("select count(*) from TBaMemberInfo u where u.userName like '%" + name + "%\'", page, limit);
            return SUCCESS;
        } else {
            tmlist = tmdao.queryForPage("from TBaMemberInfo", page, limit);
            rowcount = tmdao.queryRecordCount("select count(*) from TBaMemberInfo");
            return SUCCESS;

        }

    }

    public List<TBaMemberInfo> getTmlist() {
        return tmlist;
    }

    public void setTmlist(List<TBaMemberInfo> tmlist) {
        this.tmlist = tmlist;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getRowcount() {
        return rowcount;
    }

    public void setRowcount(int rowcount) {
        this.rowcount = rowcount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
