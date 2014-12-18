package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeOutStockDetailsInfo;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2014/11/24.
 */
public class OutStockDetailAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeOutStockDetailsInfo> tosdao;
    @Resource
    private JdbcTemplate jt;
    private List<TMeOutStockDetailsInfo> toslist;
    private String billCode;
    private String name;
    private int page;
    private int limit;
    private int rowcount;
    private List<Map<String, Object>> conutinfo;


    public String list() {

        if (billCode != null) {
            toslist = tosdao.findByHql1(" from TMeOutStockDetailsInfo where billcode.outBillCode=?", billCode);
            rowcount = tosdao.queryRecordCount("select count(*) from TMeOutStockDetailsInfo where billcode.outBillCode=?", billCode);
            return SUCCESS;
        }
        return SUCCESS;
    }

    public String total() {
        conutinfo = jt.queryForList("select b.MerchandiseName,SUM(a.Num) as outNum from TMe_OutStockDetailsInfo a inner join TMe_MerchandiseInfo b on a.MerchandiseID=b.MerchandiseID group by b.MerchandiseName order by outNum desc");
        return SUCCESS;
    }

    public List<TMeOutStockDetailsInfo> getToslist() {
        return toslist;
    }

    public void setToslist(List<TMeOutStockDetailsInfo> toslist) {
        this.toslist = toslist;
    }

    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
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

    public List<Map<String, Object>> getConutinfo() {
        return conutinfo;
    }

    public void setConutinfo(List<Map<String, Object>> conutinfo) {
        this.conutinfo = conutinfo;
    }
}
