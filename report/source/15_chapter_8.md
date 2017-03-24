# Summary & Conclusion

## Summary

Overall, the outcome of the project was successful. Author developed two systems with their
own matching compilers and virtual machines. Initial system was developed as an experiment, to provide
the author with valuable knowledge on the subject, witch then he applied into development of the final
system. The system is able to compile Frank code and run it in the browser, furthermore, almost all of
current Frank programs can be compiled and executed successfully by the system. Therefore, the 
main goal of the project was obtained. However, due to time constrains, final system is very much
in prototype stages as it still does not support all of Frank's features and contains few
fixable limitations, highlighted in **Future work** section. 

By completing the project author was able to learn variety of concepts. Firstly, he expanded his
knowledge on functional programming by coding the compiler with Haskell
while utilizing various data types, such as monads. Secondly, the author was able to learn 
infrastructure, functionality and implementation of compilers and abstract machines by
researching and participating in numerous discussions with the supervisor, Conor McBride. Author,
also, gained greater insight on Bash script while creating testing frameworks for both systems and
working on project evaluation. And, finally, author learned the language of Frank and implementation of
its defining qualities. 
 


## Future work

* Implement missing features, such as string concatenation;
* Improve testing framework to show more statistics and use timestamps;
* Expand support for web features, such as HTTP request handling support or handling DOM updates;
* To improve abstract machine's performance by storing stack frames in chunks. This would speed up
  searching and restoring;
* Enforce JavaScript type definitions with Haskell structures, to decrease the risk of bugs;
* Increase compiler efficiency by updating pattern matching procedures to building a tree
  of switches described in "Functional Programming and Computer Architecture" [@Tree-switching];
* Improve building procedures;
* Further optimize compiler and abstract machine;
* Improve abstract machine's component for printing the output.

