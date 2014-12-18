package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "TMe_OutStockInfo")
public class TMeOutStockInfo {
    private int id;
    private String outBillCode;
    private Timestamp outTime;
    private String handler;
    private Byte outType;
    private BigDecimal totalMoney;
    private String remark;
    private Collection<TMeOrderInfo> tMeOrderInfosByOutBillCode;
    private Collection<TMeOutStockDetailsInfo> tMeOutStockDetailsInfosByOutBillCode;
    private TAuOperInfo oper;

    @Basic
    @Column(name = "ID", insertable = false, updatable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @GeneratedValue(generator = "system-uuid")
    @Column(name = "OutBillCode")
    public String getOutBillCode() {
        return outBillCode;
    }

    public void setOutBillCode(String outBillCode) {
        this.outBillCode = outBillCode;
    }

    @Basic
    @Column(name = "OutTime")
    public Timestamp getOutTime() {
        return outTime;
    }

    public void setOutTime(Timestamp outTime) {
        this.outTime = outTime;
    }

    @Basic
    @Column(name = "Handler")
    public String getHandler() {
        return handler;
    }

    public void setHandler(String handler) {
        this.handler = handler;
    }

    @Basic
    @Column(name = "OutType")
    public Byte getOutType() {
        return outType;
    }

    public void setOutType(Byte outType) {
        this.outType = outType;
    }

    @Basic
    @Column(name = "TotalMoney")
    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeOutStockInfo that = (TMeOutStockInfo) o;

        if (id != that.id) return false;
        if (handler != null ? !handler.equals(that.handler) : that.handler != null) return false;
        if (outBillCode != null ? !outBillCode.equals(that.outBillCode) : that.outBillCode != null) return false;
        if (outTime != null ? !outTime.equals(that.outTime) : that.outTime != null) return false;
        if (outType != null ? !outType.equals(that.outType) : that.outType != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (totalMoney != null ? !totalMoney.equals(that.totalMoney) : that.totalMoney != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (outBillCode != null ? outBillCode.hashCode() : 0);
        result = 31 * result + (outTime != null ? outTime.hashCode() : 0);
        result = 31 * result + (handler != null ? handler.hashCode() : 0);
        result = 31 * result + (outType != null ? outType.hashCode() : 0);
        result = 31 * result + (totalMoney != null ? totalMoney.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "tMeOutStockInfoByOutBillCode")
    public Collection<TMeOrderInfo> gettMeOrderInfosByOutBillCode() {
        return tMeOrderInfosByOutBillCode;
    }

    public void settMeOrderInfosByOutBillCode(Collection<TMeOrderInfo> tMeOrderInfosByOutBillCode) {
        this.tMeOrderInfosByOutBillCode = tMeOrderInfosByOutBillCode;
    }

    @OneToMany(mappedBy = "billcode")
    public Collection<TMeOutStockDetailsInfo> gettMeOutStockDetailsInfosByOutBillCode() {
        return tMeOutStockDetailsInfosByOutBillCode;
    }

    public void settMeOutStockDetailsInfosByOutBillCode(Collection<TMeOutStockDetailsInfo> tMeOutStockDetailsInfosByOutBillCode) {
        this.tMeOutStockDetailsInfosByOutBillCode = tMeOutStockDetailsInfosByOutBillCode;
    }

    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")

    public TAuOperInfo getOper() {
        return oper;
    }

    public void setOper(TAuOperInfo oper) {
        this.oper = oper;
    }
}
