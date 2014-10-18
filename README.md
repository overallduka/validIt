validIt
=======
Definition: A simple JQuery plugin to validade field of form

Looking for simplicity, this plugin allow create simple validations for each field, separately or togeter.

Inspired in Rails validations but still needs much improvement and features.

Basic usage
-----------
    $('.some-field').validIt({
        type: 'length',
        size: 5
        });


**When invalid**
Add a class whit name invalid like that:

    <input name='some_name' type='text' class='invalid'>

**When valid**
Remove class invalid of field:

    <input name='some_name' type='text' >

## Options ##
type
Have some types of data whit ready validations like:

 - length
 - form 
 - email
 - phone *(brazilian phone)*
 - cep *(brazilian cep)*
 - cpf *(brazilian cpf)*
 - birthday *(month/day  18/09(day 18 of September))*

The `length` options works togheter whit 3 another options:

 - size - if number of characters is equal is valid
 - max - If major than max is invalid
 - min - If lower than min is invalid

Example 1: *min and max*

     $('.some-field').validIt({
            type: 'length',
            max: 10,
            min: 5
     });
	// To validate the input must have between 5 and 10 characters

Example 2: *custom type*

     $('.some-field').validIt({
            type: 'email'
     });
	// To validate the input must be a email

Example 2: *form*

     $('.some-form-class').validIt({
            type: 'form',
            onValid: function(){
				alert('The form is valid !');
			}
     });
	// Check if form contains some input invalid(whit class invalid)

## Callbacks ##
 - onChange
 - onValid
 - onInvalid

**- onChange**
Fired when the input value change, on digit, keypress.

    $('.some-field').validIt({
            type: 'length',
            size: 5,
            onChange: function(){
    			alert('The input value changed !');
    		}
     });
     
**- onValid**
Fired when field becomes valid

     $('.some-field').validIt({
                type: 'length',
                size: 5,
                onValid: function(){
        			alert('The field is valid !');
        		}
         });

**- onInvalid**
Fired when field becomes invalid

     $('.some-field').validIt({
                type: 'length',
                size: 5,
                onInvalid: function(){
        			alert('The field is invalid !');
        		}
         });

Contribute:

To contribute fork the project and make pull requests whit name of features/bugs you coded.


