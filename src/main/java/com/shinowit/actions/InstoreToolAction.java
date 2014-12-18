package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeInStockInfo;
import com.shinowit.services.Instock;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-12.
 */
public class InstoreToolAction extends ActionSupport {

    private List<TMeInStockDetailsInfo> tsdlist;

    private TMeInStockInfo ts;
    private String billCode;
    private TMeInStockDetailsInfo tsd;
    private boolean success;

    private boolean ishave;

    private String mag;
    @Resource
    private Instock instock;

    public String insert() {
        try {
            if (instock.insert(ts, tsdlist)) {
                setMag("入库成功操作");
                setIshave(true);
                setSuccess(true);
                return SUCCESS;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        setMag("入库成功失败");
        setIshave(false);
        setSuccess(true);
        return SUCCESS;
    }

    public String delete() {
        try {
            if (instock.delete(billCode)) {
                setMag("删除成功");
                setSuccess(true);
                setIshave(true);
                return SUCCESS;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        setMag("删除失败");
        setSuccess(true);
        setIshave(false);
        return SUCCESS;
    }

    public String update() {
        try {
            if (instock.update(ts, tsd)) {
                setMag("更新成功");
                setSuccess(true);
                setIshave(true);
                return SUCCESS;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        setMag("更新失败");
        setSuccess(true);
        setIshave(false);
        return SUCCESS;
    }

    public List<TMeInStockDetailsInfo> getTsdlist() {
        return tsdlist;
    }

    public void setTsdlist(List<TMeInStockDetailsInfo> tsdlist) {
        this.tsdlist = tsdlist;
    }

    public TMeInStockInfo getTs() {
        return ts;
    }

    public void setTs(TMeInStockInfo ts) {
        this.ts = ts;
    }

    public Instock getInstock() {
        return instock;
    }

    public void setInstock(Instock instock) {
        this.instock = instock;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isIshave() {
        return ishave;
    }

    public void setIshave(boolean ishave) {
        this.ishave = ishave;
    }

    public String getMag() {
        return mag;
    }

    public void setMag(String mag) {
        this.mag = mag;
    }

    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    public TMeInStockDetailsInfo getTsd() {
        return tsd;
    }

    public void setTsd(TMeInStockDetailsInfo tsd) {
        this.tsd = tsd;
    }
}
