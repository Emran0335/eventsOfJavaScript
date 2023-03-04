// ** Client-side form validation **

/*
Before submitting data to the server, it is important to ensure all required form controls are filled out, in the correct format. This is called client-side form validation, and helps ensure data submitted matches the requirements set forth in the various form controls. This article leads you through basic concepts and examples of client-side form validation.

Client-side validation is an initial check and an important feature of good user experience; by catching invalid data on the client-side, the user can fix it straight away. If it gets to the server and is then rejected, a noticeable delay is caused by a round trip to the server and then back to the client-side to tell the user to fix their data.

However, client-side validation should not be considered an exhaustive security measure! Your apps should always perform security checks on any form-submitted data on the server-side as well as the client-side, because client-side validation is too easy to bypass, so malicious users can still easily send bad data through to your server. Read (Website security) for an idea of what could happen; implementing server-side validation is somewhat beyond the scope of this module, but you should bear it in mind.

What is form validation?
Go to any popular site with a registration form, and you will notice that they provide feedback when you don't enter your data in the format they are expecting. You'll get messages such as:

1. "This field is required" (You can't leave this field blank).
2. "Please enter your phone number in the format xxx-xxxx" (A specific data format is required for it to be considered valid).
3. "Please enter a valid email address" (the data you entered is not in the right   format).
4. "Your password needs to be between 8 and 30 characters long and contain one uppercase letter, one symbol, and a number." (A very specific data format is required for your data).

This is called form validation. When you enter data, the browser and/or the web server will check to see that the data is in the correct format and within the constraints set by the application. Validation done in the browser is called client-side validation, while validation done on the server is called server-side validation. In this chapter we are focusing on client-side validation.

If the information is correctly formatted, the application allows the data to be submitted to the server and (usually) saved in a database; if the information isn't correctly formatted, it gives the user an error message explaining what needs to be corrected, and lets them try again.

We want to make filling out web forms as easy as possible. So why do we insist on validating our forms? There are three main reasons:

1. We want to get the right data, in the right format. Our applications won't work properly if our users' data is stored in the wrong format, is incorrect, or is omitted altogether.
2. We want to protect our users' data. Forcing our users to enter secure passwords makes it easier to protect their account information.
3. We want to protect ourselves. There are many ways that malicious users can misuse unprotected forms to damage the application. See (Website security).

Warning: Never trust data passed to your server from the client. Even if your form is validating correctly and preventing malformed input on the client-side, a malicious user can still alter the network request.

Different types of client-side validation
There are two different types of client-side validation that you'll encounter on the web:

1. Built-in form validation uses HTML form validation features, which we've discussed in many places throughout this module. This validation generally doesn't require much JavaScript. Built-in form validation has better performance than JavaScript, but it is not as customizable as JavaScript validation.
2. JavaScript validation is coded using JavaScript. This validation is completely customizable, but you need to create it all (or use a library).

Using built-in form validation
One of the most significant features of modern form controls is the ability to validate most user data without relying on JavaScript. This is done by using validation attributes on form elements. We've seen many of these earlier in the course, but to recap:

1. required: Specifies whether a form field needs to be filled in before the form can be submitted.
2. minlength and maxlength: Specifies the minimum and maximum length of textual data (strings).
3. min and max: Specifies the minimum and maximum values of numerical input types.
4. type: Specifies whether the data needs to be a number, an email address, or some other specific preset type.
5. pattern: Specifies a regular expression that defines a pattern the entered data needs to follow.

If the data entered in a form field follows all of the rules specified by the above attributes, it is considered valid. If not, it is considered invalid.

When an element is valid, the following things are true:
1. The element matches the :valid CSS pseudo-class, which lets you apply a specific style to valid elements.
2. If the user tries to send the data, the browser will submit the form, provided there is nothing else stopping it from doing so (e.g., JavaScript).

When an element is invalid, the following things are true:
1. The element matches the :invalid CSS pseudo-class, and sometimes other UI pseudo-classes (e.g., :out-of-range) depending on the error, which lets you apply a specific style to invalid elements.
2. If the user tries to send the data, the browser will block the form and display an error message.

Note: There are several errors that will prevent the form from being submitted, including a badInput, patternMismatch, rangeOverflow or rangeUnderflow, stepMismatch, tooLong or tooShort, typeMismatch, valueMissing, or a customError.


Built-in form validation examples
In this section, we'll test out some of the attributes that we discussed above

Simple start file
Let's start with a simple example: an input that allows you to choose whether you prefer a banana or a cherry. This example involves a simple text <input> with an associated <label> and a submit <button>. Find the source code on GitHub at fruit-start.html and a live example below.

<form>
  <label for="choose">Would you prefer a banana or cherry?</label>
  <input id="choose" name="i-like" />
  <button>Submit</button>
</form>

The required attribute
The simplest HTML validation feature is the required attribute. To make an input mandatory, add this attribute to the element. When this attribute is set, the element matches the :required UI pseudo-class and the form won't submit, displaying an error message on submission when the input is empty. While empty, the input will also be considered invalid, matching the :invalid UI pseudo-class.

Add a required attribute to your input, as shown below.

This CSS causes the input to have a red dashed border when it is invalid and a more subtle solid black border when valid. We also added a background gradient when the input is required and invalid. Try out the new behavior in the example below:

Try submitting the form without a value. Note how the invalid input gets focus, a default error message ("Please fill out this field") appears, and the form is prevented from being sent.

The presence of the required attribute on any element that supports this attribute means the element matches the :required pseudo-class whether it has a value or not. If the <input> has no value, the input will match the :invalid pseudo-class.

Note: For good user experience, indicate to the user when form fields are required. It isn't only good user experience, it is required by WCAG accessibility guidelines. Also, only require users to input data you actually need: For example, why do you really need to know someone's gender or title?


Validating against a regular expression
Another useful validation feature is the pattern attribute, which expects a Regular Expression as its value. A regular expression (regexp) is a pattern that can be used to match character combinations in text strings, so regexps are ideal for form validation and serve a variety of other uses in JavaScript.

Regexps are quite complex, and we don't intend to teach you them exhaustively in this article. Below are some examples to give you a basic idea of how they work.

1. a — Matches one character that is a (not b, not aa, and so on).
2. abc — Matches a, followed by b, followed by c.
3. ab?c — Matches a, optionally followed by a single b, followed by c. (ac or abc)
4. ab*c — Matches a, optionally followed by any number of bs, followed by c. (ac, abc, abbbbbc, and so on).
5. a|b — Matches one character that is a or b.
6. abc|xyz — Matches exactly abc or exactly xyz (but not abcxyz or a or y, and so on).

There are many more possibilities that we don't cover here. For a complete list and many examples, consult our Regular expression documentation.

Let's implement an example. Update your HTML to add a pattern attribute like this:

<form>
  <label for="choose">Would you prefer a banana or a cherry?</label>
  <input id="choose" name="i-like" required pattern="[Bb]anana|[Cc]herry" />
  <button>Submit</button>
</form>

In this example, the <input> element accepts one of four possible values: the strings "banana", "Banana", "cherry", or "Cherry". Regular expressions are case-sensitive, but we've made it support capitalized as well as lower-case versions using an extra "Aa" pattern nested inside square brackets.

At this point, try changing the value inside the pattern attribute to equal some of the examples you saw earlier, and look at how that affects the values you can enter to make the input value valid. Try writing some of your own, and see how it goes. Make them fruit-related where possible so that your examples make sense!

If a non-empty value of the <input> doesn't match the regular expression's pattern, the input will match the :invalid pseudo-class.

Note: Some <input> element types don't need a pattern attribute to be validated against a regular expression. Specifying the email type, for example, validates the inputs value against a well-formed email address pattern or a pattern matching a comma-separated list of email addresses if it has the multiple attribute.

Note: The <textarea> element doesn't support the pattern attribute.

Constraining the length of your entries
You can constrain the character length of all text fields created by <input> or <textarea> by using the minlength and maxlength attributes. A field is invalid if it has a value and that value has fewer characters than the minlength value or more than the maxlength value.

Browsers often don't let the user type a longer value than expected into text fields. A better user experience than just using maxlength is to also provide character count feedback in an accessible manner and let them edit their content down to size. An example of this is the character limit seen on Twitter when Tweeting. JavaScript, including solutions using maxlength, can be used to provide this.

Constraining the values of your entries
For number fields (i.e. <input type="number">), the min and max attributes can be used to provide a range of valid values. If the field contains a value outside this range, it will be invalid.

Let's look at another example. Create a new copy of the form.html file.

Now delete the contents of the <body> element, and replace it with the following:

<form>
  <div>
    <label for="choose">Would you prefer a banana or a cherry?</label>
    <input
      type="text"
      id="choose"
      name="i-like"
      required
      minlength="6"
      maxlength="6" />
  </div>
  <div>
    <label for="number">How many would you like?</label>
    <input type="number" id="number" name="amount" value="1" min="1" max="10" />
  </div>
  <div>
    <button>Submit</button>
  </div>
</form>


Here you'll see that we've given the text field a minlength and maxlength of six, which is the same length as banana and cherry.
We've also given the number field a min of one and a max of ten. Entered numbers outside this range will show as invalid; users won't be able to use the increment/decrement arrows to move the value outside of this range. If the user manually enters a number outside of this range, the data is invalid. The number is not required, so removing the value will still result in a valid value.

1. Here you'll see that we've given the text field a minlength and maxlength of six, which is the same length as banana and cherry.
2. We've also given the number field a min of one and a max of ten. Entered numbers outside this range will show as invalid; users won't be able to use the increment/decrement arrows to move the value outside of this range. If the user manually enters a number outside of this range, the data is invalid. The number is not required, so removing the value will still result in a valid value.

Note: <input type="number"> (and other types, such as range and date) can also take a step attribute, which specifies what increment the value will go up or down by when the input controls are used (such as the up and down number buttons). In the above example we've not included a step attribute, so the value defaults to 1. This means that floats, like 3.2, will also show as invalid.


Full example
Here is a full example to show usage of HTML's built-in validation features. First, some HTML:

<form>
  <p>
    <fieldset>
      <legend>Do you have a driver's license?<span aria-label="required">*</span></legend>
      <!-- While only one radio button in a same-named group can be selected at a time,
           and therefore only one radio button in a same-named group having the "required"
           attribute suffices in making a selection a requirement -->
      <input type="radio" required name="driver" id="r1" value="yes"><label for="r1">Yes</label>
      <input type="radio" required name="driver" id="r2" value="no"><label for="r2">No</label>
    </fieldset>
  </p>
  <p>
    <label for="n1">How old are you?</label>
    <!-- The pattern attribute can act as a fallback for browsers which
         don't implement the number input type but support the pattern attribute.
         Please note that browsers that support the pattern attribute will make it
         fail silently when used with a number field.
         Its usage here acts only as a fallback -->
    <input type="number" min="12" max="120" step="1" id="n1" name="age"
           pattern="\d+">
  </p>
  <p>
    <label for="t1">What's your favorite fruit?<span aria-label="required">*</span></label>
    <input type="text" id="t1" name="fruit" list="l1" required
           pattern="[Bb]anana|[Cc]herry|[Aa]pple|[Ss]trawberry|[Ll]emon|[Oo]range">
    <datalist id="l1">
      <option>Banana</option>
      <option>Cherry</option>
      <option>Apple</option>
      <option>Strawberry</option>
      <option>Lemon</option>
      <option>Orange</option>
    </datalist>
  </p>
  <p>
    <label for="t2">What's your email address?</label>
    <input type="email" id="t2" name="email">
  </p>
  <p>
    <label for="t3">Leave a short message</label>
    <textarea id="t3" name="msg" maxlength="140" rows="5"></textarea>
  </p>
  <p>
    <button>Submit</button>
  </p>
</form>
Copy to Clipboard


And now some CSS to style the HTML:
form {
  font: 1em sans-serif;
  max-width: 320px;
}

p > label {
  display: block;
}

input[type="text"],
input[type="email"],
input[type="number"],
textarea,
fieldset {
  width: 100%;
  border: 1px solid #333;
  box-sizing: border-box;
}

input:invalid {
  box-shadow: 0 0 5px 1px red;
}

input:focus:invalid {
  box-shadow: none;
}
*/



const 
