package com.jd.test.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Favourite.
 */
@Entity
@Table(name = "favourite")
public class Favourite implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "joke_id")
    private String jokeId;

    @Column(name = "icon_url")
    private String iconUrl;

    @Column(name = "url")
    private String url;

    @Column(name = "jhi_value")
    private String value;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("favourites")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJokeId() {
        return jokeId;
    }

    public Favourite jokeId(String jokeId) {
        this.jokeId = jokeId;
        return this;
    }

    public void setJokeId(String jokeId) {
        this.jokeId = jokeId;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public Favourite iconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
        return this;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public String getUrl() {
        return url;
    }

    public Favourite url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getValue() {
        return value;
    }

    public Favourite value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public User getUser() {
        return user;
    }

    public Favourite user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Favourite favourite = (Favourite) o;
        if (favourite.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), favourite.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Favourite{" +
            "id=" + getId() +
            ", jokeId='" + getJokeId() + "'" +
            ", iconUrl='" + getIconUrl() + "'" +
            ", url='" + getUrl() + "'" +
            ", value='" + getValue() + "'" +
            "}";
    }
}
