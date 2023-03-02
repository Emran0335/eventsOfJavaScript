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
*/
