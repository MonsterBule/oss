package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "TMe_InStockDetailsInfo")
public class TMeInStockDetailsInfo {
    private int id;
    private int num;
    private BigDecimal price;
    private TMeInStockInfo billcode;
    private TMeMerchandiseInfo merchandise;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Num")
    public int getNum() {
        return num;
    }

    public void setNum(int num) {
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


    @ManyToOne
    @JoinColumn(name = "BillCode", referencedColumnName = "BillCode")
    public TMeInStockInfo getBillcode() {
        return billcode;
    }

    public void setBillcode(TMeInStockInfo billcode) {
        this.billcode = billcode;
    }

    @ManyToOne
    @JoinColumn(name = "MerchandiseID", referencedColumnName = "MerchandiseID")

    public TMeMerchandiseInfo getMerchandise() {
        return merchandise;
    }

    public void setMerchandise(TMeMerchandiseInfo merchandise) {
        this.merchandise = merchandise;
    }
}
