package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.GB.GB2Alpha;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaSupplierInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-06.
 */
public class SupToolAction extends ActionSupport {

    GB2Alpha gb2Alpha = new GB2Alpha();
    @Resource
    private BaseDAO<TBaSupplierInfo> tsdao;
    private boolean success;
    private String mag;
    private boolean ishave;
    private TBaSupplierInfo ts;

    public String supinsert() {
        try {
            if ((tsdao.findByHql1("from TBaSupplierInfo u where u.supplierName=?", ts.getSupplierName()).size() > 0) || (tsdao.findByHql1("from TBaSupplierInfo u where u.supplierId=?", ts.getSupplierId()).size() > 0)) {
                setSuccess(true);
                setIshave(false);
                setMag("该供应商已存在");
                return SUCCESS;
            } else {
                ts.setSupplierAb(gb2Alpha.String2Alpha(ts.getSupplierName()));
                tsdao.insert(ts);
                setMag("输入成功！！！");
                setSuccess(true);
                setIshave(true);
                return SUCCESS;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        setMag("输入失败");
        setSuccess(true);
        setIshave(true);
        return SUCCESS;
    }

    public String supdelete() {
        try {
            tsdao.delete(ts);
            setMag("删除成功！！！");
            setSuccess(true);
            setIshave(true);
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
        }

        setMag("删除失败");
        setSuccess(true);
        setIshave(false);
        return SUCCESS;

    }

    public String supupdate() {
        try {
            if (tsdao.findByHql1("from TBaSupplierInfo where supplierName=? and supplierId !=?", ts.getSupplierName(), ts.getSupplierId()).size() > 0) {

                setSuccess(true);
                setIshave(false);
                setMag("给供应商已存在。");
                return SUCCESS;
            } else {
                ts.setSupplierAb(gb2Alpha.String2Alpha(ts.getSupplierName()));
                tsdao.update(ts);
                setMag("更新成功！！！");
                setSuccess(true);
                setIshave(true);
                return SUCCESS;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        setSuccess(true);
        setIshave(false);
        setMag("更新失败");
        return SUCCESS;

    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMag() {
        return mag;
    }

    public void setMag(String mag) {
        this.mag = mag;
    }

    public boolean isIshave() {
        return ishave;
    }

    public void setIshave(boolean ishave) {
        this.ishave = ishave;
    }

    public TBaSupplierInfo getTs() {
        return ts;
    }

    public void setTs(TBaSupplierInfo ts) {
        this.ts = ts;
    }
}
