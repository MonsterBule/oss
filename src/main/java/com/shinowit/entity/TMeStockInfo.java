package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "TMe_StockInfo")
public class TMeStockInfo {
    private int id;
    private BigDecimal avgPrice;
    private int num;
    private TMeMerchandiseInfo chandise;

    @Id
    @Column(name = "ID")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "AvgPrice")
    public BigDecimal getAvgPrice() {
        return avgPrice;
    }

    public void setAvgPrice(BigDecimal avgPrice) {
        this.avgPrice = avgPrice;
    }

    @Basic
    @Column(name = "Num")
    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeStockInfo that = (TMeStockInfo) o;

        if (id != that.id) return false;
        if (num != that.num) return false;
        if (avgPrice != null ? !avgPrice.equals(that.avgPrice) : that.avgPrice != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (avgPrice != null ? avgPrice.hashCode() : 0);
        result = 31 * result + num;
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "MerchandiseID", referencedColumnName = "MerchandiseID")

    public TMeMerchandiseInfo getChandise() {
        return chandise;
    }

    public void setChandise(TMeMerchandiseInfo chandise) {
        this.chandise = chandise;
    }
}
