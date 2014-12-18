package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfo;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2014/11/24.
 */
public class InStockDetailAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeInStockDetailsInfo> tosdao;

    @Resource
    private JdbcTemplate jt;

    private List<TMeInStockDetailsInfo> toslist;

    private List<Map<String, Object>> countInfo;

    private String billCode;
    private String name;
    private int page;
    private int limit;
    private int rowcount;
    private List instock;
    private int total;


    public String list() {

        if (billCode != null) {
            toslist = tosdao.findByHql1(" from TMeInStockDetailsInfo where billcode.billCode=?", billCode);
            rowcount = tosdao.queryRecordCount("select count(*) from TMeInStockDetailsInfo where billcode.billCode=?", billCode);
            return SUCCESS;
        }
        return SUCCESS;
    }


    public String total() {

        countInfo = jt.queryForList("select b.MerchandiseName,SUM(a.num) as inNum from TMe_InStockDetailsInfo a inner join TMe_MerchandiseInfo b on a.MerchandiseID=b.MerchandiseID group by b.MerchandiseName ");
//        instock=tosdao.findByHql1("select a.merchandise.merchandiseName ,sum(a.num) from TMeInStockDetailsInfo a group by a.merchandise.merchandiseName",TMeInStockDetailsInfo.class);
//        instock=tosdao.findBySql("select b.MerchandiseName,SUM(a.num)as'总计' from TMe_InStockDetailsInfo a inner join TMe_MerchandiseInfo b on a.MerchandiseID=b.MerchandiseID group by b.MerchandiseName ");
        return SUCCESS;
    }

    public List<TMeInStockDetailsInfo> getToslist() {
        return toslist;
    }

    public void setToslist(List<TMeInStockDetailsInfo> toslist) {
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

    public List getInstock() {
        return instock;
    }

    public void setInstock(List instock) {
        this.instock = instock;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<Map<String, Object>> getCountInfo() {
        return countInfo;
    }

}
