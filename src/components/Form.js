import React, { useState } from "react";

function Form() {
/**
 * As a first refactor ,lets use useState just once and make an object
 * representing all of our input fields
 * We will also need to update our onChange handlers and the variables names 
 * 
 * 
 * 
 * Since our initial state is an object,in order to update state in our onChange handlers
 * we have to copy all the key/value pairs from the current version of that object into our new state 
 * thats what the spread operator here is doing 
 * 
 * 
 * 
 * Now we just have one object in state to update whenever an input field changes 
 * 
 * Our change handlers are still a bit verbose,however.Since each one is changing
 * a different value in our state ,we have got them seperated here.
 * Instead of writing separate functions for each input field 
 * we could actually condense this down to one more reusable funtion
 * Since event is being passed as an argument ,we have access to some of the event.target
 * attributes that may be present 
 * 
 * if we give our inputs name attributes , we can access them as event.target.name 
 * 
 * 
 * As long as the name attribute of our <input> fields match the keys in our state 
 * we can write a generic handleChange function
 * 
 * 
 * Then if we connent this new functionto both of our inputs 
 * they will both correctly update 
 * Because for the first input,event.target.name is set to firstName
 * while in the second input, it is set to lastName.
 *  Each input's name attribute will change which part of state is actually updated!
 * Now , if we want to add a new input field to the form 
 * we just need to add two things
 * 
 * a new key/value pair in our formData state and 
 * a new <input> field where the name attribute matches our new key
 * 
 * 
 * We can take it one step further, and also handle checkbox inputs in our handleChange input.
 *  Since checkboxes have a checked attribute instead of the value attribute, 
 * we'd need to check what type our input is in order to get the correct value in state.
 * 
 * 
 * Depending on what input elements you're working with,
 *  you might also have to add some additional logic to handle things like number fields
 *  (using parseInt or parseFloat) and other data types to ensure your form state is always in sync with your components.
 */
  const [ formData, setFormData] = 
  useState( {
    firstName:"Alistairs",
    lastName:"Israel",
    admin: false,
  });

  
  function handleChange(event) {
      const name = event.target.name;
      let value = event.target.value;
     
       // use `checked` property of checkboxes instead of the value
       if (event.target.type === "checkbox") {
        value = event.target.checked;
       }


      setFormData({
        ...formData,[name]:value,
      })
  }


      function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);
      }
  return (
    <form onSubmit={handleSubmit}>
      <input 
      type="text"
      name="firstName"
      value={formData.firstName}
      onChange={handleChange}
     
      />
      <input 
      type="text"
      name="lastName"
      value={formData.lastName}
      onChange={handleChange}
      
      />
      <input 
      type="checkbox"
      name="admin"
      onChange={handleChange}
      checked={formData.admin}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
