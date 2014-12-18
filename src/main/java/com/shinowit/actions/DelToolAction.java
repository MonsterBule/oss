package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaDeliveryInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-10.
 */
public class DelToolAction extends ActionSupport {
    @Resource
    private BaseDAO<TBaDeliveryInfo> tddao;
    private TBaDeliveryInfo td;
    private boolean success;
    private String mag;
    private boolean ishave;

    public String insert() {
        try {
            if ((tddao.findByHql1("from TBaDeliveryInfo u where u.deliveryName=?", td.getDeliveryName()).size() > 0) || (tddao.findByHql1("from TBaDeliveryInfo u where u.deliveryId=?", td.getDeliveryId()).size() > 0)) {
                setSuccess(true);
                setIshave(false);
                setMag("该配送商已存在");
                return SUCCESS;

            } else {

                tddao.insert(td);
                setSuccess(true);
                setIshave(true);
                setMag("输入成功");
                return SUCCESS;
            }
        } catch (Exception e) {

        }
        setSuccess(true);
        setIshave(false);
        setMag("输入失败");
        return SUCCESS;
    }

    public String delete() {
        try {
            tddao.delete(td);
            setSuccess(true);
            setIshave(true);
            setMag("删除成功");
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
        }
        setSuccess(true);
        setIshave(false);
        setMag("删除失败");
        return SUCCESS;
    }

    public String update() {
        try {
            if (tddao.findByHql1("from TBaDeliveryInfo deliveryName=? and deliveryId !=?", td.getDeliveryName(), td.getDeliveryId()).size() > 0) {

                setSuccess(true);
                setIshave(false);
                setMag("该配送商已存在");
                return SUCCESS;
            } else {
                tddao.update(td);
                setIshave(true);
                setMag("修改成功");
                setSuccess(true);
                return SUCCESS;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        setIshave(false);
        setMag("修改失败");
        setSuccess(true);
        return SUCCESS;
    }

    public TBaDeliveryInfo getTd() {
        return td;
    }

    public void setTd(TBaDeliveryInfo td) {
        this.td = td;
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
}
