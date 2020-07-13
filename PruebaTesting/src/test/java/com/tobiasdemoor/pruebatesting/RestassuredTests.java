package com.tobiasdemoor.pruebatesting;

import com.tobiasdemoor.pruebatesting.model.Person;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;

import java.util.concurrent.TimeUnit;

import static io.restassured.RestAssured.*;
import static io.restassured.matcher.RestAssuredMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

public class RestassuredTests {
    @Test
    public void givenUrl_whenSuccessOnGetsResponseAndJsonHasRequiredKV_thenCorrect() {
        get("/events?id=390")
                .then()
                .statusCode(200)
                .assertThat()
                .body("data.leagueId", equalTo(35));
    }
    @Test
    public void givenUrl_whenJsonResponseHasArrayWithGivenValuesUnderKey_thenCorrect() {
        get("/events?id=390").then().assertThat()
                .body("odds.price", hasItems("1.30", "5.25"));
    }
    @Test
    public void whenRequestGet_thenOK(){
        when().request("GET", "/events?id=12").then().statusCode(200);
    }
    @Test
    public void whenRequestedPost_thenCreated() {
        with().body(new Person("Pibe", "Lanus"))
                .when()
                .request("POST", "/new")
                .then()
                .statusCode(201);
    }
    @Test
    public void whenMeasureResponseTime_thenOK() {
        Response response = RestAssured.get("/events?id=2");
        long timeInMS = response.time();
        long timeInS = response.timeIn(TimeUnit.SECONDS);

        assertThat(timeInS, equalTo(timeInMS/1000));
    }

    @Test
    public void whenValidateResponseTime_thenSuccess() {
        when().get("/events?id=2").then().time(lessThan(5000L));
    }

    @Test
    public void whenLogRequest_thenOK() {
        given().log().all()
                .when().get("/events?id=3")
                .then().statusCode(200);
    }

    @Test
    public void whenLogResponse_thenOK() {
        when().get("/events?id=3")
                .then().log().body().statusCode(200);
    }
}
