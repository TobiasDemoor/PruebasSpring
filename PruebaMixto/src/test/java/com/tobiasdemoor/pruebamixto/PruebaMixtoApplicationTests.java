package com.tobiasdemoor.pruebamixto;

import com.tobiasdemoor.pruebamixto.model.User;
import com.tobiasdemoor.pruebamixto.security.AuthUser;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PruebaMixtoApplicationTests {

    @LocalServerPort
    private int port;

    @BeforeEach
    public void setUp() {
        RestAssured.baseURI = "http://localhost";
        RestAssured.basePath = "";
        RestAssured.port = port;
    }

    @Test
    public void loadContext() {

    }

    @Test
    public void signUp() {
        Response response = given().get("/api/user").then().extract().response();
        RequestSpecification request = given();
        AuthUser user = new AuthUser();
        User publicUser = new User();
        publicUser.setName("Juan Carlos");
        user.setUsername("test");
        user.setPassword("test");
        user.setPublicUser(publicUser);

        if (response.cookie("XSRF-TOKEN") != null) {
            request = request
                    .header("X-XSRF-TOKEN", response.cookie("XSRF-TOKEN"))
                    .cookie("XSRF-TOKEN",response.cookie("XSRF-TOKEN"));
        }
        request.contentType("application/json")
                .body(user).log().all().when()
                .post("/api/user/")
                .then().log().all()
                .statusCode(201)
                .assertThat()
                .body("name", equalTo(publicUser.getName()));
    }

}
