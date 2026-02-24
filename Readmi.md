1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
                                      
                                 <!-- Ans to the question no: (1)      -->
Ans: getElementById, getElementsByClassName, and querySelector / querySelectorAll-
 methods used in JavaScript to select HTML elements from the DOM.
getElementById selects a single element based on a specific id and returns that element (or null if not found).
getElementsByClassName selects all elements with a specific class name and returns a live HTMLCollection,
which means it automatically updates if the DOM changes.
On the other hand, querySelector and querySelectorAll are more flexible because they can use any valid CSS selector.
querySelector returns only the first matching element,
while querySelectorAll returns all matching elements as a static NodeList, which does not update automatically when the DOM changes.


2. How do you create and insert a new element into the DOM?
                                        
                                    <!-- Ans to the question no: (2)      --> 
Ans: To create and insert a new element into the DOM in JavaScript, you first use document.createElement() to create the required HTML element.
Then you can add content inside it using innerHTML and set attributes like id or className.
Once the element is ready, you use the appendChild() method to add it inside a specific parent element.


3. What is Event Bubbling? And how does it work?

                                    <!-- Ans to the question no: (3)      -->
Ans: Event Bubbling is a process in JavaScript where an event first occurs on the target element and then gradually propagates upward through its parent, grandparent, and other ancestors in the DOM hierarchy. If a child element is clicked, the same event will also trigger on its parent element and continue upwards—unless it is stopped using
event.stopPropagation(). 


4. What is Event Delegation in JavaScript? Why is it useful? 

                                     <!-- Ans to the question no: (4)      --> 
Ans: Event Delegation is a process in JavaScript where a single event listener is added to a parent element, and that listener handles events triggered by its child elements. It is especially useful when there are many child elements or when the DOM changes dynamically. Using event delegation reduces code, improves performance, and eliminates the need to add separate listeners for newly added elements.



5. What is the difference between preventDefault() and stopPropagation() methods?

                                     <!-- Ans to the question no: (5)      -->
Ans: preventDefault() and stopPropagation() are two methods used in JavaScript for event handling, but they work differently. preventDefault() primarily prevents an element’s default behavior, such as stopping a page reload on a link click or preventing a form from submitting. On the other hand, stopPropagation() is used to stop event bubbling or capturing, meaning the event will not propagate to parent elements.




