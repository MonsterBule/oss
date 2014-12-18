package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeOutStockDetailsInfo;
import com.shinowit.entity.TMeOutStockInfo;
import com.shinowit.services.Outstock;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/24.
 */
public class OutstoreToolAction extends ActionSupport {

    private TMeOutStockInfo tos;
    private TMeOutStockDetailsInfo tosd;
    private List<TMeOutStockDetailsInfo> tosdlist;
    private String outbillcode;
    private boolean success;
    private boolean ishave;
    private String mag;
    @Resource
    private Outstock outstock;

    public String insert() {
        try {
            if (outstock.insert(tos, tosdlist)) {
                setMag("出库成功！！！");
                setIshave(true);
                setSuccess(true);
                return SUCCESS;
            }

        } catch (Exception e) {
            e.printStackTrace();

        }
        setMag("出库失败，请检查");
        setIshave(false);
        setSuccess(true);
        return SUCCESS;

    }

    public String delete() {
        try {
            if (outstock.delete(outbillcode)) {
                setIshave(true);
                setSuccess(true);
                setMag("删除成功");
                return SUCCESS;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        setIshave(false);
        setSuccess(true);
        setMag("删除失败");
        return SUCCESS;
    }

    public String update() {
        try {
            if (outstock.update(tos, tosd)) {
                setIshave(true);
                setSuccess(true);
                setMag("更新成功");
                return SUCCESS;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        setIshave(false);
        setSuccess(true);
        setMag("更新失败");
        return SUCCESS;
    }

    public TMeOutStockInfo getTos() {
        return tos;
    }

    public void setTos(TMeOutStockInfo tos) {
        this.tos = tos;
    }

    public List<TMeOutStockDetailsInfo> getTosdlist() {
        return tosdlist;
    }

    public void setTosdlist(List<TMeOutStockDetailsInfo> tosdlist) {
        this.tosdlist = tosdlist;
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

    public String getOutbillcode() {
        return outbillcode;
    }

    public void setOutbillcode(String outbillcode) {
        this.outbillcode = outbillcode;
    }

    public TMeOutStockDetailsInfo getTosd() {
        return tosd;
    }

    public void setTosd(TMeOutStockDetailsInfo tosd) {
        this.tosd = tosd;
    }
}
