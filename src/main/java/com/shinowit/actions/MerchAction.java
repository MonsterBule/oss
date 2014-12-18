package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014-11-06.
 */
public class MerchAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseInfo> good_dao;


    private List<TMeMerchandiseInfo> good_list;
    private int page;
    private int limit;
    private int rowcount;
    private String name;

    public String listAll() {
        String sqllist = "from TMeMerchandiseInfo where 1=1";
        String sqlcount = "select count(*) from TMeMerchandiseInfo where 1=1";
        List<Object> prams = new ArrayList<Object>();
        if ((null != name) && (name.trim().length() > 0)) {
            try {
                byte[] bb = name.getBytes("ISO-8859-1");
                name = new String(bb, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sqllist += "and merchandiseName like ?";
            sqlcount += "and merchandiseName like ?";
            prams.add(name);
        }
        rowcount = good_dao.queryRecordCount(sqlcount, prams.toArray());
        if (limit != 0) {
            if ((rowcount % limit == 0) && (rowcount / limit < page)) {
                page = page - 1;

            }
        }
        good_list = good_dao.queryForPage(sqllist, page, limit, prams.toArray());
        return SUCCESS;
    }


    public List<TMeMerchandiseInfo> getGood_list() {
        return good_list;
    }

    public void setGood_list(List<TMeMerchandiseInfo> good_list) {
        this.good_list = good_list;
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
