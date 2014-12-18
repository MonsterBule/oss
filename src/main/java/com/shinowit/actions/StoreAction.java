package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeStockInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/25.
 */
public class StoreAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeStockInfo> tsdao;
    private List<TMeStockInfo> tslist;
    private String chandiseId;
    private String name;
    private int page;
    private int limit;
    private int rowcount;

    public String list() {
        tslist = tsdao.findByHql1("from TMeStockInfo where chandise.merchandiseId=?", chandiseId);
        return SUCCESS;
    }

    public String listall() {

        tslist = tsdao.queryForPage("from TMeStockInfo", page, limit);
        rowcount = tsdao.queryRecordCount("select count(*) from TMeStockInfo");
        return SUCCESS;
    }

    public List<TMeStockInfo> getTslist() {
        return tslist;
    }

    public void setTslist(List<TMeStockInfo> tslist) {
        this.tslist = tslist;
    }

    public String getChandiseId() {
        return chandiseId;
    }

    public void setChandiseId(String chandiseId) {
        this.chandiseId = chandiseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
}
