package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "TBa_ClassInfo")
public class TBaClassInfo {
    private byte id;
    private String cid;
    private String cName;
    private byte cv1;
    private Byte cv2;
    private Byte cv3;
    private Byte cv4;
    private Byte cv5;
    private Byte cv6;
    private Byte cv7;
    private Byte cv8;
    private Byte cv9;

    @Basic
    @Column(name = "ID")
    public byte getId() {
        return id;
    }

    public void setId(byte id) {
        this.id = id;
    }

    @Id
    @Column(name = "CID")
    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    @Basic
    @Column(name = "CName")
    public String getcName() {
        return cName;
    }

    public void setcName(String cName) {
        this.cName = cName;
    }

    @Basic
    @Column(name = "CV1")
    public byte getCv1() {
        return cv1;
    }

    public void setCv1(byte cv1) {
        this.cv1 = cv1;
    }

    @Basic
    @Column(name = "CV2")
    public Byte getCv2() {
        return cv2;
    }

    public void setCv2(Byte cv2) {
        this.cv2 = cv2;
    }

    @Basic
    @Column(name = "CV3")
    public Byte getCv3() {
        return cv3;
    }

    public void setCv3(Byte cv3) {
        this.cv3 = cv3;
    }

    @Basic
    @Column(name = "CV4")
    public Byte getCv4() {
        return cv4;
    }

    public void setCv4(Byte cv4) {
        this.cv4 = cv4;
    }

    @Basic
    @Column(name = "CV5")
    public Byte getCv5() {
        return cv5;
    }

    public void setCv5(Byte cv5) {
        this.cv5 = cv5;
    }

    @Basic
    @Column(name = "CV6")
    public Byte getCv6() {
        return cv6;
    }

    public void setCv6(Byte cv6) {
        this.cv6 = cv6;
    }

    @Basic
    @Column(name = "CV7")
    public Byte getCv7() {
        return cv7;
    }

    public void setCv7(Byte cv7) {
        this.cv7 = cv7;
    }

    @Basic
    @Column(name = "CV8")
    public Byte getCv8() {
        return cv8;
    }

    public void setCv8(Byte cv8) {
        this.cv8 = cv8;
    }

    @Basic
    @Column(name = "CV9")
    public Byte getCv9() {
        return cv9;
    }

    public void setCv9(Byte cv9) {
        this.cv9 = cv9;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TBaClassInfo that = (TBaClassInfo) o;

        if (cv1 != that.cv1) return false;
        if (id != that.id) return false;
        if (cName != null ? !cName.equals(that.cName) : that.cName != null) return false;
        if (cid != null ? !cid.equals(that.cid) : that.cid != null) return false;
        if (cv2 != null ? !cv2.equals(that.cv2) : that.cv2 != null) return false;
        if (cv3 != null ? !cv3.equals(that.cv3) : that.cv3 != null) return false;
        if (cv4 != null ? !cv4.equals(that.cv4) : that.cv4 != null) return false;
        if (cv5 != null ? !cv5.equals(that.cv5) : that.cv5 != null) return false;
        if (cv6 != null ? !cv6.equals(that.cv6) : that.cv6 != null) return false;
        if (cv7 != null ? !cv7.equals(that.cv7) : that.cv7 != null) return false;
        if (cv8 != null ? !cv8.equals(that.cv8) : that.cv8 != null) return false;
        if (cv9 != null ? !cv9.equals(that.cv9) : that.cv9 != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) id;
        result = 31 * result + (cid != null ? cid.hashCode() : 0);
        result = 31 * result + (cName != null ? cName.hashCode() : 0);
        result = 31 * result + (int) cv1;
        result = 31 * result + (cv2 != null ? cv2.hashCode() : 0);
        result = 31 * result + (cv3 != null ? cv3.hashCode() : 0);
        result = 31 * result + (cv4 != null ? cv4.hashCode() : 0);
        result = 31 * result + (cv5 != null ? cv5.hashCode() : 0);
        result = 31 * result + (cv6 != null ? cv6.hashCode() : 0);
        result = 31 * result + (cv7 != null ? cv7.hashCode() : 0);
        result = 31 * result + (cv8 != null ? cv8.hashCode() : 0);
        result = 31 * result + (cv9 != null ? cv9.hashCode() : 0);
        return result;
    }
}
