package com.tobiasdemoor.pruebatesting;

import com.tobiasdemoor.pruebatesting.model.Animal;
import com.tobiasdemoor.pruebatesting.model.Cat;
import com.tobiasdemoor.pruebatesting.model.Person;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

public class HamcrestTests {
    /*
    Hamcrest provides matchers for making assertions on arbitrary Java objects.
    To assert that the toString method of an Object returns a specified String:
     */
    @Test
    public void givenBean_whenToStringReturnsRequiredString_thenCorrect() {
        Person person = new Person("Barrack", "Washington");
        String str = person.toString();
        assertThat(person, hasToString(str));
    }

    /*
    We can also check that one class is a sub-class of another:
     */
    @Test
    public void given2Classes_whenOneInheritsFromOther_thenCorrect() {
        assertThat(Cat.class, typeCompatibleWith(Animal.class));
    }

    /*
    We can use Hamcrest‘s Bean matcher to inspect properties of a Java bean.
    We can check if the bean has the property, name like so:
     */
    @Test
    public void givenBean_whenHasValue_thenCorrect() {
        Person person = new Person("Baeldung", "25");
        assertThat(person, hasProperty("name"));
    }

    /*
        We can also check if Person has the address property, initialized to New York:
    */
    @Test
    public void givenBean_whenHasCorrectValue_thenCorrect() {
        Person person = new Person("Baeldung", "New York");
        assertThat(person, hasProperty("address", equalTo("New York")));
    }

    /*
    We can as well check if two Person objects are constructed with the same values:
     */
    @Test
    public void given2Beans_whenHavingSameValues_thenCorrect() {
        Person person1 = new Person("Baeldung", "New York");
        Person person2 = new Person("Baeldung", "New York");
        assertThat(person1, samePropertyValuesAs(person2));
    }

    /*
    Hamcrest provides matchers for inspecting Collections.
    Simple check to find out if a Collection is empty:
    */
    @Test
    public void givenCollection_whenEmpty_thenCorrect() {
        List<String> emptyList = new ArrayList<>();
        assertThat(emptyList, empty());
    }

    /*
    To check the size of a Collection:
     */
    @Test
    public void givenAList_whenChecksSize_thenCorrect() {
        List<String> hamcrestMatchers = Arrays.asList(
                "collections", "beans", "text", "number");
        assertThat(hamcrestMatchers, hasSize(4));
    }

    /*
    We can also use it to assert that an array has a required size:
     */
    @Test
    public void givenArray_whenChecksSize_thenCorrect() {
        String[] hamcrestMatchers = {"collections", "beans", "text", "number"};
        assertThat(hamcrestMatchers, arrayWithSize(4));
    }

    /*
    ... https://www.baeldung.com/java-junit-hamcrest-guide
     */

}
