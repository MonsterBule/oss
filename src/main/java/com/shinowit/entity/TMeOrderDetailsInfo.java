package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "TMe_OrderDetailsInfo", schema = "dbo", catalog = "oss")
public class TMeOrderDetailsInfo {
    private int id;
    private Integer num;
    private BigDecimal price;
    private TMeMerchandiseInfo tMeMerchandiseInfoByMerchandiseId;
    private TMeOrderInfo tMeOrderInfoByBillCode;
    private TMeUnitInfo tMeUnitInfoByUnitId;

    @Id
    @Column(name = "ID")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Num")
    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    @Basic
    @Column(name = "Price")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeOrderDetailsInfo that = (TMeOrderDetailsInfo) o;

        if (id != that.id) return false;
        if (num != null ? !num.equals(that.num) : that.num != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (num != null ? num.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "MerchandiseID", referencedColumnName = "MerchandiseID")
    public TMeMerchandiseInfo gettMeMerchandiseInfoByMerchandiseId() {
        return tMeMerchandiseInfoByMerchandiseId;
    }

    public void settMeMerchandiseInfoByMerchandiseId(TMeMerchandiseInfo tMeMerchandiseInfoByMerchandiseId) {
        this.tMeMerchandiseInfoByMerchandiseId = tMeMerchandiseInfoByMerchandiseId;
    }

    @ManyToOne
    @JoinColumn(name = "BillCode", referencedColumnName = "BillCode")
    public TMeOrderInfo gettMeOrderInfoByBillCode() {
        return tMeOrderInfoByBillCode;
    }

    public void settMeOrderInfoByBillCode(TMeOrderInfo tMeOrderInfoByBillCode) {
        this.tMeOrderInfoByBillCode = tMeOrderInfoByBillCode;
    }

    @ManyToOne
    @JoinColumn(name = "UnitID", referencedColumnName = "UnitID")
    public TMeUnitInfo gettMeUnitInfoByUnitId() {
        return tMeUnitInfoByUnitId;
    }

    public void settMeUnitInfoByUnitId(TMeUnitInfo tMeUnitInfoByUnitId) {
        this.tMeUnitInfoByUnitId = tMeUnitInfoByUnitId;
    }
}
