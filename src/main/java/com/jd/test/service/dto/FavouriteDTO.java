package com.jd.test.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Favourite entity.
 */
public class FavouriteDTO implements Serializable {

    private Long id;

    private String jokeId;

    private String iconUrl;

    private String url;

    private String value;


    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJokeId() {
        return jokeId;
    }

    public void setJokeId(String jokeId) {
        this.jokeId = jokeId;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FavouriteDTO favouriteDTO = (FavouriteDTO) o;
        if (favouriteDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), favouriteDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FavouriteDTO{" +
            "id=" + getId() +
            ", jokeId='" + getJokeId() + "'" +
            ", iconUrl='" + getIconUrl() + "'" +
            ", url='" + getUrl() + "'" +
            ", value='" + getValue() + "'" +
            ", user=" + getUserId() +
            "}";
    }
}
